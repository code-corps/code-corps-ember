import { moduleForComponent, test } from 'ember-qunit';
import { set } from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/conversations/user-details';

let page = PageObject.create(component);

moduleForComponent('conversations/user-details', 'Integration | Component | conversations/user details', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders the user details', function(assert) {
  assert.expect(4);

  let user = {
    name: 'Test User',
    photoThumbUrl: 'http://lorempixel.com/25/25/',
    username: 'testuser',
    userSkills: [{ skill: { title: 'Ember.js' } }]
  };
  set(this, 'user', user);

  this.render(hbs`{{conversations/user-details user=user}}`);

  assert.equal(page.photo.url, user.photoThumbUrl, 'Their photo renders');
  assert.equal(page.name.text, user.name, 'Their name renders');
  assert.equal(page.username.text, user.username, 'Their username renders');
  assert.equal(page.userSkillsList.skills.objectAt(0).text, 'Ember.js');
});

test('it sets the name to username if name is blank', function(assert) {
  assert.expect(1);

  let user = { username: 'testuser' };
  set(this, 'user', user);

  this.render(hbs`{{conversations/user-details user=user}}`);

  assert.equal(page.name.text, 'testuser');
});
