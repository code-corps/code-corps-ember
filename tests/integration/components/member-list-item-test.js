import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  Object,
  RSVP,
  Service
} = Ember;

let user = {
  name: 'Josh Smith',
  username: 'joshsmith',
  photoThumbUrl: 'http://lorempixel.com/image_output/people-q-c-50-50-4.jpg',
  userCategories: [
    {
      category: {
        name: 'Technology'
      }
    }
  ],
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
};

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
  integration: true
});

test('it renders the basic information for the user', function(assert) {
  this.set('user', user);

  this.render(hbs`{{member-list-item user=user}}`);

  assert.equal(this.$('.icon').attr('src'), user.photoThumbUrl);
  assert.equal(this.$('p.name').text().trim(), user.name);
  assert.equal(this.$('p.username').text().trim(), user.username);
  assert.equal(this.$('.icon').attr('src'), user.photoThumbUrl);
  assert.equal(this.$('p.interests').text().trim(), 'Technology');
  assert.equal(this.$('p.skills li:eq(0)').text().trim(), 'Ember.js');
  assert.equal(this.$('p.skills li:eq(1)').text().trim(), 'Rails');
  assert.equal(this.$('p.skills li:eq(2)').text().trim(), 'Ruby');
  assert.equal(this.$('button').length, 0);
});

test('it renders the username in the name if name is empty', function(assert) {
  user.name = '';
  this.set('user', user);

  this.render(hbs`{{member-list-item user=user}}`);

  assert.equal(this.$('p.name').text().trim(), user.username);
});

test('it renders the buttons when pending', function(assert) {
  let membership = mockMembership(true); // pending

  this.set('membership', membership);
  this.set('user', user);

  this.render(hbs`{{member-list-item membership=membership user=user}}`);

  assert.equal(this.$('button').length, 2);
  assert.equal(this.$('button.default').text().trim(), 'Approve');
  assert.equal(this.$('button.danger').text().trim(), 'Deny');
});

test('it does not render the buttons when not pending', function(assert) {
  let membership = mockMembership(false); // pending

  this.set('membership', membership);
  this.set('user', user);

  this.render(hbs`{{member-list-item membership=membership user=user}}`);

  assert.equal(this.$('button').length, 0);
});

test('it sends the approve action when clicking approve', function(assert) {
  assert.expect(7);

  let membership = Object.create({
    isPending: true,
    save() {
      assert.ok(true);
      return RSVP.resolve();
    }
  });

  this.set('membership', membership);
  this.set('user', user);

  let mockFlashMessages = Service.extend({
    clearMessages() {
      assert.ok(true);
    },
    add(object) {
      assert.ok(object.message.indexOf('Membership approved') !== -1);
      assert.equal(object.type, 'success');
      assert.equal(object.fixed, true);
      assert.equal(object.sticky, false);
      assert.equal(object.timeout, 5000);
    }
  });
  this.register('service:flash-messages', mockFlashMessages);

  this.render(hbs`{{member-list-item membership=membership user=user}}`);

  this.$('button.default').click();
});

test('it sends the deny action when clicking deny', function(assert) {
  assert.expect(7);

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

  let mockFlashMessages = Service.extend({
    clearMessages() {
      assert.ok(true);
    },
    add(object) {
      assert.ok(object.message.indexOf('Membership denied') !== -1);
      assert.equal(object.type, 'success');
      assert.equal(object.fixed, true);
      assert.equal(object.sticky, false);
      assert.equal(object.timeout, 5000);
    }
  });
  this.register('service:flash-messages', mockFlashMessages);

  this.set('membership', membership);
  this.set('user', user);

  this.render(hbs`{{member-list-item membership=membership user=user}}`);

  this.$('button.danger').click();
});
