import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import stubService from 'code-corps-ember/tests/helpers/stub-service';

const { K } = Ember;

moduleForComponent('categories-list', 'Integration | Component | categories list', {
  integration: true
});

test('it renders the categories and sorts them by name', function(assert) {
  assert.expect(5);

  stubService(this, 'user-categories', { findUserCategory: K });

  let categories = [
    {
      id: 2,
      name: 'Society'
    },
    {
      id: 1,
      name: 'Zoology'
    },
    {
      id: 3,
      name: 'Alphabets'
    }
  ];

  this.set('categories', categories);
  this.render(hbs`{{categories-list categories=categories}}`);

  assert.equal(this.$('.categories-list').length, 1);
  assert.equal(this.$('.category-item').length, 3);
  assert.equal(this.$('.category-item:eq(0)').text().trim(), 'Alphabets');
  assert.equal(this.$('.category-item:eq(1)').text().trim(), 'Society');
  assert.equal(this.$('.category-item:eq(2)').text().trim(), 'Zoology');
});
