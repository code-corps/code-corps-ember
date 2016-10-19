import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pager-control', 'Integration | Component | pager control', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{pager-control}}`);
  assert.equal(this.$('.pager-control').length, 1, 'The element is rendered');
});

test('it renders the correct control elements', function(assert) {
  this.set('options', {
    pageSize: 5,
    totalRecords: 43,
    currentPage: 3,
    totalPages: 5
  });

  this.render(hbs`{{pager-control options=options}}`);

  assert.equal(this.$('.next-page').length, 1, 'It renders the next page button');
  assert.equal(this.$('.previous-page').length, 1, 'It renders the previous page button');

  assert.equal(this.$('.page').length, 5, 'Total pages is > 5, so 5 page buttons are rendered');
  assert.equal(this.$('.page:first').text().trim(), '1', 'First rendered page button is page 1');
  assert.equal(this.$('.page:last').text().trim(), '5', 'Last rendered page button is page 5');
});

test('If there is less than 5 pages of records in total, it only renders buttons for those pages', function(assert) {
  this.set('options', {
    pageSize: 5,
    totalRecords: 7,
    currentPage: 1,
    totalPages: 2
  });

  this.render(hbs`{{pager-control options=options}}`);

  assert.equal(this.$('.page').length, 2, 'Only two pages total are rendered');
  assert.equal(this.$('.page.1').length, 1, 'Page 1 is rendered');
  assert.equal(this.$('.page.2').length, 1, 'Page 2 is rendered');
});

test('If we are currently on the first page, the previous page button does not render', function(assert) {
  this.set('options', {
    pageSize: 5,
    totalRecords: 7,
    currentPage: 1,
    totalPages: 2
  });

  this.render(hbs`{{pager-control options=options}}`);

  assert.equal(this.$('.previous-page').length, 0, 'The button does not render');
});

test('If we are currently on the only page with some records, nothing renders', function(assert) {
  this.set('options', {
    pageSize: 5,
    totalRecords: 5,
    currentPage: 1,
    totalPages: 1
  });

  this.render(hbs`{{pager-control options=options}}`);

  assert.equal(this.$('.pagination').length, 0, 'Nothing renders');
});

test('If we are currently on the only page with no records, nothing renders', function(assert) {
  this.set('options', {
    pageSize: 5,
    totalRecords: 0,
    currentPage: 1,
    totalPages: 0
  });

  this.render(hbs`{{pager-control options=options}}`);

  assert.equal(this.$('.pagination').length, 0, 'Nothing renders');
});

test('If we are currently on the last page, the next page button does not render', function(assert) {
  this.set('options', {
    pageSize: 5,
    totalRecords: 7,
    currentPage: 2,
    totalPages: 2
  });

  this.render(hbs`{{pager-control options=options}}`);

  assert.equal(this.$('.next-page').length, 0, 'The button does not render');
});
