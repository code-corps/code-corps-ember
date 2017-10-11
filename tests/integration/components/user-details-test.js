import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/user-details';
import Ember from 'ember';

const {
  set
} = Ember;

let page = PageObject.create(component);

moduleForComponent('user-details', 'Integration | Component | user details', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders subcomponents', function(assert) {
  assert.expect(2);

  page.render(hbs`{{user-details}}`);

  assert.ok(page.userProjectsList.isVisible);
  assert.ok(page.userSidebar.isVisible);
});

test('it renders the user skills list when the user has skills', function(assert) {
  assert.expect(2);

  let user = {
    userSkills: [
      {
        skill: {
          title: 'Ember.js'
        }
      }
    ]
  };
  set(this, 'user', user);

  page.render(hbs`{{user-details user=user}}`);

  assert.ok(page.userSkillsList.isVisible);
  assert.equal(page.userSkillsList.skills(0).text, 'Ember.js');
});

test('it renders the empty state when the user has no skills', function(assert) {
  assert.expect(2);

  let user = { userSkills: [] };
  set(this, 'user', user);

  page.render(hbs`{{user-details user=user}}`);

  assert.notOk(page.userSkillsList.isVisible);
  assert.ok(page.userSkillsListEmptyState.isVisible);
});
