import Mirage from 'ember-cli-mirage';

function generateCommentMentions(schema, comment) {
  let body = comment.body || '';
  let matches = body.match(/@\w+/g) || [];

  matches.forEach((match) => {
    let username = match.substr(1);
    let [matchedUser] = schema.users.where({ username }).models;
    if (matchedUser) {
      let startIndex = body.indexOf(match);
      let endIndex = startIndex + match.length - 1;
      schema.create('commentUserMention', {
        username,
        indices: [startIndex, endIndex],
        userId: matchedUser.id,
        commentId: comment.id,
        taskId: comment.taskId
      });
    }
  });
}

function generateTaskMentions(schema, task) {
  let body = task.body || '';
  let matches = body.match(/@\w+/g) || [];

  matches.forEach((match) => {
    let username = match.substr(1);
    let [matchedUser] = schema.users.where({ username }).models;
    if (matchedUser) {
      let startIndex = body.indexOf(match);
      let endIndex = startIndex + match.length - 1;
      schema.taskUserMentions.create({
        username,
        indices: [startIndex, endIndex],
        userId: matchedUser.id,
        taskId: task.id
      });
    }
  });
}

function generatePreviewMentions(schema, preview) {
  let body = preview.body || '';
  let matches = body.match(/@\w+/g) || [];

  matches.forEach((match) => {
    let username = match.substr(1);
    let [matchedUser] = schema.users.where({ username });
    if (matchedUser) {
      let startIndex = body.indexOf(match);
      let endIndex = startIndex + match.length - 1;
      schema.previewUserMentions.create({
        username,
        indices: [startIndex, endIndex],
        userId: matchedUser.id,
        previewId: preview.id
      });
    }
  });
}

// The set of routes we have defined; needs updated when adding new routes
const routes = [
  'categories', 'comment-user-mentions', 'comments', 'donation-goals', 'organizations', 'task-lists',
  'task-user-mentions', 'tasks', 'previews', 'projects', 'project-categories', 'slugged-routes',
  'stripe-connect-accounts', 'stripe-connect-subscriptions', 'stripe-connect-plans',
  'stripe-platform-cards', 'stripe-platform-customers',
  'user-categories', 'users'
];

export default function() {
  /**
  * Categories
  */

  // GET /categories
  this.get('/categories', { coalesce: true });

  // POST /categories
  this.post('/categories');

  // GET /categories/:id
  this.get('/categories/:id');

  // PATCH /categories
  this.patch('/categories/:id');

  /**
  * Comment user mentions
  */

  // GET /comment-user-mentions
  this.get('/comment-user-mentions', (schema, request) => {
    let commentId = request.queryParams.comment_id;
    let comment = schema.comments.find(commentId);

    generateCommentMentions(schema, comment);

    return schema.commentUserMentions.where({ commentId });
  });

  /**
  * Comments
  */

  // GET /comments
  this.get('/comments', { coalesce: true });

  // POST /comments
  this.post('/comments', function(schema) {
    let attrs = this.normalizedRequestAttrs();
    // the API takes takes markdown and renders body
    attrs.body = `<p>${attrs.markdown}</p>`;
    return schema.create('comment', attrs);
  });

  // GET /comments/:id
  this.get('/comments/:id');

  // PATCH /comments/:id
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

  /**
   * Donation goals
   */

  this.get('/donation-goals', { coalesce: true });
  this.get('/donation-goals/:id');
  this.patch('/donation-goals/:id');
  this.post('/donation-goals');

  /**
  * Organization memberships
  */

  // GET /organization-memberships
  this.get('/organization-memberships', { coalesce: true });

  // POST /organization-memberships
  this.post('/organization-memberships');

  // GET /organization-memberships/:id
  this.get('/organization-memberships/:id');

  // PATCH /organization-memberships/:id
  this.patch('/organization-memberships/:id');

  // DELETE /organization-memberships/:id
  this.delete('/organization-memberships/:id');

  /**
  * Organizations
  */

  // GET /organizations
  this.get('/organizations', { coalesce: true });

  // POST /organizations
  this.post('/organizations');

  // GET /organizations/:id
  this.get('/organizations/:id');

  // PATCH /organizations/:id
  this.patch('/organizations/:id');

  /**
  * Previews
  */

  // POST /previews
  this.post('/previews', function(schema) {
    let attrs = this.normalizedRequestAttrs();
    // the API takes takes markdown and renders body
    attrs.body = `<p>${attrs.markdown}</p>`;
    return schema.create('preview', attrs);
  });

  /**
  * Preview user mentions
  */

  // GET /preview-user-mentions
  this.get('/preview-user-mentions', (schema, request) => {
    let previewId = request.queryParams.preview_id;
    let preview = schema.previews.find(previewId);

    generatePreviewMentions(schema, preview);

    return schema.previewUserMentions.where({ previewId });
  });

  /**
  * Project categories
  */

  // GET /project-categories
  this.get('/project-categories', { coalesce: true });

  // POST /project-categories
  this.post('/project-categories');

  // GET /project-categories/:id
  this.get('/project-categories/:id');

  // DELETE /project-categories/:id
  this.delete('/project-categories/:id');

  /**
  * Project skills
  */

  // GET /project-skills
  this.get('/project-skills', { coalesce: true });

  // POST /project-skills
  this.post('/project-skills');

  // GET /project-skills/:id
  this.get('/project-skills/:id');

  // DELETE /project-skills/:id
  this.delete('/project-skills/:id');

  /**
  * Projects
  */

  // GET /projects
  this.get('/projects', { coalesce: true });

  // POST /projects
  this.post('/projects');

  // GET /projects/:id
  this.get('/projects/:id');

  // GET project/:id/tasks
  this.get('/projects/:projectId/tasks', (schema, request) => {
    let { projectId } = request.params;
    let taskType = request.queryParams.task_type;
    let taskStatus = request.queryParams.status;

    let pageNumber = parseInt(request.queryParams['page[page]']);
    let pageSize = request.queryParams['page[page-size]'] || 10;

    let project = schema.projects.find(projectId);

    let { tasks } = project;

    if (taskType) {
      tasks = tasks.filter((p) =>  p.taskType === taskType);
    }

    if (taskStatus) {
      tasks = tasks.filter((p) => p.status === taskStatus);
    }

    let tasksPage = tasks.filter((p, index) => {
      let pageNumberNotSpecified = !pageNumber;
      let indexIsOnSpecifiedPage = (index >= (pageNumber - 1) * pageSize) && (index < pageNumber * pageSize);
      return pageNumberNotSpecified || indexIsOnSpecifiedPage;
    });

    // hacky, but the only way I could find to pass in a mocked meta object
    // for our pagination tests
    tasksPage.meta = {
      'total_records': tasks.models.length,
      'total_pages': Math.ceil(tasks.models.length / pageSize),
      'page_size': pageSize,
      'current_page': pageNumber || 1
    };

    return tasksPage;
  });

  // GET /projects/:id/task/:number
  this.get('/projects/:projectId/tasks/:number', (schema, request) => {
    let projectId = parseInt(request.params.projectId);
    let number = parseInt(request.params.number);

    let project = schema.projects.find(projectId);
    let [task] = project.tasks.filter((p) => {
      return p.number === number;
    }).models;

    task.comments.models.forEach((comment) => {
      generateCommentMentions(schema, comment);
    });

    return task;
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

  /**
  * Roles
  */

  // GET /roles
  this.get('/roles', { coalesce: true });

  // POST /roles
  this.post('/roles');

  // GET /roles/:id
  this.get('/roles/:id');

  /**
  * Role Skills
  */

  // GET /role-skills
  this.get('/role-skills', { coalesce: true });

  // POST /role-skills
  this.post('/role-skills');

  // GET /role-skills/:id
  this.get('/role-skills/:id');

  // DELETE /role-skills/:id
  this.delete('/role-skills/:id');

  /**
  * Slugs and slugged routes
  */

  // GET /:slug
  this.get('/:slug', (schema, request) => {
    if (routes.includes(request.params.slug)) {
      console.error('API route being caught in /:slug in mirage/config.js', request.params.slug);
    }
    return schema.sluggedRoutes.where({ 'slug': request.params.slug }).models[0];
  });

  // GET /:slug/projects
  this.get('/:slug/projects', (schema, request) => {
    let { slug } = request.params;
    let [organization] = schema.organizations.where({ slug }).models;
    return organization.projects;
  });

  // GET /:slug/:project_slug
  this.get('/:sluggedRouteSlug/:projectSlug', (schema, request) => {
    let { sluggedRouteSlug, projectSlug } = request.params;

    let [sluggedRoute] = schema.sluggedRoutes.where({ 'slug': sluggedRouteSlug }).models;

    return sluggedRoute.organization.projects.filter((p) => {
      return p.slug === projectSlug;
    }).models[0];
  });

  /**
  * Skills
  */

  // GET /skills
  this.get('/skills', { coalesce: true });

  // POST /skills
  this.post('/skills');

  // GET /skills/:id
  this.get('/skills/:id');

  /**
   * Stripe connect accounts
   */

  this.post('/stripe-connect-accounts');
  this.get('/stripe-connect-accounts/:id');

  /**
   * Stripe plans
   */

  this.post('/stripe-connect-plans');
  this.get('/stripe-connect-plans/:id');

  /**
   * Stripe platform cards
   */

  this.post('/stripe-platform-cards');
  this.get('/stripe-platform-cards/:id');

  /**
   * Stripe customers
   */

  this.post('/stripe-platform-customers');
  this.get('/stripe-platform-customers/:id');

  /**
   * Stripe subscriptions
   */

  this.post('/stripe-connect-subscriptions');
  this.get('/stripe-connect-subscriptions/:id');

  /**
  * Task lists
  */

  // GET /task-lists
  this.get('/task-lists', { coalesce: true });

  // GET /task-lists/:id
  this.get('/task-lists/:id');

  /**
  * Task user mentions
  */

  // GET /task-user-mentions
  this.get('/task-user-mentions', (schema, request) => {
    let taskId = request.queryParams.task_id;
    let task = schema.tasks.find(taskId);

    generateTaskMentions(schema, task);

    return schema.taskUserMentions.where({ taskId });
  });

  /**
  * Tasks
  */

  // GET /tasks
  this.get('/tasks', { coalesce: true });

  // POST /tasks
  this.post('/tasks', function(schema) {
    let attrs = this.normalizedRequestAttrs();

    // the API takes takes markdown and renders body
    attrs.body = `<p>${attrs.markdown}</p>`;

    // the API sets task number as an auto-incrementing value, scoped to project,
    // so we need to simulate that here
    attrs.number = schema.projects.find(attrs.projectId).tasks.models.length + 1;

    return schema.create('task', attrs);
  });

  // GET /tasks/:id
  this.get('/tasks/:id');

  // PATCH /tasks/:id
  this.patch('/tasks/:id', function(schema) {
    let attrs = this.normalizedRequestAttrs();

    // the API takes takes markdown and renders body
    attrs.body = `<p>${attrs.markdown}</p>`;

    let task = schema.tasks.find(attrs.id);
    task.attrs = attrs;

    task.taskUserMentions.models.forEach((mention) => mention.destroy());
    task.order = (task.position || 0) * 100;
    task.save();

    return task;
  });

  /**
  * Token
  */

  // POST /token
  this.post('/token', (schema, request) => {
    let json = JSON.parse(request.requestBody);

    let { models } = schema.users.where({ email: json.username, password: json.password });

    if (models.length > 0) {
      return {
        // token encoded at https://jwt.io/
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6InBhc3N3b3JkIiwidXNlcm5hbWUiOiJvd25lckBjb2RlY29ycHMub3JnIiwidXNlcl9pZCI6MSwiZXhwIjo3MjAwMDAwMH0.LxkkKMcQoccAA0pphgRfXPSLdyaCawlK1gB3yPCht2s',
        user_id: models[0].id
      };
    } else {
      let errorDetail = `Your password doesn't match the email ${json.username}.`;
      return new Mirage.Response(401, {}, {
        errors: [
          {
            id: 'UNAUTHORIZED',
            title: '401 Unauthorized',
            detail: errorDetail,
            status: 401
          }
        ]
      });
    }
  });

  /**
  * Users
  */

  this.get('/users', { coalesce: true });

  this.post('/users', function(schema) {
    let { email, password, username } = this.normalizedRequestAttrs();
    let user = schema.create('user', {
      email,
      password,
      state: 'signed_up',
      username
    });
    schema.create('sluggedRoute', { slug: user.username, user });
    return user;
  });

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
        console.error('You added a transition without changing the state machine in Mirage.');
        break;
    }

    user.attrs = attrs;
    user.save();
    return user;
  });

  // GET /users/email_available
  this.get('/users/email_available', (schema, request) => {
    let { email } = request.queryParams;
    let { models } = schema.users.where({ email });
    let available = models.length === 0;
    return { available, valid: true };
  });

  // GET /users/username_available
  this.get('/users/username_available', (schema, request) => {
    let { username } = request.queryParams;
    let { models } = schema.users.where({ username });
    let available = models.length === 0;
    return { available, valid: true };
  });

  /**
  * User categories
  */

  // GET /user-categories
  this.get('/user-categories', { coalesce: true });

  // POST /user-categories
  this.post('/user-categories');

  // GET /user-categories/:id
  this.get('/user-categories/:id');

  // DELETE /user-categories/:id
  this.delete('/user-categories/:id');

  /**
  * User roles
  */

  // GET /user-roles
  this.get('/user-roles', { coalesce: true });

  // POST /user-roles
  this.post('/user-roles');

  // GET /user-roles
  this.get('/user-roles/:id');

  // DELETE /user-roles/:id
  this.delete('/user-roles/:id');

  /**
  * User skills
  */

  // GET /user-skills
  this.get('/user-skills', { coalesce: true });

  // POST /user-skills
  this.post('/user-skills');

  // GET /user-skills
  this.get('/user-skills/:id');

  // DELETE /user-skills/:id
  this.delete('/user-skills/:id');
}
