import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';
import relatedSkillsComponent from 'code-corps-ember/tests/pages/components/related-skills';

let page = PageObject.create(relatedSkillsComponent);

let userSkillsService = {
  hasSkill(skill) {
    return skill;
  },
  findUserSkill(skill) {
    return skill;
  }
};

moduleForComponent('related-skills', 'Integration | Component | related skills', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    stubService(this, 'user-skills', userSkillsService);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it shows no expander for few skills', function(assert) {
  assert.expect(3);

  let skills = [{ title: 'Ruby' }];

  this.set('skills', skills);

  this.render(hbs`{{related-skills skills=skills}}`);

  assert.notOk(page.overflowHidden, 'Overflow is visible.');
  assert.ok(page.expander.hidden, 'Expander button is hidden.');
  assert.equal(page.skillListItems.listItems.length, 1, 'Correct number of skills is rendered.');
});

test('it does not show expander if overflowHidden is not set', function(assert) {
  assert.expect(1);

  let skills = [];
  for (let i = 1; i <= 100; i++) {
    skills.pushObject({
      title: `Skill ${i}`
    });
  }

  this.set('skills', skills);

  this.render(hbs`{{related-skills skills=skills}}`);

  assert.notOk(page.overflow.hidden, 'Overflow is not hidden.');
});

test('it shows expander and toggles for lots of skills when the component is modified to do so', function(assert) {
  assert.expect(5);

  let skills = [];
  for (let i = 1; i <= 100; i++) {
    skills.pushObject({
      title: `Skill ${i}`
    });
  }

  this.set('skills', skills);
  this.render(hbs`{{related-skills overflowHidden=true skills=skills}}`);

  assert.ok(page.overflow.hidden, 'Overflow is hidden.');
  assert.ok(page.expander.visible, 'Expander button is visible.');

  page.expander.click();
  assert.ok(page.overflow.visible, 'Overflow is visible.');

  page.expander.click();
  assert.ok(page.overflow.hidden, 'Overflow is hidden.');
  assert.ok(page.expander.visible, 'Expander button is visible.');
});
