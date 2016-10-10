import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { Object } = Ember;

moduleForComponent('task-filter-dropdown', 'Integration | Component | task filter dropdown', {
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
  this.render(hbs`{{task-filter-dropdown}}`);
  assert.equal(this.$('.dropdown-menu').length, 1, 'Component\'s element is rendered');
});

test('it renders all required elements', function(assert) {
  this.set('selectedTypes', types);
  this.render(hbs`{{task-filter-dropdown field='type' selectedFilters=selectedTypes}}`);

  let [firstType] = types;

  assert.equal(this.$('.dropdown-header p').text(), 'Filter by type ×', 'Header text renders');
  assert.equal(this.$('.dropdown-header a.close').length, 1, 'Close link renders');
  assert.equal(this.$('.dropdown-menu li').length, types.length, 'Right number of list items render');
  assert.equal(this.$('.dropdown-menu li:eq(0) a').hasClass(firstType.get('slug')), true, 'Link class renders');
  assert.equal(this.$('.dropdown-menu li:eq(0) a').hasClass('selected'), true, 'List item selected class renders');
  assert.equal(this.$('.dropdown-menu li:eq(0) a').text(), firstType.get('name'), 'Link text renders');
});

test('it sends filterByType action with the right type when clicking a link', function(assert) {
  assert.expect(1);

  this.render(hbs`{{task-filter-dropdown selectedFilters=selectedTypes filterBy="filterByType"}}`);
  this.set('selectedTypes', types);

  let [firstType] = types;

  this.on('filterByType', function(type) {
    assert.equal(type, firstType);
  });

  this.$('.dropdown-menu li:eq(0) a').click();
});

test('it sends the hide action when clicking close', function(assert) {
  assert.expect(2); // twice because clicking anywhere will send the action

  this.render(hbs`{{task-filter-dropdown hide="hide"}}`);

  this.on('hide', function() {
    assert.ok(true, 'The hide action was called');
  });

  this.$('a.close').click();
});

test('it sends the hide action when clicking an item', function(assert) {
  assert.expect(1);

  this.render(hbs`{{task-filter-dropdown selectedFilters=selectedTypes hide="hide"}}`);
  this.set('selectedTypes', types);

  this.on('hide', function() {
    assert.ok(true, 'The hide action was called');
  });

  this.$('.dropdown-menu li:eq(0) a').click();
});
