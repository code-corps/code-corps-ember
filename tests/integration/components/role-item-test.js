import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import wait from 'ember-test-helpers/wait';

moduleForComponent('role-item', 'Integration | Component | role item', {
  integration: true,
  beforeEach() {
    mockUserRole.set('roleId', defaultRoleId);
  }
});

let defaultRoleId = 2;

let mockUserRolesService = Ember.Service.extend({
  findUserRole(role) {
    if (role.id === mockUserRole.get('roleId')) {
      return mockUserRole;
    }
  },
  addRole(role) {
    return new Ember.RSVP.Promise((fulfill) => {
      Ember.run.next(() => {
        mockUserRole.set('roleId', role.get('id'));
        this.container.lookup('service:user-roles').set('userRoles', [mockUserRole]);
        fulfill();
      });
    });
  },
  removeRole() {
    return new Ember.RSVP.Promise((fulfill, reject) => {
      Ember.run.next(() => {
        mockUserRole.set('roleId', null);
        this.container.lookup('service:user-roles').set('userRoles', []);
        reject();
      });
    });
  },
});

let mockUserRolesServiceForErrors = Ember.Service.extend({
  findUserRole(role) {
    if (role.id === mockUserRole.get('roleId')) {
      return mockUserRole;
    }
  },
  addRole() {
    return Ember.RSVP.reject();
  },
  removeRole() {
    return Ember.RSVP.reject();
  },
});

let mockUserRole = Ember.Object.create({
  id: 1,
  roleId: defaultRoleId,
  userId: 1,
});

let unselectedRole = Ember.Object.create({
  id: 1,
  name: 'Backend Developer',
  ability: 'Backend Development',
  kind: 'technology',
});

let selectedRole = Ember.Object.create({
  id: 2,
  name: 'Mobile Developer',
  ability: 'Mobile Development',
  kind: 'technology',
});

test('it works for selecting unselected roles', function(assert) {
  let done = assert.async();
  assert.expect(3);

  this.register('service:user-roles', mockUserRolesService);
  this.set('role', unselectedRole);
  this.render(hbs`{{role-item role=role}}`);

  assert.equal(this.$('.role-item').hasClass('selected'), false);
  assert.equal(this.$('button').text().trim(), 'Backend Development');

  this.$('button').click();

  wait().then(() => {
    assert.equal(this.$('.role-item').hasClass('selected'), true);
    done();
  });
});

test('it works for removing selected roles', function(assert) {
  let done = assert.async();
  assert.expect(3);

  this.register('service:user-roles', mockUserRolesService);
  this.set('role', selectedRole);
  this.render(hbs`{{role-item role=role}}`);

  assert.equal(this.$('.role-item').hasClass('selected'), true);
  assert.equal(this.$('button').text().trim(), 'Mobile Development');

  this.$('button').click();

  wait().then(() => {
    assert.equal(this.$('.role-item').hasClass('selected'), false);
    done();
  });
});

test('it creates a flash message on an error when adding', function(assert) {
  let done = assert.async();
  assert.expect(7);

  this.register('service:user-roles', mockUserRolesServiceForErrors);
  this.set('role', unselectedRole);

  let mockFlashMessages = Ember.Service.extend({
    clearMessages() {
      assert.ok(true);
    },
    add(object) {
      assert.ok(object.message.indexOf(unselectedRole.name) !== -1);
      assert.equal(object.type, 'danger');
      assert.equal(object.fixed, true);
      assert.equal(object.sticky, false);
      assert.equal(object.timeout, 5000);
    }
  });
  this.register('service:flash-messages', mockFlashMessages);

  this.render(hbs`{{role-item role=role}}`);

  this.$('button').click();
  wait().then(() => {
    assert.notOk(this.$('span').hasClass('button-spinner'));
    done();
  });
});

test('it creates a flash message on an error when removing', function(assert) {
  let done = assert.async();
  assert.expect(7);

  this.register('service:user-roles', mockUserRolesServiceForErrors);
  this.set('role', selectedRole);

  let mockFlashMessages = Ember.Service.extend({
    clearMessages() {
      assert.ok(true);
    },
    add(object) {
      assert.ok(object.message.indexOf(selectedRole.name) !== -1);
      assert.equal(object.type, 'danger');
      assert.equal(object.fixed, true);
      assert.equal(object.sticky, false);
      assert.equal(object.timeout, 5000);
    }
  });
  this.register('service:flash-messages', mockFlashMessages);

  this.render(hbs`{{role-item role=role}}`);

  this.$('button').click();
  wait().then(() => {
    assert.notOk(this.$('span').hasClass('button-spinner'));
    done();
  });
});

test('it sets and unsets loading state when adding', function(assert) {
  let done = assert.async();
  assert.expect(3);

  this.register('service:user-roles', mockUserRolesService);
  this.set('role', unselectedRole);

  this.render(hbs`{{role-item role=role}}`);

  this.$('button').click();
  assert.ok(this.$('span').hasClass('button-spinner'));
  assert.notOk(this.$('span').hasClass('check-area'));

  wait().then(() => {
    assert.notOk(this.$('span').hasClass('button-spinner'));
    done();
  });
});

test('it sets and unsets loading state when removing', function(assert) {
  let done = assert.async();
  this.register('service:user-roles', mockUserRolesService);
  assert.expect(3);

  this.set('role', selectedRole);

  this.render(hbs`{{role-item role=role}}`);

  this.$('button').click();
  assert.ok(this.$('span').hasClass('button-spinner'));
  assert.notOk(this.$('span').hasClass('check-area'));

  wait().then(() => {
    assert.notOk(this.$('span').hasClass('button-spinner'));
    done();
  });
});
