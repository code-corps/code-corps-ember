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

  this.get('/users/:id');
  this.post('posts');

  this.get('/users');

  // for getting slugged routes
  this.get('/:sluggedRouteSlug', function(schema, request) {
    let sluggedRoute = schema.sluggedRoute.where({'slug': request.params.sluggedRouteSlug })[0];
    return sluggedRoute;
  });

  //for getting projects
  this.get('/:sluggedRouteSlug/:projectSlug', (schema, request) => {
    let sluggedRouteSlug = request.params.sluggedRouteSlug;
    let projectSlug = request.params.projectSlug;

    let sluggedRoute = schema.sluggedRoute.where({ 'slug': sluggedRouteSlug })[0];

    // required to fake a polymorphic relationship with slugged routes and users/organizations
    let model = sluggedRoute.modelType === 'user' ? sluggedRoute.user : sluggedRoute.organization;

    return model.projects.filter((p) => { return p.slug === projectSlug; })[0];
  });

  this.get('/:sluggedRouteSlug/:projectSlug/posts/:number', (schema, request) => {
    let sluggedRouteSlug = request.params.sluggedRouteSlug;
    let projectSlug = request.params.projectSlug;
    let number = parseInt(request.params.number);

    let sluggedRoute = schema.sluggedRoute.where({ 'slug': sluggedRouteSlug })[0];
    let project = sluggedRoute.model.projects.filter((p) => { return p.slug === projectSlug; })[0];
    return project.posts.filter((p) => { return p.number === number; })[0];
  });
}
