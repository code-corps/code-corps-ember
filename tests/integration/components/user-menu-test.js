import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import PageObject from 'ember-cli-page-object';
import userMenu from '../../pages/components/user-menu';

const { computed, Object, set } = Ember;

let page = PageObject.create(userMenu);

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
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders properly', function(assert) {
  assert.expect(9);

  set(this, 'user', stubUser);
  page.render(hbs`{{user-menu user=user}}`);

  assert.ok(page.avatarVisible, "The user's avatar renders");
  assert.equal(this.$('img.avatar').attr('src'), stubUser.get('photoThumbUrl'), 'The avatar has the correct source');
  assert.equal(this.$('img.avatar').attr('alt'), stubUser.get('atUsername'), 'The avatar has the correct alt');

  assert.ok(page.dropdownIsHidden, 'The dropdown is initially hidden');

  this.$('.user-menu-select').click();

  assert.notOk(page.dropdownIsHidden, 'The dropdown is now visible');

  assert.ok(page.sluggedRouteLinkVisible, 'The link to the user route is rendered');
  assert.ok(page.profileLinkVisible, 'The link to the user profile is rendered');
  assert.ok(page.logoutLinkVisible, 'The logout link is rendered');

  assert.equal(page.footerText, `Signed in as ${stubUser.get('username')}`, 'The username is rendered in the footer');
});

test('clicking an open dropdown dismisses it', function(assert) {
  assert.expect(2);

  set(this, 'user', stubUser);
  page.render(hbs`{{user-menu user=user}}`);

  this.$('.user-menu-select').click();
  assert.notOk(page.dropdownIsHidden, 'The dropdown is now visible');
  this.$('.user-menu .dropdown-menu').click();
  assert.ok(page.dropdownIsHidden, 'The dropdown is now hidden');
});
