import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  Object,
  run,
  Service
} = Ember;

moduleForComponent('project-category-item', 'Integration | Component | project category item', {
  integration: true,
  beforeEach() {
    this.register('service:user-categories', mockUserCategoriesService);
  }
});

let mockUserCategoriesService = Service.extend({
  findUserCategory(category) {
    if (category.id === mockUserCategory.get('categoryId')) {
      return mockUserCategory;
    }
  }
});

let mockUserCategory = Object.create({
  id: 1,
  categoryId: 2,
  userId: 1
});

test('it works for unselected categories', function(assert) {
  assert.expect(6);

  let category = {
    id: 1,
    name: 'Technology',
    slug: 'technology',
    description: 'You want to help technology.'
  };

  this.set('category', category);
  this.render(hbs`{{project-category-item category=category}}`);

  assert.ok(this.$('.interest-icon').hasClass('technology'));
  assert.notOk(this.$('.interest-icon').hasClass('selected'));
  assert.ok(this.$('li').hasClass('ember-tooltip-target'));
  assert.equal(this.$('.ember-tooltip').text().trim(), 'Technology');
  assert.equal(this.$('.ember-tooltip').attr('aria-hidden'), 'true');

  run(() => {
    this.$('li').trigger('mouseenter');
  });
  assert.equal(this.$('.ember-tooltip').attr('aria-hidden'), 'false');
});

test('it works for selected categories', function(assert) {
  assert.expect(6);

  let category = {
    id: 2,
    name: 'Society',
    slug: 'society',
    description: 'You want to help society.'
  };

  this.set('category', category);
  this.render(hbs`{{project-category-item category=category}}`);

  assert.ok(this.$('.interest-icon').hasClass('society'));
  assert.ok(this.$('.interest-icon').hasClass('selected'));
  assert.ok(this.$('li').hasClass('ember-tooltip-target'));
  assert.equal(this.$('.ember-tooltip').text().trim(), 'Society');
  assert.equal(this.$('.ember-tooltip').attr('aria-hidden'), 'true');

  run(() => {
    this.$('li').trigger('mouseenter');
  });
  assert.ok(this.$('.ember-tooltip').attr('aria-hidden'), 'false');
});
