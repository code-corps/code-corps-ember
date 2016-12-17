import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import stubService from 'code-corps-ember/tests/helpers/stub-service';

const { Object } = Ember;

moduleForComponent('project-settings-menu', 'Integration | Component | project settings menu', {
  integration: true
});

let organization = Object.create({ id: 1 });
let project = Object.create({ organization });

test('when authenticated and can manage organization, it renders properly', function(assert) {
  assert.expect(6);

  let membership = Object.create({ isAdmin: true, organization });
  stubService(this, 'session', { isAuthenticated: true });
  stubService(this, 'credentials', { membership });

  this.set('project', project);

  this.render(hbs`{{project-settings-menu project=project}}`);

  assert.equal(this.$('.project-settings-menu').length, 1, 'The component itself renders');
  assert.equal(this.$('.project-settings-menu li').length, 4, 'The list items render');
  assert.equal(this.$('li a:contains("Contributors")').length, 1, 'The contributors link renders');
  assert.equal(this.$('li a:contains("Donation goals")').length, 1, 'The donation goals link renders');
  assert.equal(this.$('li a:contains("Payment settings")').length, 1, 'The payment settings link renders');
  assert.equal(this.$('li a:contains("Basic settings")').length, 1, 'The basic settings link renders');
});

test('when authenticated and cannot manage organization, it renders properly', function(assert) {
  assert.expect(2);

  let membership = Object.create({ isAdmin: false, organization });
  stubService(this, 'session', { isAuthenticated: true });
  stubService(this, 'credentials', { membership });

  this.set('project', project);

  this.render(hbs`{{project-settings-menu project=project}}`);

  assert.equal(this.$('.project-settings-menu').length, 1, 'The component itself renders');
  assert.equal(this.$('.project-settings-menu li').length, 0, 'The list items do not render');
});

test('when not authenticated, it renders properly', function(assert) {
  assert.expect(2);

  stubService(this, 'session', { isAuthenticated: false });

  this.set('project', project);

  this.render(hbs`{{project-settings-menu project=project}}`);

  assert.equal(this.$('.project-settings-menu').length, 1, 'The component itself renders');
  assert.equal(this.$('.project-settings-menu li').length, 0, 'The list items do not render');
});
