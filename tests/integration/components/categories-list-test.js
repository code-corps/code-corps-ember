import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('categories-list', 'Integration | Component | categories list', {
  integration: true
});

test('it renders the categories and sorts them by name', function(assert) {
  assert.expect(7);

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
    },
  ];

  this.set('categories', categories);
  this.set('addCategory', (clickedCategory) => {
    assert.deepEqual(clickedCategory, categories[2]);
    return new Ember.RSVP.Promise((fulfill) => {
      Ember.run.next(() => {
        fulfill();
      });
    });
  });
  this.set('removeCategory', (clickedCategory) => {
    assert.deepEqual(clickedCategory, categories[2]);
    return new Ember.RSVP.Promise((fulfill) => {
      Ember.run.next(() => {
        fulfill();
      });
    });
  });
  this.render(hbs`{{categories-list categories=categories addCategory=addCategory removeCategory=removeCategory}}`);

  assert.equal(this.$('.categories-list').length, 1);
  assert.equal(this.$('.category-item').length, 3);
  assert.equal(this.$('.category-item:eq(0)').text().trim(), 'Alphabets');
  assert.equal(this.$('.category-item:eq(1)').text().trim(), 'Society');
  assert.equal(this.$('.category-item:eq(2)').text().trim(), 'Zoology');

  this.$('.category-item:eq(0) button').click();
  this.$('.category-item:eq(0) button').click();
});
