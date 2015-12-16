import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('profile-details', 'Integration | Component | profile details', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`{{profile-details}}`);

  assert.equal(this.$('.profile-details').length, 1);
});

test('it renders all user details', function(assert) {
  var user = {
    username: "testuser",
    twitter: "@testuser",
    website: "example.com",
    biography: "A test user"
  };

  this.set('user', user);

  this.render(hbs`{{profile-details user=user}}`);

  assert.equal(this.$('[name=username]').text(), "testuser");
  assert.equal(this.$('[name=twitter]').text(), "@testuser");
  assert.equal(this.$('[name=website]').text(), "example.com");
  assert.equal(this.$('[name=biography]').text(), "A test user");
});
