import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('project-settings-menu', 'Integration | Component | project settings menu', {
  integration: true
});

let organization = Ember.Object.create({ id: 1 });
let project = Ember.Object.create({ organization: organization });

test('when authenticated and can manage organization, it renders properly', function(assert) {
  assert.expect(4);

  let membership = Ember.Object.create({ isAdmin: true, organization: organization });
  let mockSession = Ember.Service.extend({ isAuthenticated: true });
  let mockCredentials = Ember.Service.extend({ currentUserMembership: membership });

  this.register('service:session', mockSession);
  this.register('service:credentials', mockCredentials);

  this.set('project', project);

  this.render(hbs`{{project-settings-menu project=project}}`);

  assert.equal(this.$('.project-settings-menu').length, 1, 'The component itself renders');
  assert.equal(this.$('.project-settings-menu li').length, 2, 'The list items render');
  assert.equal(this.$('li a:contains("Basic settings")').length, 1, 'The basic settings link renders');
  assert.equal(this.$('li a:contains("Contributors")').length, 1, 'The contributors link renders');
});

test('when authenticated and cannot manage organization, it renders properly', function(assert) {
  assert.expect(2);

  let membership = Ember.Object.create({ isAdmin: false, organization: organization });
  let mockSession = Ember.Service.extend({ isAuthenticated: true });
  let mockCredentials = Ember.Service.extend({ currentUserMembership: membership });

  this.register('service:session', mockSession);
  this.register('service:credentials', mockCredentials);

  this.set('project', project);

  this.render(hbs`{{project-settings-menu project=project}}`);

  assert.equal(this.$('.project-settings-menu').length, 1, 'The component itself renders');
  assert.equal(this.$('.project-settings-menu li').length, 0, 'The list items do not render');
});

test('when not authenticated, it renders properly', function(assert) {
  assert.expect(2);

  let mockSession = Ember.Service.extend({ isAuthenticated: false });

  this.register('service:session', mockSession);

  this.set('project', project);

  this.render(hbs`{{project-settings-menu project=project}}`);

  assert.equal(this.$('.project-settings-menu').length, 1, 'The component itself renders');
  assert.equal(this.$('.project-settings-menu li').length, 0, 'The list items do not render');
});
