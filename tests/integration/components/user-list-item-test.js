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

  page.render(hbs`{{user-list-item user=user}}`);

  assert.equal(page.icon.url, user.photoThumbUrl);
  assert.equal(page.name.name.text, user.name);
  assert.notOk(page.approveButton.isVisible);
  assert.notOk(page.denyButton.isVisible);
});

test('it renders the username in the name if name is empty', function(assert) {
  assert.expect(1);

  set(user, 'name', '');
  set(this, 'user', user);

  page.render(hbs`{{user-list-item user=user}}`);

  assert.equal(page.name.name.text, get(user, 'username'));
});

test('it renders the buttons when pending', function(assert) {
  assert.expect(2);

  set(this, 'projectUser', mockProjectUser('pending')); // pending
  set(this, 'user', user);

  page.render(hbs`{{user-list-item projectUser=projectUser user=user}}`);

  assert.equal(page.approveButton.text, 'Approve');
  assert.equal(page.denyButton.text, 'Deny');
});

test('it does not render the buttons when not pending', function(assert) {
  assert.expect(2);

  set(this, 'projectUser', mockProjectUser('contributor'));
  set(this, 'user', user);

  page.render(hbs`{{user-list-item projectUser=projectUser user=user}}`);

  assert.notOk(page.approveButton.isVisible);
  assert.notOk(page.denyButton.isVisible);
});

test('it sends the approve action when clicking approve', function(assert) {
  assert.expect(4);

  let projectUser = {
    role: 'pending',
    save() {
      assert.ok(true, 'Action was called');
      return RSVP.resolve();
    }
  };

  set(this, 'projectUser', projectUser);
  set(this, 'user', user);

  page.render(hbs`{{user-list-item projectUser=projectUser user=user}}`);

  page.approveButton.click();
  page.modal.confirmButton.click();

  assert.equal(getFlashMessageCount(this), 1, 'One flash message is rendered');

  let flash = getFlashMessageAt(0, this);
  let actualOptions = flash.getProperties('fixed', 'sticky', 'timeout', 'type');
  let expectedOptions = { fixed: true, sticky: false, timeout: 5000, type: 'success' };
  assert.deepEqual(actualOptions, expectedOptions, 'Proper message was set');
  assert.ok(flash.message.indexOf('Membership approved') !== -1, 'Message includes proper text');
});

test('it sends the deny action when clicking deny', function(assert) {

  let modalDialogService = this.container.lookup('service:modal-dialog');
  modalDialogService.destinationElementId = 'modal-container';

  assert.expect(4);

  let projectUser = {
    role: 'pending',
    destroyRecord() {
      assert.ok(true, 'Action was called.');
      return RSVP.resolve();
    }
  };

  set(this, 'projectUser', projectUser);
  set(this, 'user', user);

  page.render(hbs`<div id='modal-container'></div>{{user-list-item projectUser=projectUser user=user}}`);
  page.denyButton.click();
  page.modal.confirmButton.click();

  assert.equal(getFlashMessageCount(this), 1, 'One flash message is rendered');

  let flash = getFlashMessageAt(0, this);
  let actualOptions = flash.getProperties('fixed', 'sticky', 'timeout', 'type');
  let expectedOptions = { fixed: true, sticky: false, timeout: 5000, type: 'success' };
  assert.deepEqual(actualOptions, expectedOptions, 'Proper message was set');
  assert.ok(flash.message.indexOf('Membership denied') !== -1, 'Message includes proper text');
});
