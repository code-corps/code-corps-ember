import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  computed,
  Object
} = Ember;

const stubUser = Object.extend({
  id: 1,
  username: 'tester',
  photoThumbUrl: '/assets/images/twitter.png',

  atUsername: computed('username', function() {
    return `@${this.get('username')}`;
  }),

  twitterUrl: computed('twitter', function() {
    return `https://twitter.com/${this.get('twitter')}`;
  })
}).create();

moduleForComponent('user-menu', 'Integration | Component | user menu', {
  integration: true
});

test('it renders properly', function(assert) {
  assert.expect(10);

  this.set('user', stubUser);
  this.render(hbs`{{user-menu user=user}}`);

  assert.equal(this.$('.user-menu').length, 1, "The component's element renders.");

  assert.equal(this.$('img.avatar').length, 1, "The user's avatar renders");
  assert.equal(this.$('img.avatar').attr('src'), stubUser.get('photoThumbUrl'), 'The avatar has the correct source');
  assert.equal(this.$('img.avatar').attr('alt'), stubUser.get('atUsername'), 'The avatar has the correct alt');

  assert.equal(this.$('.user-menu.menu-hidden').length, 1, 'The menu is initially hidden');

  this.$('.user-menu-select').click();

  assert.equal(this.$('.user-menu.menu-visible').length, 1, 'The menu is now visible');

  assert.equal(this.$('a.slugged-route').length, 1, 'The link to the user route is rendered');
  assert.equal(this.$('a.profile').length, 1, 'The link to the user profile is rendered');
  assert.equal(this.$('a.logout').length, 1, 'The logout link is rendered');

  assert.equal(this.$('.dropdown-footer').text().trim(), `Signed in as ${stubUser.get('username')}`, 'The username is rendered in the footer');
});

test('clicking an open dropdown dismisses it', function(assert) {
  assert.expect(2);

  this.set('user', stubUser);
  this.render(hbs`{{user-menu user=user}}`);

  this.$('.user-menu-select').click();
  assert.equal(this.$('.user-menu.menu-visible').length, 1, 'The menu is now visible');
  this.$('.user-menu .dropdown-menu').click();
  assert.equal(this.$('.user-menu.menu-hidden').length, 1, 'The menu is now hidden');
});
