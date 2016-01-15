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
  this.get('/:memberSlug', function(schema, request) {
    let member = schema.member.where({'slug': request.params.memberSlug })[0];
    return member;
  });

  //for getting projects
  this.get('/:memberSlug/:projectSlug', (schema, request) => {
    let memberSlug = request.params.memberSlug;
    let projectSlug = request.params.projectSlug;

    let member = schema.member.where({ 'slug': memberSlug })[0];

    return member.model.projects.filter((p) => { return p.slug === projectSlug; })[0];
  });

  // for getting project posts
  this.get("/projects/:projectId/posts", (schema, request) => {
    let projectId = request.params.projectId;
    let postType = request.queryParams.postType;

    const pageSize = 10;
    // this is sadly how mirage parses a nested query, so we need to access it
    // via string accessor
    let pageNumber = request.queryParams['page[number]'];

    // debug flag

    let project = schema.project.find(projectId);

    let posts;

    if (postType) {
      posts = project.posts.filter((p) =>  p.type === postType );
    } else {
      posts = project.posts;
    }



    return posts.filter((p, index) => {
      let pageNumberNotSpecified = !pageNumber;
      let indexIsOnSpecifiedPage = (index >= (pageNumber - 1) * pageSize) && (index < pageNumber * pageSize);
      return pageNumberNotSpecified || indexIsOnSpecifiedPage;
    });
  });
}
