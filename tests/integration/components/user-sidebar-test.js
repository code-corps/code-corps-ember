import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage from '../../helpers/setup-mirage-for-integration';
import PageObject from 'ember-cli-page-object';
import userSidebarComponent from '../../pages/components/user-sidebar';

let page = PageObject.create(userSidebarComponent);

moduleForComponent('user-sidebar', 'Integration | Component | user sidebar', {
  integration: true,
  setup() {
    startMirage(this.container);
  },
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    server.shutdown();
    page.removeContext();
  }
});

function mockUser() {
  // the only way I could figure out to use mirage
  // to create a user
  // just doing `let user = server.schema.user.create(attrs)`
  // gives us a proper user object, but then ember clashes with it somewhere,
  // trying to redefine its properties
  // TODO: figure out how to do it better
  let user = {
    id: 1,
    name: 'Josh Smith',
    biography: 'Test bio',
    username: 'JoshSmith',
    twitter: 'joshsmith',
    website: 'https://codecorps.org',
    // TODO: remove this because it's a computed property and
    // Mirage doesn't do a great job with that
    twitterUrl: 'https://twitter.com/joshsmith'
  };
  server.schema.users.create(user);
  return user;
}

test('it renders all required elements', function(assert) {
  assert.expect(7);

  let user = mockUser();
  set(this, 'user', user);

  this.render(hbs`{{user-sidebar user=user}}`);

  assert.equal(page.name, 'Josh Smith', 'Their name renders');
  assert.equal(page.username, 'JoshSmith', 'Their username renders');
  assert.equal(page.biography, 'Test bio', 'Their biography renders');
  assert.equal(page.twitterHandle, '@joshsmith', 'Their twitter handler renders');
  assert.equal(page.twitterLink, 'https://twitter.com/joshsmith', 'The twitter link renders');
  assert.equal(page.website, 'https://codecorps.org', 'Their website renders');
  assert.equal(page.websiteLink, 'https://codecorps.org/', 'The website link renders');
});

test('it does not show some details if blank', function(assert) {
  assert.expect(3);

  let user = {};
  set(this, 'user', user);

  this.render(hbs`{{user-sidebar user=user}}`);

  assert.ok(page.biographyIsHidden);
  assert.ok(page.twitterHandleHidden);
  assert.ok(page.websiteHidden);
});

test('it sets the name to username if name is blank', function(assert) {
  assert.expect(1);

  let user = {
    username: 'joshsmith'
  };
  set(this, 'user', user);

  this.render(hbs`{{user-sidebar user=user}}`);

  assert.equal(page.name, 'joshsmith');
});
