import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import userSkillsList from 'code-corps-ember/tests/pages/components/user/skills-list';

let page = PageObject.create(userSkillsList);

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

  this.set('user', user);

  page.render(hbs`{{user/skills-list user=user}}`);

  assert.equal(page.listItems().count, 2);
  assert.equal(page.listItems(0).text, 'Ember.js');
  assert.equal(page.listItems(1).text, 'JavaScript');
});
