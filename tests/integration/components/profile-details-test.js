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

var user = {
  username: "testuser",
  twitter: "@testuser",
  website: "example.com",
  biography: "A test user",
};

test('it renders all user details', function(assert) {

  assert.expect(4);

  this.set('user', user);

  this.render(hbs`{{profile-details user=user}}`);

  assert.equal(this.$('[name=username]').text(), "testuser");
  assert.equal(this.$('[name=twitter]').text(), "@testuser");
  assert.equal(this.$('[name=website]').text(), "example.com");
  assert.equal(this.$('[name=biography]').text(), "A test user");
});

test('it can toggle between view and edit mode at will', function(assert) {
  assert.expect(3);

  this.render(hbs`{{profile-details}}`);

  assert.equal(this.$('.edit').length, 0);

  this.$('.start-edit').click();

  assert.equal(this.$('.edit').length, 1);

  this.$('.cancel-edit').click();

  assert.equal(this.$('.edit').length, 0);
});

test('it renders edit elements properly', function(assert) {
  assert.expect(5);

  this.set('user', user);

  this.render(hbs`{{profile-details user=user isEditing=true}}`);

  assert.equal(this.$('input[name=username]').val(), "testuser");
  assert.equal(this.$('input[name=twitter]').val(), "@testuser");
  assert.equal(this.$('input[name=website]').val(), "example.com");
  assert.equal(this.$('input[name=biography]').val(), "A test user");

  assert.equal(this.$('.save').length, 1);
});

test('it calls save method on user when save is clicked', function(assert) {
  assert.expect(1);
  var called = false;

  user.save = function() {
    called = true;
    return new Ember.RSVP.resolve();
  };

  this.set('user', user);

  this.render(hbs`{{profile-details user=user isEditing=true}}`);

  this.$('.save').click();

  assert.ok(called, 'Save method on user was called.');
});
