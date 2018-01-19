import { getOwner } from '@ember/application';
import RSVP from 'rsvp';
import { set, get } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  getFlashMessageCount,
  getFlashMessageAt
} from 'code-corps-ember/tests/helpers/flash-message';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/user-list-item';
import sinon from 'sinon';

let user = {
  name: 'Josh Smith',
  username: 'joshsmith',
  photoThumbUrl: 'http://lorempixel.com/image_output/people-q-c-50-50-4.jpg'
};

function mockProjectUser(role) {
  return {
    role,
    destroyRecord: RSVP.resolve,
    save: RSVP.resolve
  };
}

let page = PageObject.create(component);

function renderPage() {
  page.render(hbs`
    {{user-list-item
      projectUser=projectUser
      user=user
    }}
  `);
}

moduleForComponent('user-list-item', 'Integration | Component | user list item', {
  integration: true,
  beforeEach() {
    getOwner(this).lookup('service:flash-messages').registerTypes(['success']);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders the basic information for the user', function(assert) {
  assert.expect(4);

  set(this, 'user', user);

  renderPage();

  assert.equal(page.icon.url, user.photoThumbUrl);
  assert.equal(page.name.name.text, user.name);
  assert.notOk(page.approveButton.isVisible);
  assert.notOk(page.denyButton.isVisible);
});

test('it renders the username in the name if name is empty', function(assert) {
  assert.expect(1);

  set(user, 'name', '');
  set(this, 'user', user);

  renderPage();

  assert.equal(page.name.name.text, get(user, 'username'));
});

test('it renders the correct buttons when pending', function(assert) {
  assert.expect(4);

  set(this, 'projectUser', mockProjectUser('pending')); // pending
  set(this, 'user', user);

  renderPage();

  assert.ok(page.approveButton.isVisible, 'Approve button renders');
  assert.ok(page.denyButton.isVisible, 'Deny button renders');
  assert.ok(page.newConversationModal.openButton.isVisible, 'Message button renders');
  assert.notOk(page.projectUserRoleModal.openButton.isVisible, 'Edit role button does not render');
});

test('it renders the correct buttons when not pending', function(assert) {
  assert.expect(4);

  set(this, 'projectUser', mockProjectUser('contributor'));
  set(this, 'user', user);

  renderPage();

  assert.notOk(page.approveButton.isVisible, 'Approve button does not render');
  assert.notOk(page.denyButton.isVisible, 'Deny button does not render');
  assert.ok(page.newConversationModal.openButton.isVisible, 'Message button renders');
  assert.ok(page.projectUserRoleModal.openButton.isVisible, 'Edit role button renders');
});

test('it sends the approve action when clicking approve', function(assert) {
  assert.expect(5);

  let projectUser = {
    role: 'pending',
    save() {
      assert.ok(true, 'Action was called');
      return RSVP.resolve();
    }
  };

  set(this, 'projectUser', projectUser);
  set(this, 'user', user);

  renderPage();

  let stub = sinon.stub(window, 'confirm').callsFake(() => {
    assert.ok(true, 'Confirmation prompt was called.');
    return true;
  });

  page.approveButton.click();

  assert.equal(getFlashMessageCount(this), 1, 'One flash message is rendered');

  let flash = getFlashMessageAt(0, this);
  let actualOptions = flash.getProperties('fixed', 'sticky', 'timeout', 'type');
  let expectedOptions = { fixed: true, sticky: false, timeout: 5000, type: 'success' };
  assert.deepEqual(actualOptions, expectedOptions, 'Proper message was set');
  assert.ok(flash.message.indexOf('Membership approved') !== -1, 'Message includes proper text');

  stub.restore();
});

test('it sends the deny action when clicking deny', function(assert) {
  assert.expect(5);

  let projectUser = {
    role: 'pending',
    destroyRecord() {
      assert.ok(true, 'Action was called.');
      return RSVP.resolve();
    }
  };

  set(this, 'projectUser', projectUser);
  set(this, 'user', user);

  renderPage();

  let stub = sinon.stub(window, 'confirm').callsFake(() => {
    assert.ok(true, 'Confirmation prompt was called.');
    return true;
  });

  page.denyButton.click();

  assert.equal(getFlashMessageCount(this), 1, 'One flash message is rendered');

  let flash = getFlashMessageAt(0, this);
  let actualOptions = flash.getProperties('fixed', 'sticky', 'timeout', 'type');
  let expectedOptions = { fixed: true, sticky: false, timeout: 5000, type: 'success' };
  assert.deepEqual(actualOptions, expectedOptions, 'Proper message was set');
  assert.ok(flash.message.indexOf('Membership denied') !== -1, 'Message includes proper text');

  stub.restore();
});

test('it changes the role when editing', function(assert) {
  assert.expect(3);

  let projectUser = mockProjectUser('contributor');

  set(this, 'projectUser', projectUser);
  set(this, 'user', user);

  renderPage();

  page.projectUserRoleModal.openButton.click();
  page.projectUserRoleModal.modal.radioGroupAdmin.radioButton.click();
  page.projectUserRoleModal.modal.save();

  assert.equal(getFlashMessageCount(this), 1, 'One flash message is rendered');

  let flash = getFlashMessageAt(0, this);
  let actualOptions = flash.getProperties('fixed', 'sticky', 'timeout', 'type');
  let expectedOptions = { fixed: true, sticky: false, timeout: 5000, type: 'success' };
  assert.deepEqual(actualOptions, expectedOptions, 'Proper message was set');
  assert.ok(flash.message.indexOf('changed to admin') !== -1, 'Message includes proper text');
});
