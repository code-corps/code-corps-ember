import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import wait from 'ember-test-helpers/wait';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import { getFlashMessageCount, getFlashMessageAt } from 'code-corps-ember/tests/helpers/flash-message';

const {
  getOwner,
  Object,
  RSVP,
  run
} = Ember;

let defaultRoleId = 2;

let mockUserRolesService = {
  findUserRole(role) {
    if (role.id === mockUserRole.get('roleId')) {
      return mockUserRole;
    }
  },
  addRole(role) {
    return new RSVP.Promise((fulfill) => {
      run.next(() => {
        mockUserRole.set('roleId', role.get('id'));
        getOwner(this).lookup('service:user-roles').set('userRoles', [mockUserRole]);
        fulfill();
      });
    });
  },
  removeRole() {
    return new RSVP.Promise((fulfill, reject) => {
      run.next(() => {
        mockUserRole.set('roleId', null);
        getOwner(this).lookup('service:user-roles').set('userRoles', []);
        reject();
      });
    });
  }
};

let mockUserRolesServiceForErrors = {
  findUserRole(role) {
    if (role.id === mockUserRole.get('roleId')) {
      return mockUserRole;
    }
  },
  addRole() {
    return RSVP.reject();
  },
  removeRole() {
    return RSVP.reject();
  }
};

let mockUserRole = Object.create({
  id: 1,
  roleId: defaultRoleId,
  userId: 1
});

let unselectedRole = Object.create({
  id: 1,
  name: 'Backend Developer',
  ability: 'Backend Development',
  kind: 'technology'
});

let selectedRole = Object.create({
  id: 2,
  name: 'Mobile Developer',
  ability: 'Mobile Development',
  kind: 'technology'
});

moduleForComponent('role-item', 'Integration | Component | role item', {
  integration: true,
  beforeEach() {
    mockUserRole.set('roleId', defaultRoleId);
    getOwner(this).lookup('service:flash-messages').registerTypes(['danger']);
  }
});

test('it works for selecting unselected roles', function(assert) {
  let done = assert.async();
  assert.expect(3);

  stubService(this, 'user-roles', mockUserRolesService);
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

  stubService(this, 'user-roles', mockUserRolesService);
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
  assert.expect(4);

  stubService(this, 'user-roles', mockUserRolesServiceForErrors);
  this.set('role', unselectedRole);

  this.render(hbs`{{role-item role=role}}`);

  this.$('button').click();
  wait().then(() => {
    assert.notOk(this.$('span').hasClass('button-spinner'));

    assert.equal(getFlashMessageCount(this), 1, 'One flash message is rendered');

    let flash = getFlashMessageAt(0, this);
    let actualOptions = flash.getProperties('fixed', 'sticky', 'timeout', 'type');
    let expectedOptions = { fixed: true, sticky: false, timeout: 5000, type: 'danger' };
    assert.deepEqual(actualOptions, expectedOptions, 'Proper message was set');
    assert.ok(flash.message.indexOf(unselectedRole.name) !== -1, 'Message text includes the role name');

    done();
  });
});

test('it creates a flash message on an error when removing', function(assert) {
  let done = assert.async();
  assert.expect(4);

  stubService(this, 'user-roles', mockUserRolesServiceForErrors);
  this.set('role', selectedRole);

  this.render(hbs`{{role-item role=role}}`);

  this.$('button').click();
  wait().then(() => {
    assert.notOk(this.$('span').hasClass('button-spinner'));

    assert.equal(getFlashMessageCount(this), 1, 'One flash message is rendered');

    let flash = getFlashMessageAt(0, this);
    let actualOptions = flash.getProperties('fixed', 'sticky', 'timeout', 'type');
    let expectedOptions = { fixed: true, sticky: false, timeout: 5000, type: 'danger' };
    assert.deepEqual(actualOptions, expectedOptions, 'Proper message was set');
    assert.ok(flash.message.indexOf(selectedRole.name) !== -1, 'Message text includes the role name');

    done();
  });
});

test('it sets and unsets loading state when adding', function(assert) {
  let done = assert.async();
  assert.expect(3);

  stubService(this, 'user-roles', mockUserRolesService);
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
  stubService(this, 'user-roles', mockUserRolesService);
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
