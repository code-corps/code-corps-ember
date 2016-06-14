import Mirage from 'ember-cli-mirage';
import Ember from 'ember';

function generatePostMentions(schema, post, mentionStatus) {
  let body = post.body || '';
  let matches = body.match(/@\w+/g) || [];

  matches.forEach((match) => {
    let username = match.substr(1);
    let matchedUser = schema.users.where({ username: username }).models[0];
    if (matchedUser) {
      let startIndex = body.indexOf(match);
      let endIndex = startIndex + match.length - 1;
      schema.postUserMentions.create({
        username: username, indices: [startIndex, endIndex], status: mentionStatus,
        userId: matchedUser.id, postId: post.id
      });
    }
  });
}

function generateCommentMentions(schema, comment, mentionStatus) {
  let body = comment.body || '';
  let matches = body.match(/@\w+/g) || [];

  matches.forEach((match) => {
    let username = match.substr(1);
    let matchedUser = schema.users.where({ username: username }).models[0];
    if (matchedUser) {
      let startIndex = body.indexOf(match);
      let endIndex = startIndex + match.length - 1;
      schema.commentUserMentions.create({
        username: username, indices: [startIndex, endIndex], status: mentionStatus,
        userId: matchedUser.id, commentId: comment.id
      });
    }
  });
}

const routes = [
  'categories', 'comment_user_mentions', 'comments', 'organizations',
  'post_user_mentions', 'posts', 'projects', 'project_categories',
  'slugged_routes', 'user_categories', 'users',
];

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

  this.get('/categories');

  this.get('/user_categories', { /* coalesce: true */ });
  this.get('/user_categories/:id');

  // TODO: Make this work when relationships work
  this.post('/user_categories', (schema, request) => {
    let requestBody = JSON.parse(request.requestBody);
    let relationships = requestBody.data.relationships;
    let userId = relationships.user.data.id;
    let categoryId = relationships.category.data.id;
    let userCategory = schema.create('userCategory', { categoryId: categoryId, userId: userId });
    return userCategory;
  });

  this.delete('/user_categories/:id');

  this.get('/organization_memberships/:id');
  this.post('/organization_memberships');

  // TODO: Make this work when relationships work
  this.post('/user_roles', (schema, request) => {
    let requestBody = JSON.parse(request.requestBody);
    let relationships = requestBody.data.relationships;
    let userId = relationships.user.data.id;
    let roleId = relationships.role.data.id;
    let userRole = schema.create('userRole', { roleId: roleId, userId: userId });
    return userRole;
  });

  this.delete('/user_roles/:id');

  this.get('/organizations', { /* coalesce: true */ });
  this.get('/organizations/:id');

  this.get('/projects/:id');

  this.get('/roles');

  this.get('/users/:id');
  // this.get('/users', (schema, request) => {
  //   let ids = request.queryParams["filter[id]"];
  //   return schema.users.find(ids.split(','));
  // });

  this.get('/users/email_available', () => {
    return { available: true, valid: true };
  });

  this.get('/users/username_available', () => {
    return { available: true, valid: true };
  });

  this.get('/user', (schema) => {
    // due to the nature of how we fetch the current user, all we can do here is
    // return one of the users available in the schema, or create a new one
    let users = schema.users.all();
    if (users.models.length > 0) {
      return users.models[0];
    } else {
      return schema.create('user');
    }
  });

  this.patch('/users/me', (schema, request) => {
    let requestBody = JSON.parse(request.requestBody);
    let attributes = requestBody.data.attributes;
    let userId = requestBody.data.id;
    let user = schema.users.find(userId);

    // Mock out state machine
    var state;
    switch (attributes.state_transition) {
      case 'select_categories':
        state = 'selected_categories';
        break;
      case 'select_roles':
        state = 'selected_roles';
        break;
      case 'select_skills':
        state = 'selected_skills';
        break;
      default:
        break;
    }

    let attrs = {
      id: userId,
      state: state,
    };

    user.attrs = attrs;
    user.save();
    return user;
  });

  this.get('/post_user_mentions', (schema, request) => {
    let postId = request.queryParams.post_id;
    let post = schema.posts.find(postId);
    let status = request.queryParams.status;

    generatePostMentions(schema, post, status);

    return schema.postUserMentions.where({ postId: postId, status: status });
  });

  this.get('/comment_user_mentions', (schema, request) => {
    let commentId = request.queryParams.comment_id;
    let comment = schema.comments.find(commentId);
    let status = request.queryParams.status;

    generateCommentMentions(schema, comment, status);

    return schema.commentUserMentions.where({ commentId: commentId, status: status });
  });

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
    let number = schema.projects.find(relationships.project.data.id).posts.models.length + 1;

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

    return post;
  });


  this.patch('/posts/:id', (schema, request) => {
    let requestBody = JSON.parse(request.requestBody);
    let attributes = requestBody.data.attributes;
    let postId = request.params.id;
    let post = schema.posts.find(postId);
    // the API takes takes markdown_preview and renders body_preview, then copies
    // both to markdown and body respectively
    let markdown = attributes.markdown_preview;
    let body = `<p>${markdown}</p>`;

    let attrs = {
      id: postId,
      markdown: markdown,
      markdownPreview: markdown,
      body: body,
      bodyPreview: body,
      title: attributes.title,
      postType: attributes.post_type
    };

    // for some reason, post.update(key, value) updates post properties, but
    // doesn't touch the post.attrs object, which is what is used in response
    // serialization
    post.attrs = attrs;

    post.postUserMentions.models.forEach((mention) => mention.destroy());
    post.save();

    return post;
  });

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
    return comment;
  });

  this.patch('/comments/:id', (schema, request) => {
    let requestBody = JSON.parse(request.requestBody);
    let attributes = requestBody.data.attributes;
    let commentId = request.params.id;
    let comment = schema.comments.find(commentId);
    // the API takes takes markdown_preview and renders body_preview, then copies
    // both to markdown and body respectively
    let markdown = attributes.markdown_preview;
    let body = `<p>${markdown}</p>`;

    let attrs = {
      id: commentId,
      markdown: markdown,
      markdownPreview: markdown,
      body: body,
      bodyPreview: body,
    };

    // for some reason, post.update(key, value) updates post properties, but
    // doesn't touch the post.attrs object, which is what is used in response
    // serialization
    comment.attrs = attrs;

    comment.commentUserMentions.models.forEach((mention) => mention.destroy());
    comment.save();

    return comment;
  });

  // GET posts/:number/comments
  this.get('/posts/:postId/comments', function(schema, request) {
    let postId = request.params.postId;
    let post = schema.posts.find(postId);
    return post.comments;
  });

  // GET project/posts
  this.get("/projects/:projectId/posts", (schema, request) => {
    let projectId = request.params.projectId;
    let postType = request.queryParams.post_type;

    let pageNumber = request.queryParams['page[number]'];
    let pageSize = request.queryParams['page[size]'] || 10;

    let project = schema.projects.find(projectId);

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
      total_records: posts.models.length,
      total_pages: Math.ceil(posts.models.length / pageSize),
      page_size: pageSize,
      current_page: pageNumber || 1
    };

    return postsPage;
  });

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

    return sluggedRoute.owner.projects.filter((p) => { return p.slug === projectSlug; }).models[0];
  });

  // GET post/:number
  this.get('/projects/:projectId/posts/:number', (schema, request) => {
    let projectId = parseInt(request.params.projectId);
    let number = parseInt(request.params.number);

    let project = schema.projects.find(projectId);
    return project.posts.filter((p) => { return p.number === number; }).models[0];
  });

  this.get('/projects');
}
