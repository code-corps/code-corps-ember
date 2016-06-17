import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';

let application;

function createProject(slug) {
  slug = slug || 'test_organization';

  // server.create uses factories. server.schema.<obj>.create does not
  let project = server.create('project');

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create<<<<<<< HEAD
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  sluggedRoute.owner = organization;
  sluggedRoute.save();

  project.organization = organization;
  project.save();

  return project;
}

module('Acceptance: Project', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('It renders navigation properly', (assert) => {
  assert.expect(2);

  let project = createProject();
  let aboutURL = `/${project.organization.slug}/${project.slug}`;
  let postsURL = `/${project.organization.slug}/${project.slug}/posts`;
  visit(postsURL);

  andThen(function() {
    let hrefToAbout = find('.project-menu li:first a').attr('href');
    assert.equal(hrefToAbout, aboutURL, 'Link to about is properly rendered');
    let hrefToPosts = find('.project-menu li:eq(1) a').attr('href');
    assert.equal(hrefToPosts, postsURL, 'Link to posts is properly rendered');
  });
});

test('Navigation works', (assert) => {
  assert.expect(6);

  let project = createProject();
  let postsURL = `/${project.organization.slug}/${project.slug}/posts`;
  visit(postsURL);

  andThen(function() {
    assert.equal(currentRouteName(), 'project.posts.index');
    assert.ok(find('.project-menu li:eq(1) a.active').length === 1, 'Posts link is active');
    click('.project-menu li:eq(0) a');
  });
  andThen(() => {
    assert.equal(currentRouteName(), 'project.index');
    assert.ok(find('.project-menu li:eq(0) a.active').length === 1, 'About link is active');
    click('.project-menu li:eq(1) a');
  });
  andThen(() => {
    assert.equal(currentRouteName(), 'project.posts.index');
    assert.ok(find('.project-menu li:eq(1) a.active').length === 1, 'Posts link is active');
  });
});

test('It renders all the required ui elements for post list', (assert) => {
  assert.expect(4);

  let project = createProject();
  server.createList('post', 5, { projectId: project.id });
  let postsURL = `/${project.organization.slug}/${project.slug}/posts`;
  visit(postsURL);

  andThen(function() {
    assert.equal(find('.project-details').length, 1, 'project-details component is rendered');
    assert.equal(find('.project-post-list').length, 1, 'project-post-list component is rendered');
    assert.equal(find('.project-post-list .post-item').length, 5, 'correct number of posts is rendered');

    let hrefToFirstPost = find('.project-post-list .post-item:first a').attr('href');
    let expectedHrefToFirstPost = `${postsURL}/0`;

    assert.equal(hrefToFirstPost, expectedHrefToFirstPost, 'Link to specific post is properly rendered');
  });
});

test('Post filtering by type works', (assert) => {
  assert.expect(4);

  let project = createProject();

  // we use server.createList so factories are used in creation
  server.createList('post', 1, { postType: 'idea', projectId: project.id });
  server.createList('post', 6, { postType: 'task', projectId: project.id });
  server.createList('post', 3, { postType: 'issue', projectId: project.id });

  let postsURL = `${project.organization.slug}/${project.slug}/posts`;

  visit(postsURL);

  andThen(() => {
    assert.equal(find('.project-post-list .post-item').length, 10, 'correct number of posts is rendered');
    click('.filter.ideas');
  });

  andThen(() => {
    assert.equal(find('.project-post-list .post-item').length, 1, 'only ideas are rendered');
    click('.posts-filters .all a');
    click('.filter.tasks');
  });

  andThen(() => {
    assert.equal(find('.project-post-list .post-item').length, 6, 'only task posts are rendered');
    click('.posts-filters .all a');
    click('.filter.issues');
  });

  andThen(() => {
    assert.equal(find('.project-post-list .post-item').length, 3, 'only issues are rendered');
  });
});

test('Post paging links are correct', (assert) =>  {
  assert.expect(10);

  let project = createProject();

  // we use server.createList so factories are used in creation
  server.createList('post', 20, { postType: 'idea', projectId: project.id });
  server.createList('post', 20, { postType: 'task', projectId: project.id });

  let postsURL = `/${project.organization.slug}/${project.slug}/posts`;

  visit(`${postsURL}?page=2`);

  andThen(() => {
    assert.equal(find('.previous-page').attr('href'), `${postsURL}`, 'Previous page link links to page 1');
    assert.equal(find('.next-page').attr('href'), `${postsURL}?page=3`, 'Link to next page links to page 3');
    assert.equal(find('.page.1').attr('href'), `${postsURL}`, 'Link to page 1 is correct');
    assert.equal(find('.page.2').attr('href'), `${postsURL}?page=2`, 'Link to page 2 is correct');
    assert.equal(find('.page.3').attr('href'), `${postsURL}?page=3`, 'Link to page 3 is correct');
    assert.equal(find('.page.4').attr('href'), `${postsURL}?page=4`, 'Link to page 4 is correct');
    click('.filter.ideas');
  });

  andThen(() => {
    assert.equal(find('.next-page').attr('href'), `${postsURL}?page=2&postType=idea`, 'Next page link maintains type filter');
    assert.equal(find('.page.1').attr('href'), `${postsURL}?postType=idea`, 'Link to page 1 maintains type filter');
    assert.equal(find('.page.2').attr('href'), `${postsURL}?page=2&postType=idea`, 'Link to page 2 maintains type filter');
    click('.page.2');
  });

  andThen(() => {
    assert.equal(find('.previous-page').attr('href'), `${postsURL}?postType=idea`, 'Previous page link maintains type filter');
  });
});

test('Paging of posts works', (assert) => {
  assert.expect(3);

  let project = createProject();

  server.createList('post', 12, { projectId: project.id });

  let postsURL = `/${project.organization.slug}/${project.slug}/posts`;
  visit(postsURL);

  andThen(() => {
    assert.equal(find('.pager-control').length, 1, 'pager is rendered');
    assert.equal(find('.post-item').length, 10, 'first page of 10 records is rendered');
    click('.pager-control .page.2');
  });

  andThen(() => {
    assert.equal(find('.post-item').length, 2, 'second page of 2 records is rendered');
  });
});

test('Paging and filtering of posts combined works', (assert) => {
  assert.expect(9);

  let project = createProject();

  server.createList('post', 12, { postType: 'task', projectId: project.id });
  server.createList('post', 12, { postType: 'issue', projectId: project.id });

  let postsURL = `/${project.organization.slug}/${project.slug}/posts`;
  visit(postsURL);

  andThen(() => {
    assert.equal(find('.post-item').length, 10, 'first page of 10 posts is rendered');
    click('.pager-control .page.2');
  });

  andThen(() => {
    assert.equal(find('.post-item').length, 10, 'second page of 10 posts is rendered');
    click('.pager-control .page.3');
  });

  andThen(() => {
    assert.equal(find('.post-item').length, 4, 'third page of 4 posts is rendered');
    click('.filter.tasks');
  });

  andThen(() => {
    assert.equal(find('.post-item.task').length, 10, 'first page of 10 tasks is rendered');
    click('.pager-control .page.2');
  });

  andThen(() => {
    assert.equal(find('.post-item.task').length, 2, 'second page of 2 tasks is rendered');
    assert.equal(find('.post-item').length, 2, 'there are no other posts rendered');
    click('.posts-filters .all a');
    click('.filter.issues');
  });

  andThen(() => {
    assert.equal(find('.post-item.issue').length, 10, 'first page of 10 issues is rendered');
    click('.pager-control .page.2');
  });

  andThen(() => {
    assert.equal(find('.post-item.issue').length, 2, 'second page of 2 issues is rendered');
    assert.equal(find('.post-item').length, 2, 'there are no other posts rendered');
  });
});

test('Paging and filtering uses query parameters', (assert) => {
  assert.expect(6);

  let project = createProject();

  server.createList('post', 22, { postType: 'task', projectId: project.id });
  server.createList('post', 12, { postType: 'issue', projectId: project.id });

  let postsURL = `/${project.organization.slug}/${project.slug}/posts`;
  visit(postsURL);

  visit(postsURL);

  andThen(() => {
    assert.equal(currentURL(), `${postsURL}`);
    click('.pager-control .page.2');
  });

  andThen(() => {
    assert.equal(currentURL(), `${postsURL}?page=2`, 'Page query param should update');
    click('.filter.tasks');
  });

  andThen(() => {
    assert.equal(currentURL(), `${postsURL}?postType=task`, 'We switched type, so page param should reset as well');
    click('.pager-control .page.3');
  });

  andThen(() => {
    assert.equal(currentURL(), `${postsURL}?page=3&postType=task`, 'We switched page again, so it should update, while keeping type');
    click('.posts-filters .all a');
  });

  andThen(() => {
    assert.equal(currentURL(), `${postsURL}`, 'We reset type to none, so it should be gone from the URL. Page should reset as well');
  });

  visit(`${postsURL}?page=3&postType=task`);

  andThen(() => {
    assert.equal(find('.project-post-list .post-item').length, 2, 'Visiting URL via params directly, should fetch the correct posts');
  });
});

test('A user can join the organization of the project', (assert) => {
  assert.expect(5);

  let project = createProject();
  let projectURL = `/${project.organization.slug}/${project.slug}/`;
  let user = server.create('user');

  visit(projectURL);

  andThen(() => {
    assert.equal(find('.join-project button').text().trim(), 'Sign up', 'The link to sign up is present when logged out');

    authenticateSession(application, { user_id: user.id });
    visit(projectURL);
  });


  andThen(() => {
    assert.equal(find('.join-project button').text().trim(), 'Join project', 'The link to sign up is present when logged out');
    click('.join-project button');
  });

  let done = assert.async();

  server.post('/organization_memberships', (db, request) => {
    let attributes = JSON.parse(request.requestBody).data.attributes;
    let relationships = JSON.parse(request.requestBody).data.relationships;
    assert.equal(attributes.role, 'pending');
    assert.equal(relationships.member.data.id, user.id);
    assert.equal(relationships.organization.data.id, project.organization.id);
    done();

    return {
      data: {
        id: 1,
        type: "organization_memberships",
        attributes: attributes,
        relationships: relationships
      }
    };
  });
});
