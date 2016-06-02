import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('category-item', 'Integration | Component | category item', {
  integration: true,
  beforeEach() {
    this.container.registry.register('service:user-categories', mockUserCategoriesService);
  },
});

let mockUserCategoriesService = Ember.Service.extend({
  hasCategory(category) {
    return category.id === mockUserCategory.get('categoryId');
  },
});

let mockUserCategory = Ember.Object.create({
  id: 1,
  categoryId: 2,
  userId: 1,
});

test('it works for selecting unselected categories', function(assert) {
  assert.expect(6);

  let category = {
      id: 1,
      name: 'Technology',
      slug: 'technology',
      description: 'You want to help technology.',
  };

  this.set('category', category);
  this.set('addCategory', (clickedCategory) => {
    assert.deepEqual(clickedCategory, category);
  });
  this.render(hbs`{{category-item category=category addCategory=(action addCategory)}}`);

  assert.ok(this.$('.category-icon').hasClass('technology'));
  assert.equal(this.$('.category-icon').hasClass('selected'), false);
  assert.equal(this.$('p').text().trim(), 'You want to help technology.');
  assert.equal(this.$('p').hasClass('selected'), false);
  assert.equal(this.$('button').text().trim(), 'Technology');

  this.$('button').click();
});

test('it works for removing selected categories', function(assert) {
  assert.expect(4);

  let category = {
      id: 2,
      name: 'Society',
      slug: 'society',
      description: 'You want to help society.',
  };

  this.set('category', category);
  this.set('removeCategory', (clickedCategory) => {
    assert.deepEqual(clickedCategory, category);
  });
  this.render(hbs`{{category-item category=category removeCategory=(action removeCategory)}}`);

  assert.equal(this.$('.category-icon').hasClass('selected'), true);
  assert.equal(this.$('p').hasClass('selected'), true);
  assert.equal(this.$('button').text().trim(), 'Society');

  this.$('button').click();
});
