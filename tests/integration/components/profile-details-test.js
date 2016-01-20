import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';




moduleForComponent('profile-details', 'Integration | Component | profile details', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{profile-details}}`);

  assert.equal(this.$('.profile-details').length, 1);
});

let user = {
  name: 'Test User',
  twitter: '@testuser',
  website: 'example.com',
  biography: 'A test user',
};

test('it renders form elements properly', function(assert) {
  assert.expect(5);

  this.set('user', user);

  this.render(hbs`{{profile-details user=user}}`);

  assert.equal(this.$('input[name=name]').val(), 'Test User');
  assert.equal(this.$('input[name=twitter]').val(), '@testuser');
  assert.equal(this.$('input[name=website]').val(), 'example.com');
  assert.equal(this.$('input[name=biography]').val(), 'A test user');

  assert.equal(this.$('.save').length, 1);
});

test('it calls save on user when save button is clicked', function(assert) {
  assert.expect(2);

  user.save = function() {
    assert.ok(true, 'Save method was called on user');
    return Ember.RSVP.resolve();
  };

  this.set('user', user);

  const flashServiceStub = Ember.Service.extend({
    success() {
      assert.ok(true, 'Flash message service was called');
    }
  });

  this.register('service:flash-messages', flashServiceStub);


  this.render(hbs`{{profile-details user=user}}`);

  this.$('.save').click();
});
