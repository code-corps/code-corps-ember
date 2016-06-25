import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('organization-settings', 'Integration | Component | organization settings', {
  integration: true
});


test('it renders properly', function(assert) {
  assert.expect(3);

  this.register('service:store', Ember.Service.extend({}));
  this.register('service:session', Ember.Service.extend({}));
  this.register('service:credentials', Ember.Service.extend({}));

  this.render(hbs`{{organization-settings}}`);

  assert.equal(this.$('.organization-header').length, 1, 'The header renders');
  assert.equal(this.$('.organization-menu').length, 1, 'The menu renders');
  assert.equal(this.$('.organization-settings-menu').length, 1, 'The settings menu renders');
});
