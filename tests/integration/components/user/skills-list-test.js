import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import userSkillsList from 'code-corps-ember/tests/pages/components/user/skills-list';

let page = PageObject.create(userSkillsList);

moduleForComponent('user/skills-list', 'Integration | Component | user/skills list', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders each skill in the list', function(assert) {
  assert.expect(3);

  let user = {
    userSkills: [
      {
        skill: {
          title: 'Ember.js'
        }
      },
      {
        skill: {
          title: 'JavaScript'
        }
      }
    ]
  };

  this.set('user', user);

  this.render(hbs`{{user/skills-list user=user}}`);

  assert.equal(page.skills.length, 2);
  assert.equal(page.skills.objectAt(0).text, 'Ember.js');
  assert.equal(page.skills.objectAt(1).text, 'JavaScript');
});

test('it renders the empty state when no skills', function(assert) {
  assert.expect(1);

  let user = {
    username: 'testuser',
    userSkills: []
  };

  this.set('user', user);

  this.render(hbs`{{user/skills-list user=user}}`);

  assert.ok(page.emptyState.isVisible);
});
