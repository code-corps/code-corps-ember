import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage from '../../helpers/setup-mirage-for-integration';

moduleForComponent('user-sidebar', 'Integration | Component | user sidebar', {
  integration: true,
  setup() {
    startMirage(this.container);
  }
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{user-sidebar}}`);

  assert.equal(this.$('.user-sidebar').length, 1, 'Component\'s element is rendered');
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
  this.set('user', user);

  this.render(hbs`{{user-sidebar user=user}}`);

  assert.equal(this.$('.user-sidebar').length, 1, 'Component\'s element is rendered');
  assert.equal(this.$('h2 .name').text(), 'Josh Smith', 'Their name renders');
  assert.equal(this.$('h2 .username').text(), 'JoshSmith', 'Their username renders');
  assert.equal(this.$('li.twitter').text().trim(), '@joshsmith', 'Their twitter handler renders');
  assert.equal(this.$('li.twitter a').attr('href'), 'https://twitter.com/joshsmith', 'The twitter link renders');
  assert.equal(this.$('li.website').text().trim(), 'https://codecorps.org', 'Their website renders');
  assert.equal(this.$('li.website a').attr('href'), 'https://codecorps.org', 'The website link renders');
});

test('it does not show some details if blank', function(assert) {
  assert.expect(2);

  let user = {};
  this.set('user', user);

  this.render(hbs`{{user-sidebar user=user}}`);

  assert.equal(this.$('li.twitter').length, 0);
  assert.equal(this.$('li.website').length, 0);
});

test('it sets the name to username if name is blank', function(assert) {
  assert.expect(1);

  let user = {
    username: 'joshsmith'
  };
  this.set('user', user);

  this.render(hbs`{{user-sidebar user=user}}`);

  assert.equal(this.$('h2 .name').text(), 'joshsmith');
});
