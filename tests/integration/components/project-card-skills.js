import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { Service } = Ember;

let userSkillsService = Service.extend({
  hasSkill(skill) {
    return skill;
  },
  findUserSkill(skill) {
    return skill;
  }
});

moduleForComponent('project-card-ksills', 'Integration | Component | project card skills', {
  integration: true,
  beforeEach() {
    this.register('service:user-skills', userSkillsService);
  }
});

test('it shows no expander for few skills', function(assert) {
  assert.expect(3);

  let skills = [{ title: 'Ruby' }];

  this.set('skills', skills);
  this.render(hbs`{{project-card-skills skills=skills}}`);

  assert.equal(this.$('.skills li').length, 1);
  assert.ok(this.$('.skills').hasClass('overflow-hidden'));
  assert.ok(this.$('.expander').hasClass('hidden'));
});

test('it shows expander and toggles for lots of skills', function(assert) {
  assert.expect(11);

  let skills = [];
  for (let i = 1; i <= 100; i++) {
    skills.pushObject({
      title: `Skill ${i}`
    });
  }

  this.set('skills', skills);
  this.render(hbs`{{project-card-skills skills=skills}}`);

  assert.equal(this.$('.skills li').length, 100);
  assert.ok(this.$('.skills').hasClass('overflow-hidden'));
  assert.ok(this.$('.expander').hasClass('visible'));
  assert.ok(this.$('.expander').text().trim(), 'show more');
  assert.ok(this.$('.skills li:eq(99)').not(':visible'));

  this.$('.expander a').click();
  assert.notOk(this.$('.skills').hasClass('overflow-hidden'));
  assert.ok(this.$('.expander').text().trim(), 'show less');
  assert.ok(this.$('.skills li:eq(99)').is(':visible'));

  this.$('.expander a').click();
  assert.ok(this.$('.skills').hasClass('overflow-hidden'));
  assert.ok(this.$('.expander').text().trim(), 'show more');
  assert.ok(this.$('.skills li:eq(99)').not(':visible'));
});
