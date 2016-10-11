import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  Object,
  Service
} = Ember;

let userSkillsService = Service.extend({
  findUserSkill(queriedSkill) {
    if (queriedSkill === skill) {
      return skill;
    }
  }
});

let skill = Object.create({
  selected: true,
  title: 'Ruby on Rails'
});

moduleForComponent('user-skills-input-item', 'Integration | Component | user skills input item', {
  integration: true,
  beforeEach() {
    this.register('service:user-skills', userSkillsService);
  }
});

let query = 'ru on r';

test('it renders as selected with the highlighted string', function(assert) {
  this.set('skill', skill);
  this.set('query', query);

  this.render(hbs`{{user-skills-input-item skill=skill query=query}}`);

  assert.equal(this.$('li').hasClass('selected'), true);

  let html = '<strong>Ru</strong>by <strong>on</strong> <strong>R</strong>ails';
  assert.equal(this.$('a').html().trim(), html);
});

test('it sends the hover action on mouseEnter', function(assert) {
  assert.expect(1);

  this.set('skill', skill);
  this.set('query', query);

  this.on('hover', (hoveredSkill) => {
    assert.deepEqual(skill, hoveredSkill);
  });
  this.render(hbs`{{user-skills-input-item skill=skill query=query hover="hover"}}`);

  this.$('li').trigger('mouseenter');
});

test('it sends the hover and selectSkill actions on mousedown', function(assert) {
  assert.expect(2);

  this.set('skill', skill);
  this.set('query', query);

  this.on('hover', (hoveredSkill) => {
    assert.deepEqual(skill, hoveredSkill);
  });
  this.on('selectSkill', () => {
    assert.ok(true);
  });
  this.render(hbs`{{user-skills-input-item skill=skill query=query hover="hover" selectSkill="selectSkill"}}`);

  this.$('li').trigger('mousedown');
});
