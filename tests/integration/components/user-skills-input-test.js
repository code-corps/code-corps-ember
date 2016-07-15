import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import jQuery from 'jquery';

let mockStore = Ember.Service.extend({
  query () {
    return Ember.RSVP.resolve([
      Ember.Object.create({ title: "Ruby" }),
      Ember.Object.create({ title: "Ruby on Rails" }),
    ]);
  }
});

let mockUserSkillsService = Ember.Service.extend({
  findUserSkill() {
    return Ember.K;
  },
  removeSkill() {
    return Ember.K;
  },
});

moduleForComponent('user-skills-input', 'Integration | Component | user skills input', {
  integration: true,
  beforeEach() {
    this.register('service:store', mockStore);
    this.register('service:user-skills', mockUserSkillsService);
  }
});

let pressCommaKey = jQuery.Event('keydown', {
  keyCode: 188,
  which: 188
});

let pressDownKey = jQuery.Event('keydown', {
  keyCode: 40,
  which: 40
});

let pressEnterKey = jQuery.Event('keydown', {
  keyCode: 13,
  which: 13
});

let pressEscKey = jQuery.Event('keydown', {
  keyCode: 27,
  which: 27
});

let pressRKey = jQuery.Event('keydown', {
  keyCode: 82,
  which: 82
});

let pressUpKey = jQuery.Event('keydown', {
  keyCode: 38,
  which: 38
});

test('it does nothing when pressing a random key', function(assert) {
  assert.expect(1);
  this.render(hbs`{{user-skills-input}}`);

  this.$('input').trigger(pressRKey);

  assert.equal(this.$('input').val().trim(), '');
});

test('it fetches results when changing the input', function(assert) {
  assert.expect(5);
  this.render(hbs`{{user-skills-input query=query}}`);

  this.$('input').focus();
  this.set('query', 'ruby ra');

  assert.equal(this.$('input').val().trim(), 'ruby ra');
  this.$('input').keydown();

  let firstItemHtml = '<strong>Ruby</strong>';
  assert.equal(this.$('.dropdown-menu li:eq(0) a').html().trim(), firstItemHtml);
  assert.equal(this.$('.dropdown-menu li:eq(0)').hasClass('selected'), true);

  let secondItemHtml = '<strong>Ruby</strong> on <strong>Ra</strong>ils';
  assert.equal(this.$('.dropdown-menu li:eq(1) a').html().trim(), secondItemHtml);
  assert.equal(this.$('.dropdown-menu li:eq(1)').hasClass('selected'), false);
});

test('it changes the selection when arrowing up or down', function(assert) {
  assert.expect(10);
  this.render(hbs`{{user-skills-input query=query}}`);

  this.$('input').focus();
  this.set('query', 'ruby ra');
  this.$('input').keydown();

  assert.equal(this.$('.dropdown-menu li:eq(0)').hasClass('selected'), true);
  assert.equal(this.$('.dropdown-menu li:eq(1)').hasClass('selected'), false);

  this.$('input').trigger(pressDownKey);
  assert.equal(this.$('.dropdown-menu li:eq(0)').hasClass('selected'), false);
  assert.equal(this.$('.dropdown-menu li:eq(1)').hasClass('selected'), true);

  this.$('input').trigger(pressDownKey);
  assert.equal(this.$('.dropdown-menu li:eq(0)').hasClass('selected'), true);
  assert.equal(this.$('.dropdown-menu li:eq(1)').hasClass('selected'), false);

  this.$('input').trigger(pressUpKey);
  assert.equal(this.$('.dropdown-menu li:eq(0)').hasClass('selected'), false);
  assert.equal(this.$('.dropdown-menu li:eq(1)').hasClass('selected'), true);

  this.$('input').trigger(pressUpKey);
  assert.equal(this.$('.dropdown-menu li:eq(0)').hasClass('selected'), true);
  assert.equal(this.$('.dropdown-menu li:eq(1)').hasClass('selected'), false);
});

test('it hides when hitting esc key', function(assert) {
  assert.expect(2);
  this.render(hbs`{{user-skills-input query=query}}`);

  this.$('input').focus();
  this.set('query', 'ruby ra');
  this.$('input').keydown();

  assert.equal(this.$('.dropdown-menu').length, 1);

  this.$('input').trigger(pressEscKey);

  assert.equal(this.$('.dropdown-menu').length, 0);
});

test('it changes the selection when hovering', function(assert) {
  assert.expect(4);
  this.render(hbs`{{user-skills-input query=query}}`);

  this.$('input').focus();
  this.set('query', 'ruby ra');
  this.$('input').keydown();

  assert.equal(this.$('.dropdown-menu li:eq(0)').hasClass('selected'), true);
  assert.equal(this.$('.dropdown-menu li:eq(1)').hasClass('selected'), false);

  this.$('.dropdown-menu li:eq(1)').trigger('mouseenter');
  assert.equal(this.$('.dropdown-menu li:eq(0)').hasClass('selected'), false);
  assert.equal(this.$('.dropdown-menu li:eq(1)').hasClass('selected'), true);
});

test('it selects the skill when hitting enter', function(assert) {
  assert.expect(2);
  this.render(hbs`{{user-skills-input query=query}}`);

  this.$('input').focus();
  this.set('query', 'ruby ra');
  this.$('input').keydown();
  this.$('input').trigger(pressEnterKey);

  assert.equal(this.$('input').val().trim(), '');
  assert.equal(this.$('.dropdown-menu li').length, 0);
});

test('it selects the skill when hitting comma', function(assert) {
  assert.expect(2);
  this.render(hbs`{{user-skills-input query=query}}`);

  this.$('input').focus();
  this.set('query', 'ruby ra');
  this.$('input').trigger(pressCommaKey);

  assert.equal(this.$('input').val().trim(), '');
  assert.equal(this.$('.dropdown-menu li').length, 0);
});

test('it selects the skill when clicking it', function(assert) {
  assert.expect(2);
  this.render(hbs`{{user-skills-input query=query}}`);

  this.$('input').focus();
  this.set('query', 'ruby ra');
  this.$('input').keydown();
  this.$('.dropdown-menu li').trigger('mousedown');

  assert.equal(this.$('input').val().trim(), '');
  assert.equal(this.$('.dropdown-menu li').length, 0);
});

test('it does nothing when there are no results', function(assert) {
  assert.expect(1);

  let emptyStore = Ember.Service.extend({
    query () {
      return Ember.RSVP.resolve([]);
    }
  });

  this.register('service:store', emptyStore);

  this.render(hbs`{{user-skills-input query=query}}`);

  this.$('input').focus();
  this.set('query', 'ruby ra');
  this.$('input').keydown();
  this.$('input').trigger(pressEnterKey);

  assert.equal(this.$('input').val().trim(), 'ruby ra');
});
