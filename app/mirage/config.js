import Mirage from 'ember-cli-mirage';


export default function() {

  this.post('/oauth/token', function(db, request) {
    var expected = "grant_type=password&username=josh%40coderly.com&password=password";

    if(request.requestBody === expected) {
      return {
        access_token: "d3e45a8a3bbfbb437219e132a8286e329268d57f2d9d8153fbdee9a88c2e96f7",
        user_id: 1,
        token_type: "bearer",
        expires_in: 7200
      };
    } else {
      return new Mirage.Response(400, {}, {
        errors: [
          {
            id: "INVALID_GRANT",
            title: "Invalid grant",
            detail: "The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client.",
            status: 401
          }
        ]
      });
    }
  });

  // for getting members
  this.get('/:memberSlug', function(db, request) {
    // sadly, we have to do all of this manually, due to mirage not supporting
    // JSON API or relationships in general at this moment

    // findBy is behaving extremely strangely, so we're using filterBy()[0]
    let members = db.members.filterBy('slug', request.params.memberSlug);
    let member = members[0];

    let model = member.model;

    let responseJSON = {
      data: {
        id: member.id,
        type: 'members',
        attributes: member
      }
    };

    // if the member also includes a model, we need to handle that as well
    if (model) {
      responseJSON.data.relationships = {};

      // we could use a library to pluralize, but this is the only case where we have
      // something like it right now, so it would be overkill
      let type = model.type === 'user' ? 'users' : 'organizations';

      // add a relationship object
      responseJSON.data.relationships = {
        model: { data: { id: model.id, type: type } }
      };

      // also need to include the model into the payload
      responseJSON.included = [{
        type: type,
        id: model.id,
        data: {
          id: model.id,
          type: type,
          attributes: model
        }
      }];
    }

    return responseJSON;
  });

  this.get('/:memberSlug/:projectSlug', (db, request) => {
    let memberSlug = request.params.memberSlug;
    let projectSlug = request.params.projectSlug;

    let member = db.members.filterBy('slug', memberSlug)[0];
    let project = member.model.projects.filterBy('slug', projectSlug)[0];

    let responseJSON = {
      data: {
        id: project.id,
        type: 'projects',
        attributes: project
      }
    };

    return responseJSON;
  });
}
