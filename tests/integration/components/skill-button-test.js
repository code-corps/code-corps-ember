import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { Service } = Ember;

moduleForComponent('skill-button', 'Integration | Component | skill button', {
  integration: true
});

test('it renders in its default state', function(assert) {
  this.render(hbs`{{skill-button}}`);

  assert.equal(this.$('button').is(':disabled'), false);
  assert.equal(this.$('button span').hasClass('button-spinner'), false);
  assert.equal(this.$('button span').hasClass('check-mark'), true);
  assert.equal(this.$('button span').hasClass('x-mark'), false);
});

test('it has the skill title', function(assert) {
  this.set('skill', { title: 'Ruby' });
  this.render(hbs`{{skill-button skill=skill}}`);

  assert.equal(this.$('button').text().trim(), 'Ruby');
});

test('it changes disabled when loading or not', function(assert) {
  this.render(hbs`{{skill-button isLoading=isLoading}}`);

  assert.equal(this.$('button').is(':disabled'), false);
  assert.equal(this.$('button span').hasClass('button-spinner'), false);

  this.set('isLoading', true);
  assert.equal(this.$('button').is(':disabled'), true);
  assert.equal(this.$('button span').hasClass('button-spinner'), true);

  this.set('isLoading', false);
  assert.equal(this.$('button').is(':disabled'), false);
  assert.equal(this.$('button span').hasClass('button-spinner'), false);
});

test('it only renders loading spinner even when hovering', function(assert) {
  this.render(hbs`{{skill-button isLoading=isLoading}}`);

  this.set('isLoading', true);
  this.$('button').trigger('mouseenter');
  assert.equal(this.$('button').is(':disabled'), true);
  assert.equal(this.$('button span').hasClass('button-spinner'), true);
  assert.equal(this.$('button').hasClass('can-delete'), true);
});

test('it responds to hovering', function(assert) {
  this.render(hbs`{{skill-button}}`);

  assert.equal(this.$('button').hasClass('can-delete'), false);
  assert.equal(this.$('button span').hasClass('x-mark'), false);

  this.$('button').trigger('mouseenter');
  assert.equal(this.$('button').hasClass('can-delete'), true);
  assert.equal(this.$('button span').hasClass('x-mark'), true);

  this.$('button').trigger('mouseleave');
  assert.equal(this.$('button').hasClass('can-delete'), false);
  assert.equal(this.$('button span').hasClass('x-mark'), false);
});

test('it removes the skill when clicking', function(assert) {
  let skill = { title: 'Ruby' };
  let mockUserSkillsService = Service.extend({
    removeSkill(removedSkill) {
      assert.deepEqual(skill, removedSkill);
    }
  });
  this.register('service:user-skills', mockUserSkillsService);
  this.set('skill', skill);
  this.render(hbs`{{skill-button skill=skill}}`);
  this.$('button').click();
});
