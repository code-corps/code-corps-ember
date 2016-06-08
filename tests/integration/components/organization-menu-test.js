import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import { Ability } from 'ember-can';

moduleForComponent('organization-menu', 'Integration | Component | organization menu', {
  integration: true,
});

test('it renders', function(assert) {
  assert.expect(1);

  this.register('service:credentials', Ember.Service);

  this.render(hbs`{{organization-menu}}`);

  assert.equal(this .$('.organization-menu').length, 1, 'Component\'s element is rendered');
});

test('when user cannot manage organization the proper menu items are rendered', function(assert) {
  assert.expect(2);

  let mockCredentials = Ember.Service.extend({
    userCanManageOrganization: false
  });

  this.register('service:credentials', mockCredentials);
  this.register('ability:organization', Ability.extend({ canManage: false }));

  this.render(hbs`{{organization-menu}}`);

  assert.equal(this.$('.organization-menu li a:contains("Projects")').length, 1, 'The projects link is rendered');
  assert.equal(this.$('.organization-menu li a:contains("Settings")').length, 0, 'The settings link is not rendered');
});

test('when user can manage organization, the proper menu items are rendered', function(assert) {
  assert.expect(2);

  let mockCredentials = Ember.Service.extend({
    userCanManageOrganization: true
  });

  this.register('service:credentials', mockCredentials);
  this.register('ability:organization', Ability.extend({ canManage: true }));

  this.render(hbs`{{organization-menu}}`);

  assert.equal(this.$('.organization-menu li a:contains("Projects")').length, 1, 'The projects link is rendered');
  assert.equal(this.$('.organization-menu li a:contains("Settings")').length, 1, 'The settings link is rendered');
});
