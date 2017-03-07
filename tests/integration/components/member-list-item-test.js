import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import { getFlashMessageCount, getFlashMessageAt } from 'code-corps-ember/tests/helpers/flash-message';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/member-list-item';

const {
  get,
  getOwner,
  Object,
  RSVP,
  set
} = Ember;

let user = Object.create({
  name: 'Josh Smith',
  username: 'joshsmith',
  photoThumbUrl: 'http://lorempixel.com/image_output/people-q-c-50-50-4.jpg',
  userSkills: [
    { skill: { title: 'Ember.js' } },
    { skill: { title: 'Rails' } },
    { skill: { title: 'Ruby' } }
  ]
});

function mockMembership(role) {
  return Object.create({
    role,
    destroyRecord: RSVP.resolve,
    save: RSVP.resolve
  });
}

let page = PageObject.create(component);

moduleForComponent('member-list-item', 'Integration | Component | member list item', {
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
  set(this, 'user', user);

  page.render(hbs`{{member-list-item user=user}}`);

  assert.equal(page.icon.url, user.photoThumbUrl);
  assert.equal(page.name.name.text, user.name);
  assert.equal(page.name.username.text, user.username);
  assert.equal(page.skills(0).text, 'Ember.js');
  assert.equal(page.skills(1).text, 'Rails');
  assert.equal(page.skills(2).text, 'Ruby');
  assert.notOk(page.approveButton.isVisible);
  assert.notOk(page.denyButton.isVisible);
});

test('it renders the username in the name if name is empty', function(assert) {
  set(user, 'name', '');
  set(this, 'user', user);

  page.render(hbs`{{member-list-item user=user}}`);

  assert.equal(page.name.username.text, get(user, 'username'));
});

test('it renders the buttons when pending', function(assert) {
  assert.expect(2);

  set(this, 'membership', mockMembership('pending')); // pending
  set(this, 'user', user);

  page.render(hbs`{{member-list-item membership=membership user=user}}`);

  assert.equal(page.approveButton.text, 'Approve');
  assert.equal(page.denyButton.text, 'Deny');
});

test('it does not render the buttons when not pending', function(assert) {
  assert.expect(2);

  set(this, 'membership', mockMembership('contributor'));
  set(this, 'user', user);

  page.render(hbs`{{member-list-item membership=membership user=user}}`);

  assert.notOk(page.approveButton.isVisible);
  assert.notOk(page.denyButton.isVisible);
});

test('it sends the approve action when clicking approve', function(assert) {
  assert.expect(4);

  let membership = Object.create({
    role: 'pending',
    save() {
      assert.ok(true, 'Action was called');
      return RSVP.resolve();
    }
  });

  set(this, 'membership', membership);
  set(this, 'user', user);

  page.render(hbs`{{member-list-item membership=membership user=user}}`);

  page.approveButton.click();

  assert.equal(getFlashMessageCount(this), 1, 'One flash message is rendered');

  let flash = getFlashMessageAt(0, this);
  let actualOptions = flash.getProperties('fixed', 'sticky', 'timeout', 'type');
  let expectedOptions = { fixed: true, sticky: false, timeout: 5000, type: 'success' };
  assert.deepEqual(actualOptions, expectedOptions, 'Proper message was set');
  assert.ok(flash.message.indexOf('Membership approved') !== -1, 'Message includes proper text');
});

test('it sends the deny action when clicking deny', function(assert) {
  assert.expect(4);

  window.confirm = function() {
    return true;
  };

  let membership = Object.create({
    role: 'pending',
    destroyRecord() {
      assert.ok(true, 'Action was called.');
      return RSVP.resolve();
    }
  });

  set(this, 'membership', membership);
  set(this, 'user', user);

  page.render(hbs`{{member-list-item membership=membership user=user}}`);

  page.denyButton.click();

  assert.equal(getFlashMessageCount(this), 1, 'One flash message is rendered');

  let flash = getFlashMessageAt(0, this);
  let actualOptions = flash.getProperties('fixed', 'sticky', 'timeout', 'type');
  let expectedOptions = { fixed: true, sticky: false, timeout: 5000, type: 'success' };
  assert.deepEqual(actualOptions, expectedOptions, 'Proper message was set');
  assert.ok(flash.message.indexOf('Membership denied') !== -1, 'Message includes proper text');
});
