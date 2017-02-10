import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import { getFlashMessageCount, getFlashMessageAt } from 'code-corps-ember/tests/helpers/flash-message';

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
    {
      skill: {
        title: 'Ember.js'
      }
    },
    {
      skill: {
        title: 'Rails'
      }
    },
    {
      skill: {
        title: 'Ruby'
      }
    }
  ]
});

function mockMembership(pending) {
  let membership = Object.create({
    isPending: pending,
    destroyRecord() {
      return RSVP.resolve();
    },
    save() {
      return RSVP.resolve();
    }
  });
  return membership;
}

moduleForComponent('member-list-item', 'Integration | Component | member list item', {
  integration: true,
  beforeEach() {
    getOwner(this).lookup('service:flash-messages').registerTypes(['success']);
  }
});

test('it renders the basic information for the user', function(assert) {
  set(this, 'user', user);

  this.render(hbs`{{member-list-item user=user}}`);

  assert.equal(this.$('.icon').attr('src'), user.photoThumbUrl);
  assert.equal(this.$('.project-member__name strong').text().trim(), user.name);
  assert.equal(this.$('.project-member__name span').text().trim(), user.username);
  assert.equal(this.$('.icon').attr('src'), user.photoThumbUrl);
  assert.equal(this.$('.project-member__skills li:eq(0)').text().trim(), 'Ember.js');
  assert.equal(this.$('.project-member__skills li:eq(1)').text().trim(), 'Rails');
  assert.equal(this.$('.project-member__skills li:eq(2)').text().trim(), 'Ruby');
  assert.equal(this.$('button').length, 0);
});

test('it renders the username in the name if name is empty', function(assert) {
  set(user, 'name', '');
  set(this, 'user', user);

  this.render(hbs`{{member-list-item user=user}}`);

  assert.equal(this.$('.project-member__name strong').text().trim(), get(user, 'username'));
});

test('it renders the buttons when pending', function(assert) {
  let membership = mockMembership(true); // pending

  set(this, 'membership', membership);
  set(this, 'user', user);

  this.render(hbs`{{member-list-item membership=membership user=user}}`);

  assert.equal(this.$('button').length, 2);
  assert.equal(this.$('button.default').text().trim(), 'Approve');
  assert.equal(this.$('button.danger').text().trim(), 'Deny');
});

test('it does not render the buttons when not pending', function(assert) {
  let membership = mockMembership(false); // pending

  set(this, 'membership', membership);
  set(this, 'user', user);

  this.render(hbs`{{member-list-item membership=membership user=user}}`);

  assert.equal(this.$('button').length, 0);
});

test('it sends the approve action when clicking approve', function(assert) {
  assert.expect(4);

  let membership = Object.create({
    isPending: true,
    save() {
      assert.ok(true);
      return RSVP.resolve();
    }
  });

  set(this, 'membership', membership);
  set(this, 'user', user);

  this.render(hbs`{{member-list-item membership=membership user=user}}`);

  this.$('button.default').click();

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
    isPending: true,
    destroyRecord() {
      assert.ok(true);
      return RSVP.resolve();
    }
  });

  set(this, 'membership', membership);
  set(this, 'user', user);

  this.render(hbs`{{member-list-item membership=membership user=user}}`);

  this.$('button.danger').click();

  assert.equal(getFlashMessageCount(this), 1, 'One flash message is rendered');

  let flash = getFlashMessageAt(0, this);
  let actualOptions = flash.getProperties('fixed', 'sticky', 'timeout', 'type');
  let expectedOptions = { fixed: true, sticky: false, timeout: 5000, type: 'success' };
  assert.deepEqual(actualOptions, expectedOptions, 'Proper message was set');
  assert.ok(flash.message.indexOf('Membership denied') !== -1, 'Message includes proper text');
});
