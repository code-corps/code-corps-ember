import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import skillsList from 'code-corps-ember/tests/pages/components/skills-list';

const { set } = Ember;

let page = PageObject.create(skillsList);

let skills = [
  {
    id: 'skill-1',
    title: 'Ember.js'
  }
];

moduleForComponent('skills-list', 'Integration | Component | skills list', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders the skills', function(assert) {
  assert.expect(1);
  set(this, 'skills', skills);
  this.render(hbs`{{skills-list skills=skills}}`);
  assert.equal(page.skillListItems.listItemCount, 1, 'Renders all skills');
});
