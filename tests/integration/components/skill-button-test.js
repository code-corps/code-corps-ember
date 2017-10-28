import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import skillButton from 'code-corps-ember/tests/pages/components/skill-button';

function setHandler(context, removeHandler = function() {}) {
  set(context, 'removeHandler', removeHandler);
}

let page = PageObject.create(skillButton);

moduleForComponent('skill-button', 'Integration | Component | skill button', {
  integration: true,
  beforeEach() {
    setHandler(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders in its default state', function(assert) {
  this.render(hbs`{{skill-button remove=(action removeHandler)}}`);

  assert.notOk(page.isDisabled);
  assert.notOk(page.span.hasSpinner);
  assert.notOk(page.span.hasCheck);
  assert.notOk(page.span.hasX);
});

test('it can have a check mark', function(assert) {
  this.render(hbs`{{skill-button hasCheck=true remove=(action removeHandler)}}`);
  assert.ok(page.span.hasCheck);
});

test('it can have an x mark', function(assert) {
  this.render(hbs`{{skill-button alwaysShowX=true remove=(action removeHandler)}}`);
  assert.ok(page.span.hasX);
});

test('it can change size', function(assert) {
  this.render(hbs`{{skill-button remove=(action removeHandler) size="large"}}`);
  assert.ok(page.isLarge);
  assert.ok(page.span.isLarge);
});

test('it has the skill title', function(assert) {
  this.set('skill', { title: 'Ruby' });
  this.render(hbs`{{skill-button remove=(action removeHandler) skill=skill}}`);

  assert.equal(page.text, 'Ruby');
});

test('it changes disabled when loading or not', function(assert) {
  this.render(hbs`{{skill-button isLoading=isLoading remove=(action removeHandler)}}`);

  assert.notOk(page.isDisabled);
  assert.notOk(page.span.hasSpinner);

  this.set('isLoading', true);
  assert.ok(page.isDisabled);
  assert.ok(page.span.hasSpinner);

  this.set('isLoading', false);
  assert.notOk(page.isDisabled);
  assert.notOk(page.span.hasSpinner);
});

test('it only renders loading spinner even when hovering', function(assert) {
  this.render(hbs`{{skill-button isLoading=isLoading remove=(action removeHandler)}}`);

  this.set('isLoading', true);
  page.mouseenter();
  assert.ok(page.isDisabled);
  assert.ok(page.span.hasSpinner);
  assert.ok(this.$('button').hasClass('can-delete'));
});

test('it responds to hovering', function(assert) {
  this.render(hbs`{{skill-button remove=(action removeHandler)}}`);

  assert.notOk(this.$('button').hasClass('can-delete'));
  assert.notOk(page.span.hasX);

  page.mouseenter();
  assert.ok(this.$('button').hasClass('can-delete'));
  assert.ok(page.span.hasX);

  page.mouseleave();
  assert.notOk(this.$('button').hasClass('can-delete'));
  assert.notOk(page.span.hasX);
});

test('it removes the skill when clicking', function(assert) {
  let userSkill = { id: 1 };
  this.set('removeHandler', function(removedUserSkill) {
    assert.deepEqual(removedUserSkill, userSkill);
  });
  this.set('userSkill', userSkill);
  this.render(hbs`{{skill-button remove=(action removeHandler userSkill)}}`);
  page.click();
});
