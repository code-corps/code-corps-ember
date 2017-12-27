import { getOwner } from '@ember/application';
import RSVP from 'rsvp';
import { run } from '@ember/runloop';
import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  getFlashMessageCount,
  getFlashMessageAt
} from 'code-corps-ember/tests/helpers/flash-message';

import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/role-item';

const page = PageObject.create(component);
const template = hbs`{{role-item role=role userRoles=userRoles}}`;

function renderPage() {
  page.render(template);
}

let mockUserRolesService = {
  findUserRole: () => null,
  addRole: (role) => RSVP.resolve(role),
  removeRole: () => RSVP.resolve()
};

let mockUserRolesServiceForErrors = {
  findUserRole: () => null,
  addRole: () => RSVP.reject(),
  removeRole: () => RSVP.reject()
};

let mobileDeveloper = {
  id: 'foo',
  name: 'Mobile Developer',
  ability: 'Mobile Development',
  kind: 'technology'
};

moduleForComponent('role-item', 'Integration | Component | role item', {
  integration: true,
  beforeEach() {
    page.setContext(this);

    // component uses flash-messages service, so we need to register the types
    // used by the component
    getOwner(this).lookup('service:flash-messages').registerTypes(['danger']);

    // need to stub a default user role service
    set(this, 'userRoles', mockUserRolesService);
  }
});

test('it renders role content properly', function(assert) {
  assert.expect(1);

  set(this, 'role', mobileDeveloper);

  renderPage();

  assert.equal(page.button.text, mobileDeveloper.ability, 'Role ability is rendered on button.');
});

test('it renders role as selected if associated service returns a user role', function(assert) {
  assert.expect(1);

  let userRoles = {
    findUserRole:() => mobileDeveloper
  };

  set(this, 'userRoles', userRoles);

  renderPage();

  assert.ok(page.isSelected, 'Component is rendered as selected.');
});

test('it renders role as unselected if associated service returns no user role', function(assert) {
  assert.expect(1);

  let userRoles = {
    findUserRole: () => null
  };

  set(this, 'userRoles', userRoles);

  renderPage();

  assert.ok(page.isUnselected, 'Component is rendered as unselected.');
});

test('it calls proper action on service when clicking a selected role', function(assert) {
  assert.expect(1);

  let userRoles = {
    findUserRole: () => mobileDeveloper,
    removeRole(sentRole) {
      assert.deepEqual(mobileDeveloper, sentRole, 'Proper action was called with proper parameter.');
      return RSVP.resolve();
    }
  };

  set(this, 'userRoles', userRoles);
  set(this, 'role', mobileDeveloper);

  renderPage();

  page.button.click();
});

test('it calls proper action on service when clicking an unselected role', function(assert) {
  assert.expect(1);

  let userRoles = {
    findUserRole: () => null,
    addRole(sentRole) {
      assert.deepEqual(mobileDeveloper, sentRole, 'Proper action was called with proper parameter.');
      return RSVP.resolve();
    }
  };

  set(this, 'userRoles', userRoles);
  set(this, 'role', mobileDeveloper);

  renderPage();

  page.button.click();
});

test('it creates a flash message on an error when adding', function(assert) {
  assert.expect(3);

  set(this, 'userRoles', mockUserRolesServiceForErrors);
  set(this, 'role', mobileDeveloper);

  renderPage();

  page.button.click(),

  assert.equal(getFlashMessageCount(this), 1, 'One flash message is rendered');

  let flash = getFlashMessageAt(0, this);
  let actualOptions = flash.getProperties('fixed', 'sticky', 'timeout', 'type');
  let expectedOptions = { fixed: true, sticky: false, timeout: 5000, type: 'danger' };
  assert.deepEqual(actualOptions, expectedOptions, 'Proper message was set');
  assert.ok(flash.message.indexOf(mobileDeveloper.name) !== -1, 'Message text includes the role name');
});

test('it creates a flash message on an error when removing', function(assert) {
  assert.expect(3);

  set(this, 'userRoles', mockUserRolesServiceForErrors);
  set(this, 'role', mobileDeveloper);

  renderPage();

  page.button.click(),

  assert.equal(getFlashMessageCount(this), 1, 'One flash message is rendered');

  let flash = getFlashMessageAt(0, this);
  let actualOptions = flash.getProperties('fixed', 'sticky', 'timeout', 'type');
  let expectedOptions = { fixed: true, sticky: false, timeout: 5000, type: 'danger' };
  assert.deepEqual(actualOptions, expectedOptions, 'Proper message was set');
  assert.ok(flash.message.indexOf(mobileDeveloper.name) !== -1, 'Message text includes the role name');

});

test('it sets and unsets loading state when adding', async function(assert) {
  assert.expect(2);

  let userRoles = {
    findUserRole: () => null,
    addRole() {
      return new RSVP.Promise((fulfill) => {
        // we need to wait for a render loop to complete before resolving,
        // so the loading indicator has a change to render
        run.next(() => {
          assert.ok(page.icon.isLoading, 'Component is currently in the loading state.');
          fulfill();
        });
      });
    }
  };

  set(this, 'userRoles', userRoles);
  set(this, 'role', mobileDeveloper);

  renderPage();

  await page.button.click();

  assert.notOk(page.icon.isLoading, 'Component is no longer in the loading state.');
});

test('it sets and unsets loading state on error when adding', async function(assert) {
  assert.expect(2);

  let userRoles = {
    findUserRole: () => null,
    addRole() {
      return new RSVP.Promise((fulfill, reject) => {
        // we need to wait for a render loop to complete before resolving,
        // so the loading indicator has a change to render
        run.next(() => {
          assert.ok(page.icon.isLoading, 'Component is currently in the loading state.');
          reject();
        });
      });
    }
  };

  set(this, 'userRoles', userRoles);
  set(this, 'role', mobileDeveloper);

  renderPage();

  await page.button.click();

  assert.notOk(page.icon.isLoading, 'Component is no longer in the loading state.');
});

test('it sets and unsets loading state when removing', async function(assert) {
  assert.expect(2);

  let userRoles = {
    findUserRole: () => mobileDeveloper,
    removeRole() {
      return new RSVP.Promise((fulfill) => {
        // we need to wait for a render loop to complete before resolving,
        // so the loading indicator has a change to render
        run.next(() => {
          assert.ok(page.icon.isLoading, 'Component is currently in the loading state.');
          fulfill();
        });
      });
    }
  };

  set(this, 'userRoles', userRoles);
  set(this, 'role', mobileDeveloper);

  renderPage();

  await page.button.click();

  assert.notOk(page.icon.isLoading, 'Component is no longer in the loading state.');
});

test('it sets and unsets loading state on error when removing', async function(assert) {
  assert.expect(2);

  let userRoles = {
    findUserRole: () => mobileDeveloper,
    removeRole() {
      return new RSVP.Promise((fulfill, reject) => {
        // we need to wait for a render loop to complete before resolving,
        // so the loading indicator has a change to render
        run.next(() => {
          assert.ok(page.icon.isLoading, 'Component is currently in the loading state.');
          reject();
        });
      });
    }
  };

  set(this, 'userRoles', userRoles);
  set(this, 'role', mobileDeveloper);

  renderPage();

  await page.button.click();

  assert.notOk(page.icon.isLoading, 'Component is no longer in the loading state.');
});
