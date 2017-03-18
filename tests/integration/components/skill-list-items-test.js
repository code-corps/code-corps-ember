import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';
import skillListItems from 'code-corps-ember/tests/pages/components/skill-list-items';

const { Object, set } = Ember;

let mockSession = { isAuthenticated: true };

let skills = [
  Object.create({
    title: 'Rails'
  }),
  Object.create({
    title: 'HTML'
  }),
  Object.create({
    title: 'Ruby'
  }),
  Object.create({
    title: 'Ember.js'
  })
];

let page = PageObject.create(skillListItems);

moduleForComponent('skill-list-items', 'Integration | Component | skill list items', {
  integration: true,
  beforeEach() {
    stubService(this, 'user-skills-list', {
      includes(queriedSkill) {
        return queriedSkill === skills[1];
      },
      find(queriedSkill) {
        if (queriedSkill === skills[1]) {
          return queriedSkill;
        }
      }
    });
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders the skills sorted by match and then alphabetically', function(assert) {
  assert.expect(9);

  set(this, 'skills', skills);
  stubService(this, 'session', mockSession);

  this.render(hbs`{{skill-list-items skills=skills}}`);

  assert.equal(page.listItemCount, 4, 'Renders the correct number of skills');
  assert.equal(page.listItems(0).skillListItemSpan.text, 'HTML');
  assert.ok(page.listItems(0).skillListItemSpan.hasMatched);
  assert.equal(page.listItems(1).skillListItemSpan.text, 'Ember.js');
  assert.notOk(page.listItems(1).skillListItemSpan.hasMatched);
  assert.equal(page.listItems(2).skillListItemSpan.text, 'Rails');
  assert.notOk(page.listItems(2).skillListItemSpan.hasMatched);
  assert.equal(page.listItems(3).skillListItemSpan.text, 'Ruby');
  assert.notOk(page.listItems(3).skillListItemSpan.hasMatched);
});
