import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { Ability } from 'ember-can';
import stubService from 'code-corps-ember/tests/helpers/stub-service';

moduleForComponent('project-menu', 'Integration | Component | project menu', {
  integration: true,
  beforeEach() {
    stubService(this, 'credentials');
  }
});

test('when not authenticated, it renders properly', function(assert) {
  assert.expect(5);

  stubService(this, 'session', { isAuthenticated: false });

  this.render(hbs`{{project-menu}}`);

  assert.equal(this.$('.project-menu li a').length, 2, 'The correct number of links render');
  assert.equal(this.$('.project-menu li a:contains("About")').length, 1, 'The about link is rendered');
  assert.equal(this.$('.project-menu li a:contains("Tasks")').length, 1, 'The tasks link is rendered');
  assert.equal(this.$('.project-menu li a:contains("Contributors")').length, 0, 'The contributors link is not rendered');
  assert.equal(this.$('.project-menu li a:contains("Settings")').length, 0, 'The settings link is not rendered');

});

test('it renders the task count when it has tasks', function(assert) {
  assert.expect(1);

  stubService(this, 'session', { isAuthenticated: false });
  this.set('project', {
    hasOpenTasks: true,
    openTasksCount: 7
  });

  this.render(hbs`{{project-menu project=project}}`);

  assert.equal(this.$('.project-menu li a span.info').text().trim(), '7', 'The number of open tasks are rendered');
});

test('it does not render the task count when it has no tasks', function(assert) {
  assert.expect(1);

  stubService(this, 'session', { isAuthenticated: false });
  this.set('project', {
    hasOpenTasks: false,
    openTasksCount: 0
  });

  this.render(hbs`{{project-menu project=project}}`);

  assert.equal(this.$('.project-menu li a span.info').length, 0, 'The number of open tasks are not rendered');
});

test('when authenticated, and user cannot manage organization, it renders properly', function(assert) {
  assert.expect(5);

  stubService(this, 'session', { isAuthenticated: true });
  this.register('ability:organization', Ability.extend({ canManage: false }));

  this.render(hbs`{{project-menu}}`);

  assert.equal(this.$('.project-menu li a').length, 2, 'The correct number of links render');
  assert.equal(this.$('.project-menu li a:contains("About")').length, 1, 'The about link is rendered');
  assert.equal(this.$('.project-menu li a:contains("Tasks")').length, 1, 'The tasks link is rendered');
  assert.equal(this.$('.project-menu li a:contains("Contributors")').length, 0, 'The contributors link is not rendered');
  assert.equal(this.$('.project-menu li a:contains("Settings")').length, 0, 'The settings link is not rendered');
});

test('when authenticated, and user can manage organization, it renders properly', function(assert) {
  assert.expect(6);

  stubService(this, 'session', { isAuthenticated: true });
  this.register('ability:organization', Ability.extend({ canManage: true }));

  this.render(hbs`{{project-menu}}`);

  assert.equal(this.$('.project-menu li a').length, 5, 'The correct number of links render');
  assert.equal(this.$('.project-menu li a:contains("About")').length, 1, 'The about link is rendered');
  assert.equal(this.$('.project-menu li a:contains("Tasks")').length, 1, 'The tasks link is rendered');
  assert.equal(this.$('.project-menu li a:contains("Contributors")').length, 1, 'The contributors link is rendered');
  assert.equal(this.$('.project-menu li a:contains("Settings")').length, 1, 'The settings link is rendered');
  assert.equal(this.$('.project-menu li a:contains("Donations")').length, 1, 'The donations link is rendered');
});

test('when authenticated, and user can manage organization, and project has pending members', function(assert) {
  assert.expect(1);

  stubService(this, 'session', { isAuthenticated: true });
  this.register('ability:organization', Ability.extend({ canManage: true }));
  let project = { hasPendingMembers: true, pendingMembersCount: 7 };
  this.set('project', project);

  this.render(hbs`{{project-menu project=project}}`);

  assert.equal(this.$('.project-menu li.contributors a span.info').text().trim(), '7 pending', 'The correct number of pending members render');
});

test('when authenticated, and user can manage organization, and project has no pending members', function(assert) {
  assert.expect(1);

  stubService(this, 'session', { isAuthenticated: true });
  this.register('ability:organization', Ability.extend({ canManage: true }));
  let project = { hasPendingMembers: false, pendingMembersCount: 0 };
  this.set('project', project);

  this.render(hbs`{{project-menu project=project}}`);

  assert.equal(this.$('.project-menu li.contributors a span.info').length, 0, 'The pending members span tag does not render');
});
