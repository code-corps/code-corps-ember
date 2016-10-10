import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { Object } = Ember;

moduleForComponent('task-filter-type', 'Integration | Component | task filter type', {
  integration: true
});

let types = [
  Object.create({
    name: 'Tasks',
    param: 'task',
    slug: 'tasks',
    selected: true
  }),
  Object.create({
    name: 'Issues',
    param: 'issue',
    slug: 'issues',
    selected: false
  }),
  Object.create({
    name: 'Ideas',
    param: 'idea',
    slug: 'ideas',
    selected: false
  })
];

test('it renders', function(assert) {
  this.render(hbs`{{task-filter-type}}`);
  assert.equal(this.$('.dropdown').length, 1, 'Component\'s element is rendered');
  assert.equal(this.$('.dropdown').hasClass('menu-hidden'), true, 'Dropdown is hidden');
});

test('it renders all required elements', function(assert) {
  this.render(hbs`{{task-filter-type selectedTypes=selectedTypes}}`);

  assert.equal(this.$('button').text(), 'Type', 'Button text renders');
  assert.equal(this.$('.dropdown-menu').length, 1, 'Dropdown renders');
});

test('it sends filterByType action with the right type when clicking a link', function(assert) {
  assert.expect(1);

  this.render(hbs`{{task-filter-type selectedTypes=selectedTypes filterByType="filterByType"}}`);
  this.set('selectedTypes', types);

  let [firstType] = types;

  this.on('filterByType', function(type) {
    assert.equal(type, firstType);
  });

  this.$('button').click();
  this.$('.dropdown-menu li:eq(0) a').click();
});

test('it toggles the menu when clicking the button', function(assert) {
  assert.expect(2);

  this.render(hbs`{{task-filter-type}}`);

  this.$('button').click();
  assert.equal(this.$('button').hasClass('active'), 1, 'Button is active');
  assert.equal(this.$('.dropdown').hasClass('menu-visible'), true, 'Dropdown is visible');
});
