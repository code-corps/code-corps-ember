import Mirage from 'ember-cli-mirage';
import Ember from 'ember';

function generateCommentMentions(schema, comment) {
  let body = comment.body || '';
  let matches = body.match(/@\w+/g) || [];

  matches.forEach((match) => {
    let username = match.substr(1);
    let matchedUser = schema.users.where({ username: username }).models[0];
    if (matchedUser) {
      let startIndex = body.indexOf(match);
      let endIndex = startIndex + match.length - 1;
      schema.create('commentUserMention', {
        username: username,
        indices: [startIndex, endIndex],
        userId: matchedUser.id,
        commentId: comment.id,
        postId: comment.postId
      });
    }
  });
}

function generatePostMentions(schema, post) {
  let body = post.body || '';
  let matches = body.match(/@\w+/g) || [];

  matches.forEach((match) => {
    let username = match.substr(1);
    let matchedUser = schema.users.where({ username: username }).models[0];
    if (matchedUser) {
      let startIndex = body.indexOf(match);
      let endIndex = startIndex + match.length - 1;
      schema.postUserMentions.create({
        username: username,
        indices: [startIndex, endIndex],
        userId: matchedUser.id,
        postId: post.id
      });
    }
  });
}

function generatePreviewMentions(schema, preview) {
  let body = preview.body || '';
  let matches = body.match(/@\w+/g) || [];

  matches.forEach((match) => {
    let username = match.substr(1);
    let matchedUser = schema.users.where({ username: username }).models[0];
    if (matchedUser) {
      let startIndex = body.indexOf(match);
      let endIndex = startIndex + match.length - 1;
      schema.previewUserMentions.create({
        username: username,
        indices: [startIndex, endIndex],
        userId: matchedUser.id,
        previewId: preview.id
      });
    }
  });
}

// The set of routes we have defined; needs updated when adding new routes
const routes = [
  'categories', 'comment-user-mentions', 'comments', 'organizations',
  'post-user-mentions', 'posts', 'previews', 'projects', 'project-categories',
  'slugged-routes', 'user-categories', 'users',
];

export default function() {
  /////////////
  // Categories
  /////////////

  // GET /categories
  this.get('/categories');


  ////////////////////////
  // Comment user mentions
  ////////////////////////

  // GET /comment-user-mentions
  this.get('/comment-user-mentions', (schema, request) => {
    let commentId = request.queryParams.comment_id;
    let comment = schema.comments.find(commentId);

    generateCommentMentions(schema, comment);

    return schema.commentUserMentions.where({ commentId: commentId });
  });


  ///////////
  // Comments
  ///////////

  // POST /comments
  this.post('/comments', function(schema) {
    let attrs = this.normalizedRequestAttrs();
    // the API takes takes markdown and renders body
    attrs.body = `<p>${attrs.markdown}</p>`;
    return schema.create('comment', attrs);
  });

  // GET /comments/:id
  this.patch('/comments/:id', function(schema) {
    let attrs = this.normalizedRequestAttrs();
    let comment = schema.comments.find(attrs.id);
    // the API takes takes markdown and renders body
    attrs.body = `<p>${attrs.markdown}</p>`;

    // for some reason, comment.update(key, value) updates comment properties, but
    // doesn't touch the comment.attrs object, which is what is used in response
    // serialization
    comment.attrs = attrs;

    comment.commentUserMentions.models.forEach((mention) => mention.destroy());
    comment.save();

    return comment;
  });


  ////////
  // Login
  ////////

  // POST /login
  this.post('/login', (db, request) => {
    let json = JSON.parse(request.requestBody);

    if(json.username === "josh@coderly.com" && json.password === "password") {
      return {
        // token encoded at https://jwt.io/
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6InBhc3N3b3JkIiwidXNlcm5hbWUiOiJqb3NoQGNvZGVybHkuY29tIiwidXNlcl9pZCI6MSwiZXhwIjo3MjAwfQ.QVDyAznECIWL6DjDs9iPezvMmoPuzDqAl4bQ6CY-fCQ"
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


  ///////////////////////////
  // Organization memberships
  ///////////////////////////

  // GET /organization-memberships
  this.get('/organization-memberships', { coalesce: true });

  // POST /organization-memberships
  this.post('/organization-memberships');

  // DELETE /organization-memberships/:id
  this.delete('/organization-memberships/:id');

  // GET /organization-memberships/:id
  this.get('/organization-memberships/:id');

  // PATCH /organization-memberships/:id
  this.patch('/organization-memberships/:id');


  ////////////////
  // Organizations
  ////////////////

  this.get('/organizations', { coalesce: true });

  this.get('/organizations/:id');


  /////////////////////
  // Post user mentions
  /////////////////////

  // GET /post-user-mentions
  this.get('/post-user-mentions', (schema, request) => {
    let postId = request.queryParams.post_id;
    let post = schema.posts.find(postId);

    generatePostMentions(schema, post);

    return schema.postUserMentions.where({ postId: postId });
  });


  ////////
  // Posts
  ////////

  // POST /posts
  this.post('/posts', function(schema) {
    let attrs = this.normalizedRequestAttrs();

    // the API takes takes markdown and renders body
    attrs.body = `<p>${attrs.markdown}</p>`;

    // the API sets post number as an auto-incrementing value, scoped to project,
    // so we need to simulate that here
    attrs.number = schema.projects.find(attrs.projectId).posts.models.length + 1;

    return schema.create('post', attrs);
  });

  // PATCH /posts/:id
  this.patch('/posts/:id', function(schema) {
    let attrs = this.normalizedRequestAttrs();

    // the API takes takes markdown and renders body
    attrs.body = `<p>${attrs.markdown}</p>`;

    let post = schema.posts.find(attrs.id);
    post.attrs = attrs;

    post.postUserMentions.models.forEach((mention) => mention.destroy());
    post.save();

    return post;
  });

  // GET posts/:number/comments
  this.get('/posts/:postId/comments', function(schema, request) {
    let postId = request.params.postId;
    let post = schema.posts.find(postId);

    return post.comments;
  });


  ///////////
  // Previews
  ///////////

  // POST /previews
  this.post('/previews', (schema, request) => {
    let requestBody = JSON.parse(request.requestBody);
    let attributes = requestBody.data.attributes;

    // the API takes takes markdown and renders body
    let markdown = attributes.markdown;
    let body = `<p>${markdown}</p>`;

    let attrs = { markdown: markdown, body: body };

    // preview user is set API-side
    let rels = { };
    let currentUser = schema.users.first();
    if (currentUser) {
      rels.userId = currentUser.id;
    }

    let preview = schema.create('preview', Ember.merge(attrs, rels));

    return preview;
  });

  /////////////////////
  // Preview user mentions
  /////////////////////

  // GET /preview-user-mentions
  this.get('/preview-user-mentions', (schema, request) => {
    let previewId = request.queryParams.preview_id;
    let preview = schema.previews.find(previewId);

    generatePreviewMentions(schema, preview);

    return schema.previewUserMentions.where({ previewId: previewId });
  });


  ///////////
  // Projects
  ///////////

  // GET /projects
  this.get('/projects');

  // GET /projects/:id
  this.get('/projects/:id');

  // GET project/:id/posts
  this.get("/projects/:projectId/posts", (schema, request) => {
    let projectId = request.params.projectId;
    let postType = request.queryParams["post_type"];
    let postStatus = request.queryParams.status;

    let pageNumber = parseInt(request.queryParams['page[page]']);
    let pageSize = request.queryParams['page[page-size]'] || 10;

    let project = schema.projects.find(projectId);

    let posts = project.posts;

    if (postType) {
      posts = posts.filter((p) =>  p.postType === postType );
    }

    if (postStatus) {
      posts = posts.filter((p) => p.status === postStatus);
    }

    let postsPage = posts.filter((p, index) => {
      let pageNumberNotSpecified = !pageNumber;
      let indexIsOnSpecifiedPage = (index >= (pageNumber - 1) * pageSize) && (index < pageNumber * pageSize);
      return pageNumberNotSpecified || indexIsOnSpecifiedPage;
    });

    // hacky, but the only way I could find to pass in a mocked meta object
    // for our pagination tests
    postsPage.meta = {
      "total_records": posts.models.length,
      "total_pages": Math.ceil(posts.models.length / pageSize),
      "page_size": pageSize,
      "current_page": pageNumber || 1
    };

    return postsPage;
  });

  // GET /projects/:id/post/:number
  this.get('/projects/:projectId/posts/:number', (schema, request) => {
    let projectId = parseInt(request.params.projectId);
    let number = parseInt(request.params.number);

    let project = schema.projects.find(projectId);
    let post = project.posts.filter((p) => { return p.number === number; }).models[0];

    post.comments.models.forEach((comment) => {
      generateCommentMentions(schema, comment);
    });

    return post;
  });

  // PATCH /projects/:id
  this.patch('/projects/:id', function(schema) {
    // the API takes takes markdown and renders body
    let attrs = this.normalizedRequestAttrs();
    attrs.longDescriptionBody = `<p>${attrs.longDescriptionMarkdown}</p>`;

    let project = schema.projects.find(attrs.id);
    project.attrs = attrs;
    project.save();
    return project;
  });

  ////////
  // Roles
  ////////

  // GET /roles
  this.get('/roles');

  ///////////////////////////
  // Slugs and slugged routes
  ///////////////////////////

  // GET /:slug
  this.get('/:slug', (schema, request) => {
    if (routes.contains(request.params.slug)) {
      console.error('API route being caught in /:slug in mirage/config.js', request.params.slug);
    }
    return schema.sluggedRoutes.where({'slug': request.params.slug }).models[0];
  });

  // GET /:slug/projects
  this.get('/:slug/projects', (schema, request) => {
    let slug = request.params.slug;
    let organization = schema.organizations.where({ 'slug': slug }).models[0];
    return organization.projects;
  });

  // GET /:slug/:project_slug
  this.get('/:sluggedRouteSlug/:projectSlug', (schema, request) => {
    let sluggedRouteSlug = request.params.sluggedRouteSlug;
    let projectSlug = request.params.projectSlug;

    let sluggedRoute = schema.sluggedRoutes.where({ 'slug': sluggedRouteSlug }).models[0];

    return sluggedRoute.organization.projects.filter((p) => { return p.slug === projectSlug; }).models[0];
  });

  /////////
  // Skills
  /////////

  // GET /skills
  this.get('/skills');

  // GET /skills/:id
  this.get('/skills/:id');


  ////////
  // Users
  ////////


  this.get('/users', { coalesce: true });

  this.get('/users/:id');

  // PATCH /users/:id
  this.patch('/users/:id', function(schema) {
    let attrs = this.normalizedRequestAttrs();
    let userId = attrs.id;
    let user = schema.users.find(userId);

    // Mock out state machine
    switch (attrs.stateTransition) {
      case 'edit_profile':
        attrs.state = 'edited_profile';
        break;
      case 'select_categories':
        attrs.state = 'selected_categories';
        break;
      case 'select_roles':
        attrs.state = 'selected_roles';
        break;
      case 'select_skills':
        attrs.state = 'selected_skills';
        break;
      default:
        console.error("You added a transition without changing the state machine in Mirage.");
        break;
    }

    user.attrs = attrs;
    user.save();
    return user;
  });

  // GET /users/email_available
  this.get('/users/email_available', () => {
    return { available: true, valid: true };
  });


  // GET /users/username_available
  this.get('/users/username_available', () => {
    return { available: true, valid: true };
  });


  //////////////////
  // User categories
  //////////////////

  // GET /user-categories
  this.get('/user-categories');

  // POST /user-categories
  this.post('/user-categories');

  // GET /user-categories/:id
  this.get('/user-categories/:id');

  // DELETE /user-categories/:id
  this.delete('/user-categories/:id');


  /////////////
  // User roles
  /////////////

  // POST /user-roles
  this.post('/user-roles');

  // DELETE /user-roles
  this.delete('/user-roles/:id');


  //////////////
  // User skills
  //////////////

  // GET /user-skills
  this.get('/user-skills');

  // POST /user-skills
  this.post('/user-skills');

  // DELETE /user-skills/:id
  this.delete('/user-skills/:id');
}
