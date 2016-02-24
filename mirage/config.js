import Mirage from 'ember-cli-mirage';
import Ember from 'ember';

export default function() {

  this.post('/oauth/token', (db, request) => {
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

  this.get('/organizations/:id');

  this.get('/projects/:id');

  this.get('/users/:id');
  this.get('/users');

  this.get('/user', (schema) => {
    // due to the nature of how we fetch the current user, all we can do here is
    // return one of the users available in the schema, or create a new one
    let users = schema.user.all();
    if (users.length > 0) {
      return users[0];
    } else {
      return schema.user.create();
    }
  });

  // POST /posts
  this.post('/posts', (schema, request) => {
    let requestBody = JSON.parse(request.requestBody);
    let attributes = requestBody.data.attributes;
    let relationships = requestBody.data.relationships;

    // the API takes takes markdown_preview and renders body_preview, then copies
    // both to markdown and body respectively
    let markdown = attributes.markdown_preview;
    let body = `<p>${markdown}</p>`;

    // the API sets post number as an auto-incrementing value, scoped to project,
    // so we need to simulate that here
    let number = schema.project.find(relationships.project.data.id).posts.length + 1;

    let attrs = {
      markdown: markdown,
      markdownPreview: markdown,
      body: body,
      bodyPreview: body,
      number: number,
      title: attributes.title,
      postType: attributes.post_type
    };

    let rels = {
      projectId: relationships.project.data.id,
      userId: relationships.user.data.id
    };

    let post = schema.create('post', Ember.merge(attrs, rels));

    return this.serializerOrRegistry.serialize(post);
  });

  this.patch('/posts/:id');

  // GET posts/:number/comments
  this.get('/posts/:postId/comments', function(schema, request) {
    let postId = request.params.postId;
    let post = schema.post.find(postId);
    return post.comments;
  });

  // POST comments
  this.post('/comments', (schema, request) => {
    let requestBody = JSON.parse(request.requestBody);
    let attributes = requestBody.data.attributes;
    let relationships = requestBody.data.relationships;

    // the API takes takes markdown_preview and renders body_preview, then copies
    // both to markdown and body respectively
    let markdown = attributes.markdown_preview;
    let body = `<p>${markdown}</p>`;

    let attrs = {
      markdown: markdown,
      markdownPreview: markdown,
      body: body,
      bodyPreview: body,
    };

    let rels = {
      postId: relationships.post.data.id,
      userId: relationships.user.data.id
    };

    let comment = schema.create('comment', Ember.merge(attrs, rels));

    return this.serializerOrRegistry.serialize(comment);
  });

  // GET project/posts
  this.get("/projects/:projectId/posts", (schema, request) => {
    let projectId = request.params.projectId;
    let postType = request.queryParams.post_type;

    let pageNumber = request.queryParams['page[number]'];
    let pageSize = request.queryParams['page[size]'] || 10;

    let project = schema.project.find(projectId);

    let posts;

    if (postType) {
      posts = project.posts.filter((p) =>  p.postType === postType );
    } else {
      posts = project.posts;
    }


    let postsPage = posts.filter((p, index) => {
      let pageNumberNotSpecified = !pageNumber;
      let indexIsOnSpecifiedPage = (index >= (pageNumber - 1) * pageSize) && (index < pageNumber * pageSize);
      return pageNumberNotSpecified || indexIsOnSpecifiedPage;
    });

    // hacky, but the only way I could find to pass in a mocked meta object
    // for our pagination tests
    postsPage.meta = {
      total_records: posts.length,
      total_pages: Math.ceil(posts.length / pageSize),
      page_size: pageSize,
      current_page: pageNumber || 1
    };

    return postsPage;
  });

  // GET /:slug
  this.get('/:sluggedRouteSlug', (schema, request) => {
    return schema.sluggedRoute.where({'slug': request.params.sluggedRouteSlug })[0];
  });

  // GET /:slug/projects
  this.get('/:organizationSlug/projects', (schema, request) => {
    let organizationSlug = request.params.organizationSlug;
    let organization = schema.organization.where({ 'slug': organizationSlug })[0];
    return organization.projects;
  });

  // GET /:slug/:project_slug
  this.get('/:sluggedRouteSlug/:projectSlug', (schema, request) => {
    let sluggedRouteSlug = request.params.sluggedRouteSlug;
    let projectSlug = request.params.projectSlug;

    let sluggedRoute = schema.sluggedRoute.where({ 'slug': sluggedRouteSlug })[0];

    return sluggedRoute.owner.projects.filter((p) => { return p.slug === projectSlug; })[0];
  });

  // GET post/:number
  this.get('/projects/:projectId/posts/:number', (schema, request) => {
    let projectId = parseInt(request.params.projectId);
    let number = parseInt(request.params.number);

    let project = schema.project.find(projectId);
    return project.posts.filter((p) => { return p.number === number; })[0];
  });
}
