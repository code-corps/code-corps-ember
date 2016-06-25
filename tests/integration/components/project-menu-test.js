import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import { Ability } from 'ember-can';

moduleForComponent('project-menu', 'Integration | Component | project menu', {
  integration: true,
  beforeEach() {
    this.register('service:credentials', Ember.Service.extend({}));
  }
});

test('when not authenticated, it renders properly', function(assert) {
  assert.expect(5);

  this.register('service:session', Ember.Service.extend({ isAuthenticated: false }));

  this.render(hbs`{{project-menu}}`);

  assert.equal(this.$('.project-menu li a').length, 2, 'The correct number of links render');
  assert.equal(this.$('.project-menu li a:contains("About")').length, 1, 'The about link is rendered');
  assert.equal(this.$('.project-menu li a:contains("Posts")').length, 1, 'The posts link is rendered');
  assert.equal(this.$('.project-menu li a:contains("Contributors")').length, 0, 'The contributors link is not rendered');
  assert.equal(this.$('.project-menu li a:contains("Settings")').length, 0, 'The settings link is not rendered');

});

test('it renders the post count when it has posts', function(assert) {
  assert.expect(1);

  this.register('service:session', Ember.Service.extend({ isAuthenticated: false }));
  this.set('project', {
    hasOpenPosts: true,
    openPostsCount: 7
  });

  this.render(hbs`{{project-menu project=project}}`);

  assert.equal(this.$('.project-menu li a span.info').text().trim(), '7', 'The number of open posts are rendered');
});

test('it does not render the post count when it has no posts', function(assert) {
  assert.expect(1);

  this.register('service:session', Ember.Service.extend({ isAuthenticated: false }));
  this.set('project', {
    hasOpenPosts: false,
    openPostsCount: 0
  });

  this.render(hbs`{{project-menu project=project}}`);

  assert.equal(this.$('.project-menu li a span.info').length, 0, 'The number of open posts are not rendered');
});

test('when authenticated, and user cannot manage organization, it renders properly', function(assert) {
  assert.expect(5);

  this.register('service:session', Ember.Service.extend({ isAuthenticated: true }));
  this.register('ability:organization', Ability.extend({ canManage: false }));

  this.render(hbs`{{project-menu}}`);

  assert.equal(this.$('.project-menu li a').length, 2, 'The correct number of links render');
  assert.equal(this.$('.project-menu li a:contains("About")').length, 1, 'The about link is rendered');
  assert.equal(this.$('.project-menu li a:contains("Posts")').length, 1, 'The posts link is rendered');
  assert.equal(this.$('.project-menu li a:contains("Contributors")').length, 0, 'The contributors link is not rendered');
  assert.equal(this.$('.project-menu li a:contains("Settings")').length, 0, 'The settings link is not rendered');
});

test('when authenticated, and user can manage organization, it renders properly', function(assert) {
  assert.expect(5);

  this.register('service:session', Ember.Service.extend({ isAuthenticated: true }));
  this.register('ability:organization', Ability.extend({ canManage: true }));

  this.render(hbs`{{project-menu}}`);

  assert.equal(this.$('.project-menu li a').length, 4, 'The correct number of links render');
  assert.equal(this.$('.project-menu li a:contains("About")').length, 1, 'The about link is rendered');
  assert.equal(this.$('.project-menu li a:contains("Posts")').length, 1, 'The posts link is rendered');
  assert.equal(this.$('.project-menu li a:contains("Contributors")').length, 1, 'The contributors link is rendered');
  assert.equal(this.$('.project-menu li a:contains("Settings")').length, 1, 'The settings link is rendered');
});

test('when authenticated, and user can manage organization, and project has pending members', function(assert) {
  assert.expect(1);

  this.register('service:session', Ember.Service.extend({ isAuthenticated: true }));
  this.register('ability:organization', Ability.extend({ canManage: true }));
  let project = { hasPendingMembers: true, pendingMembersCount: 7 };
  this.set('project', project);

  this.render(hbs`{{project-menu project=project}}`);

  assert.equal(this.$('.project-menu li.contributors a span.info').text().trim(), '7 pending', 'The correct number of pending members render');
});

test('when authenticated, and user can manage organization, and project has no pending members', function(assert) {
  assert.expect(1);

  this.register('service:session', Ember.Service.extend({ isAuthenticated: true }));
  this.register('ability:organization', Ability.extend({ canManage: true }));
  let project = { hasPendingMembers: false, pendingMembersCount: 0 };
  this.set('project', project);

  this.render(hbs`{{project-menu project=project}}`);

  assert.equal(this.$('.project-menu li.contributors a span.info').length, 0, 'The pending members span tag does not render');
});
