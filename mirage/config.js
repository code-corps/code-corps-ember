import Mirage from 'ember-cli-mirage';
import Ember from 'ember';

const {
  isEmpty
} = Ember;

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
  'categories', 'comment-user-mentions', 'comments', 'donation-goals',
  'organizations', 'task-lists', 'task-skills', 'task-user-mentions', 'tasks',
  'previews', 'projects', 'project-categories', 'slugged-routes',
  'stripe-connect-accounts', 'stripe-connect-subscriptions',
  'stripe-connect-plans', 'stripe-platform-cards', 'stripe-platform-customers',
  'user-categories', 'users'
];

export default function() {
  this.passthrough('https://api.stripe.com/**');
  this.passthrough('https://uploads.stripe.com/**');
  this.post('https://api.cloudinary.com/**', () => {
    return new Mirage.Response(201, {}, {
      public_id: 'abc123'
    });
  });

  /**
  * Categories
  */

  this.get('/categories', { coalesce: true });
  this.post('/categories');
  this.get('/categories/:id');
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

  this.get('/comments', { coalesce: true });

  this.post('/comments', function(schema) {
    let attrs = this.normalizedRequestAttrs();
    // the API takes takes markdown and renders body
    attrs.body = `<p>${attrs.markdown}</p>`;
    return schema.create('comment', attrs);
  });

  this.get('/comments/:id');

  this.patch('/comments/:id', function(schema) {
    let attrs = this.normalizedRequestAttrs();
    let comment = schema.comments.find(attrs.id);

    // the API takes takes markdown and renders body
    attrs.body = `<p>${attrs.markdown}</p>`;

    comment.commentUserMentions.models.forEach((mention) => mention.destroy());
    return comment.update(attrs);
  });

  /**
   * Donation goals
   */

  this.get('/donation-goals', { coalesce: true });
  this.get('/donation-goals/:id');
  this.patch('/donation-goals/:id');
  this.post('/donation-goals');

  /**
  * Github App Installations
  */

  this.get('/github-app-installations', { coalesce: true });
  this.post('/github-app-installations');
  this.get('/github-app-installations/:id');

  /**
  * Github Repos
  */

  this.get('/github-repos', { coalesce: true });
  this.get('/github-repos/:id');

  /**
  * Organizations
  */

  this.get('/organizations', { coalesce: true });
  this.post('/organizations');
  this.get('/organizations/:id');
  this.patch('/organizations/:id');

  /**
  * Organization Github App Installations
  */

  this.get('/organization-github-app-installations', { coalesce: true });
  this.post('/organization-github-app-installations');
  this.get('/organization-github-app-installations/:id');
  this.delete('/organization-github-app-installations/:id');

  /**
  * Password
  */

  this.post('/password/forgot', () => {

    // just return something?
    return new Mirage.Response(201, {}, {
      email: 'test@test.com'
    });
  });

  this.post('/password/reset', function(schema) {
    let { password, 'password-confirmation': passwordConfirmation, token } = this.normalizedRequestAttrs();

    let [matchedUser] = schema.users.where({ token }).models;

    if (password === passwordConfirmation) {
      return new Mirage.Response(201, {}, {
        email: matchedUser.email,
        token,
        user_id: matchedUser.id
      });
    } else {
      let errorDetail = 'Your passwords do not match';
      return new Mirage.Response(422, {}, {
        errors: [
          {
            id: 'VALIDATION_ERROR',
            title: '422',
            detail: errorDetail,
            status: 422
          }
        ]
      });
    }
  });

  /**
  * Previews
  */

  this.post('/previews', function(schema) {
    let attrs = this.normalizedRequestAttrs();
    // the API takes takes markdown and renders body
    attrs.body = `<p>${attrs.markdown}</p>`;
    return schema.create('preview', attrs);
  });

  /**
  * Preview user mentions
  */

  this.get('/preview-user-mentions', (schema, request) => {
    let previewId = request.queryParams.preview_id;
    let preview = schema.previews.find(previewId);

    generatePreviewMentions(schema, preview);

    return schema.previewUserMentions.where({ previewId });
  });

  /**
  * Project categories
  */

  this.get('/project-categories', { coalesce: true });
  this.post('/project-categories');
  this.get('/project-categories/:id');
  this.delete('/project-categories/:id');

  /**
  * Project Github Repos
  */

  this.get('/project-github-repos', { coalesce: true });
  this.post('/project-github-repos');
  this.get('/project-github-repos/:id');
  this.delete('/project-github-repos/:id');

  /**
  * Project skills
  */

  this.get('/project-skills', { coalesce: true });
  this.post('/project-skills');
  this.get('/project-skills/:id');
  this.delete('/project-skills/:id');

  /**
  * Project users
  */

  this.get('/project-users', { coalesce: true });
  this.post('/project-users');
  this.get('/project-users/:id');
  this.patch('/project-users/:id');
  this.delete('/project-users/:id');

  /**
  * Projects
  */

  this.get('/projects', { coalesce: true });
  this.post('/projects');
  this.get('/projects/:id');

  this.get('/projects/:projectId/tasks', (schema, request) => {
    let { projectId } = request.params;
    let taskStatus = request.queryParams.status;

    let pageNumber = parseInt(request.queryParams['page[page]']);
    let pageSize = request.queryParams['page[page-size]'] || 10;

    let project = schema.projects.find(projectId);

    let { tasks } = project;

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

  this.patch('/projects/:id', function(schema) {
    // the API takes takes markdown and renders body
    let attrs = this.normalizedRequestAttrs();
    let project = schema.projects.find(attrs.id);
    attrs.longDescriptionBody = `<p>${attrs.longDescriptionMarkdown}</p>`;
    return project.update(attrs);
  });

  /**
  * Roles
  */

  this.get('/roles', { coalesce: true });
  this.post('/roles');
  this.get('/roles/:id');

  /**
  * Role Skills
  */

  this.get('/role-skills', { coalesce: true });
  this.post('/role-skills');
  this.get('/role-skills/:id');
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

  this.get('/skills', { coalesce: true });
  this.post('/skills');
  this.get('/skills/:id');

  /**
   * Stripe connect accounts
   */

  this.post('/stripe-connect-accounts', function(schema) {
    let attrs = this.normalizedRequestAttrs();
    attrs.recipientStatus = 'required';
    return schema.create('stripeConnectAccount', attrs);
  });

  this.get('/stripe-connect-accounts/:id');

  this.patch('/stripe-connect-accounts/:id', function(schema) {
    let attrs = this.normalizedRequestAttrs();
    let stripeConnectAccount = schema.stripeConnectAccounts.find(attrs.id);

    if (!isEmpty(attrs.legalEntityAddressCity)) {
      attrs.recipientStatus = 'verifying';
      attrs.personalIdNumberStatus = 'required';
    }

    if (!isEmpty(attrs.legalEntityPersonalIdNumber)) {
      attrs.personalIdNumberStatus = 'verified';
      attrs.verificationDocumentStatus = 'required';
    }

    if (!isEmpty(attrs.legalEntityVerificationDocument)) {
      attrs.recipientStatus = 'verified';
      attrs.verificationDocumentStatus = 'verified';
      attrs.bankAccountStatus = 'required';
    }

    if (!isEmpty(attrs.externalAccount)) {
      attrs.bankAccountStatus = 'verified';
    }

    return stripeConnectAccount.update(attrs);
  });

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

  this.get('/task-lists', { coalesce: true });
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
    let project = schema.projects.find(attrs.projectId);

    // the API takes takes markdown and renders body
    attrs.body = `<p>${attrs.markdown}</p>`;

    // the API sets task number as an auto-incrementing value, scoped
    // to project, so we need to simulate that here
    attrs.number = project.tasks.models.length + 1;

    return schema.create('task', attrs);
  });

  // GET /tasks/:id
  this.get('/tasks/:id');

  // PATCH /tasks/:id
  this.patch('/tasks/:id', function(schema) {
    let attrs = this.normalizedRequestAttrs();
    let task = schema.tasks.find(attrs.id);

    // the API takes takes markdown and renders body
    attrs.body = `<p>${attrs.markdown}</p>`;

    task.taskUserMentions.models.forEach((mention) => mention.destroy());
    task.order = (task.position || 0) * 100;
    return task.update(attrs);
  });

  /**
  * Task skills
  */

  this.get('/task-skills', { coalesce: true });
  this.post('/task-skills');
  this.get('/task-skills/:id');
  this.delete('/task-skills/:id');

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
    let { email, password, username, state = 'signed_up', signUpContext } = this.normalizedRequestAttrs();
    let user = schema.create('user', { email, password, state, username, signUpContext });
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
    if (!isEmpty(attrs.stateTransition)) {
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
    }

    return user.update(attrs);
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

  this.get('/user-roles', { coalesce: true });
  this.post('/user-roles');
  this.get('/user-roles/:id');
  this.delete('/user-roles/:id');

  /**
  * User skills
  */

  this.get('/user-skills', { coalesce: true });
  this.post('/user-skills');
  this.get('/user-skills/:id');
  this.delete('/user-skills/:id');

  /**
  * User tasks
  */

  this.get('/user-tasks', { coalesce: true });
  this.patch('/user-tasks/:id');
  this.post('/user-tasks');
  this.get('/user-tasks/:id');
  this.delete('/user-tasks/:id');

  // Create a passthrough for ember-cli-code-coverage
  // https://github.com/kategengler/ember-cli-code-coverage
  this.passthrough('/write-coverage');
}
