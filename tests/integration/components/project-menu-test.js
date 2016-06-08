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
  assert.expect(3);

  this.register('service:session', Ember.Service.extend({ isAuthenticated: false }));

  this.render(hbs`{{project-menu}}`);

  assert.equal(this.$('.project-menu li a:contains("About")').length, 1, 'The about link is rendered');
  assert.equal(this.$('.project-menu li a:contains("Posts")').length, 1, 'The posts link is rendered');
  assert.equal(this.$('.project-menu li a:contains("Settings")').length, 0, 'The settings link is not rendered');

});

test('when authenticated, and user cannot manage organization, it renders properly', function(assert) {
  assert.expect(3);

  this.register('service:session', Ember.Service.extend({ isAuthenticated: true }));
  this.register('ability:organization', Ability.extend({ canManage: false }));

  this.render(hbs`{{project-menu}}`);

  assert.equal(this.$('.project-menu li a:contains("About")').length, 1, 'The about link is rendered');
  assert.equal(this.$('.project-menu li a:contains("Posts")').length, 1, 'The posts link is rendered');
  assert.equal(this.$('.project-menu li a:contains("Settings")').length, 0, 'The settings link is not rendered');
});

test('when authenticated, and user can manage organization, it renders properly', function(assert) {
  assert.expect(3);

  this.register('service:session', Ember.Service.extend({ isAuthenticated: true }));
  this.register('ability:organization', Ability.extend({ canManage: true }));

  this.render(hbs`{{project-menu}}`);

  assert.equal(this.$('.project-menu li a:contains("About")').length, 1, 'The about link is rendered');
  assert.equal(this.$('.project-menu li a:contains("Posts")').length, 1, 'The posts link is rendered');
  assert.equal(this.$('.project-menu li a:contains("Settings")').length, 1, 'The settings link is rendered');
});
