import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('page-button', 'Integration | Component | page button', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{page-button}}`);

  assert.equal(this.$('.page-button').length, 1, 'The components element is rendered');
});

test('it renders the page number', function(assert) {
  this.set('page', 2);
  this.render(hbs`{{page-button page=page}}`);

  assert.equal(this.$('.page-button').text().trim(), '2', 'The correct page number is rendered');
});

test('it renders a .current class on the element, if the page is currently active', function(assert) {
  this.set('page', 2);
  this.set('currentPage', 2);
  this.render(hbs`{{page-button page=page currentPage=currentPage}}`);


  assert.equal(this.$('.page-button.current').length, 1, 'The component is rendred with the .current class');
});

test('it renders the page number as class on the element', function(assert) {
  this.set('page', 2);
  this.render(hbs`{{page-button page=page}}`);

  assert.equal(this.$('.page-button.2').length, 1, 'The correct page number is rendered as class');
});

test('it triggers an action on click, with page number as parameter', function(assert) {
  this.set('page', 2);

  assert.expect(1);
  this.on('clicked', function(number) {
    assert.equal(number, 2, 'Correct parameter was passed in.');
  });

  this.render(hbs`{{page-button page=page action='clicked'}}`);

  this.$('.page-button').click();
});
