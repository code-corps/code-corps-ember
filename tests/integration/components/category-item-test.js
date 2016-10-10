import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import wait from 'ember-test-helpers/wait';

const {
  getOwner,
  Object,
  run,
  RSVP,
  Service
} = Ember;

moduleForComponent('category-item', 'Integration | Component | category item', {
  integration: true,
  beforeEach() {
    mockUserCategory.set('categoryId', defaultCategoryId);
  }
});

let defaultCategoryId = 2;

let mockUserCategoriesService = Service.extend({
  findUserCategory(category) {
    if (category.id === mockUserCategory.get('categoryId')) {
      return mockUserCategory;
    }
  },
  addCategory(category) {
    return new RSVP.Promise((fulfill) => {
      run.next(() => {
        mockUserCategory.set('categoryId', category.get('id'));
        getOwner(this).lookup('service:user-categories').set('userCategories', [mockUserCategory]);
        fulfill();
      });
    });
  },
  removeCategory() {
    return new RSVP.Promise((fulfill, reject) => {
      run.next(() => {
        mockUserCategory.set('categoryId', null);
        getOwner(this).lookup('service:user-categories').set('userCategories', []);
        reject();
      });
    });
  }
});

let mockUserCategoriesServiceForErrors = Service.extend({
  findUserCategory(category) {
    if (category.id === mockUserCategory.get('categoryId')) {
      return mockUserCategory;
    }
  },
  addCategory() {
    return RSVP.reject();
  },
  removeCategory() {
    return RSVP.reject();
  }
});

let mockUserCategory = Object.create({
  id: 1,
  categoryId: defaultCategoryId,
  userId: 1
});

let unselectedCategory = Object.create({
  id: 1,
  name: 'Technology',
  slug: 'technology',
  description: 'You want to help technology.'
});

let selectedCategory = Object.create({
  id: 2,
  name: 'Society',
  slug: 'society',
  description: 'You want to help society.'
});

test('it works for selecting unselected categories', function(assert) {
  let done = assert.async();
  assert.expect(6);

  this.register('service:user-categories', mockUserCategoriesService);
  this.set('category', unselectedCategory);
  this.render(hbs`{{category-item category=category}}`);

  assert.ok(this.$('.category-icon').hasClass('technology'));
  assert.equal(this.$('.category-icon').hasClass('selected'), false);
  assert.equal(this.$('p').text().trim(), 'You want to help technology.');
  assert.equal(this.$('p').hasClass('selected'), false);
  assert.equal(this.$('button').text().trim(), 'Technology');

  this.$('button').click();

  wait().then(() => {
    assert.equal(this.$('.category-item').hasClass('selected'), true);
    done();
  });
});

test('it works for removing selected categories', function(assert) {
  let done = assert.async();
  assert.expect(4);

  this.register('service:user-categories', mockUserCategoriesService);
  this.set('category', selectedCategory);
  this.render(hbs`{{category-item category=category}}`);

  assert.equal(this.$('.category-icon').hasClass('selected'), true);
  assert.equal(this.$('p').hasClass('selected'), true);
  assert.equal(this.$('button').text().trim(), 'Society');

  this.$('button').click();

  wait().then(() => {
    assert.equal(this.$('.category-item').hasClass('selected'), false);
    done();
  });
});

test('it creates a flash message on an error when adding', function(assert) {
  let done = assert.async();
  assert.expect(7);

  this.register('service:user-categories', mockUserCategoriesServiceForErrors);
  this.set('category', unselectedCategory);

  let mockFlashMessages = Service.extend({
    clearMessages() {
      assert.ok(true);
    },
    add(object) {
      assert.ok(object.message.indexOf(unselectedCategory.name) !== -1);
      assert.equal(object.type, 'danger');
      assert.equal(object.fixed, true);
      assert.equal(object.sticky, false);
      assert.equal(object.timeout, 5000);
    }
  });
  this.register('service:flash-messages', mockFlashMessages);

  this.render(hbs`{{category-item category=category}}`);

  this.$('button').click();
  wait().then(() => {
    assert.notOk(this.$('span').hasClass('button-spinner'));
    done();
  });
});

test('it creates a flash message on an error when removing', function(assert) {
  let done = assert.async();
  assert.expect(7);

  this.register('service:user-categories', mockUserCategoriesServiceForErrors);
  this.set('category', selectedCategory);

  let mockFlashMessages = Service.extend({
    clearMessages() {
      assert.ok(true);
    },
    add(object) {
      assert.ok(object.message.indexOf(selectedCategory.name) !== -1);
      assert.equal(object.type, 'danger');
      assert.equal(object.fixed, true);
      assert.equal(object.sticky, false);
      assert.equal(object.timeout, 5000);
    }
  });
  this.register('service:flash-messages', mockFlashMessages);

  this.render(hbs`{{category-item category=category}}`);

  this.$('button').click();
  wait().then(() => {
    assert.notOk(this.$('span').hasClass('button-spinner'));
    done();
  });
});

test('it sets and unsets loading state when adding', function(assert) {
  let done = assert.async();
  assert.expect(3);

  this.register('service:user-categories', mockUserCategoriesService);
  this.set('category', unselectedCategory);

  this.render(hbs`{{category-item category=category}}`);

  this.$('button').click();
  assert.ok(this.$('span').hasClass('button-spinner'));
  assert.notOk(this.$('span').hasClass('check-area'));

  wait().then(() => {
    assert.notOk(this.$('span').hasClass('button-spinner'));
    done();
  });
});

test('it sets and unsets loading state when removing', function(assert) {
  let done = assert.async();
  this.register('service:user-categories', mockUserCategoriesService);
  assert.expect(3);

  this.set('category', selectedCategory);

  this.render(hbs`{{category-item category=category}}`);

  this.$('button').click();
  assert.ok(this.$('span').hasClass('button-spinner'));
  assert.notOk(this.$('span').hasClass('check-area'));

  wait().then(() => {
    assert.notOk(this.$('span').hasClass('button-spinner'));
    done();
  });
});
