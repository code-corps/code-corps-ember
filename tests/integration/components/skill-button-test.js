import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

function setHandler(context, removeHandler = function() {}) {
  context.set('removeHandler', removeHandler);
}

moduleForComponent('skill-button', 'Integration | Component | skill button', {
  integration: true,
  beforeEach() {
    setHandler(this);
  }
});

test('it renders in its default state', function(assert) {
  this.render(hbs`{{skill-button remove=(action removeHandler)}}`);

  assert.equal(this.$('button').is(':disabled'), false);
  assert.equal(this.$('button span').hasClass('button-spinner'), false);
  assert.equal(this.$('button span').hasClass('check-mark'), true);
  assert.equal(this.$('button span').hasClass('x-mark'), false);
});

test('it has the skill title', function(assert) {
  this.set('skill', { title: 'Ruby' });
  this.render(hbs`{{skill-button remove=(action removeHandler) skill=skill}}`);

  assert.equal(this.$('button').text().trim(), 'Ruby');
});

test('it changes disabled when loading or not', function(assert) {
  this.render(hbs`{{skill-button isLoading=isLoading remove=(action removeHandler)}}`);

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
  this.render(hbs`{{skill-button isLoading=isLoading remove=(action removeHandler)}}`);

  this.set('isLoading', true);
  this.$('button').trigger('mouseenter');
  assert.equal(this.$('button').is(':disabled'), true);
  assert.equal(this.$('button span').hasClass('button-spinner'), true);
  assert.equal(this.$('button').hasClass('can-delete'), true);
});

test('it responds to hovering', function(assert) {
  this.render(hbs`{{skill-button remove=(action removeHandler)}}`);

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
  let userSkill = { id: 1 };
  this.set('removeHandler', function(removedUserSkill) {
    assert.deepEqual(removedUserSkill, userSkill);
  });
  this.set('userSkill', userSkill);
  this.render(hbs`{{skill-button remove=(action removeHandler userSkill)}}`);
  this.$('button').click();
});
