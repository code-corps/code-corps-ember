import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import wait from 'ember-test-helpers/wait';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import { getFlashMessageCount, getFlashMessageAt } from 'code-corps-ember/tests/helpers/flash-message';

const {
  getOwner,
  Object,
  run,
  RSVP
} = Ember;

moduleForComponent('category-item', 'Integration | Component | category item', {
  integration: true,
  beforeEach() {
    mockUserCategory.set('categoryId', defaultCategoryId);
    getOwner(this).lookup('service:flash-messages').registerTypes(['danger']);
  }
});

let defaultCategoryId = 2;

let mockUserCategoriesService = {
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
};

let mockUserCategoriesServiceForErrors = {
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
};

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

  stubService(this, 'user-categories', mockUserCategoriesService);
  this.set('category', unselectedCategory);
  this.render(hbs`{{category-item category=category}}`);

  assert.ok(this.$('.category-icon').hasClass('technology'));
  assert.notOk(this.$('.category-icon').hasClass('selected'));
  assert.equal(this.$('p').text().trim(), 'You want to help technology.');
  assert.notOk(this.$('p').hasClass('selected'));
  assert.equal(this.$('button').text().trim(), 'Technology');

  this.$('button').click();

  wait().then(() => {
    assert.ok(this.$('.category-item').hasClass('selected'));
    done();
  });
});

test('it works for removing selected categories', function(assert) {
  let done = assert.async();
  assert.expect(4);

  stubService(this, 'user-categories', mockUserCategoriesService);
  this.set('category', selectedCategory);
  this.render(hbs`{{category-item category=category}}`);

  assert.ok(this.$('.category-icon').hasClass('selected'));
  assert.ok(this.$('p').hasClass('selected'));
  assert.equal(this.$('button').text().trim(), 'Society');

  this.$('button').click();

  wait().then(() => {
    assert.notOk(this.$('.category-item').hasClass('selected'));
    done();
  });
});

test('it creates a flash message on an error when adding', function(assert) {
  let done = assert.async();
  assert.expect(4);

  stubService(this, 'user-categories', mockUserCategoriesServiceForErrors);
  this.set('category', unselectedCategory);

  this.render(hbs`{{category-item category=category}}`);

  this.$('button').click();
  wait().then(() => {
    assert.notOk(this.$('span').hasClass('button-spinner'));

    assert.equal(getFlashMessageCount(this), 1, 'One message is shown');

    let flash = getFlashMessageAt(0, this);
    let actualOptions = flash.getProperties('fixed', 'sticky', 'timeout', 'type');
    let expectedOptions = { fixed: true, sticky: false, timeout: 5000, type: 'danger' };
    assert.deepEqual(actualOptions, expectedOptions, 'Proper message was set');
    assert.ok(flash.message.indexOf(unselectedCategory.name) !== -1, 'Message text includes the category name');

    done();
  });
});

test('it creates a flash message on an error when removing', function(assert) {
  let done = assert.async();
  assert.expect(4);

  stubService(this, 'user-categories', mockUserCategoriesServiceForErrors);
  this.set('category', selectedCategory);

  this.render(hbs`{{category-item category=category}}`);

  this.$('button').click();
  wait().then(() => {
    assert.notOk(this.$('span').hasClass('button-spinner'));

    assert.equal(getFlashMessageCount(this), 1, 'One message is shown');

    let flash = getFlashMessageAt(0, this);
    let actualOptions = flash.getProperties('fixed', 'sticky', 'timeout', 'type');
    let expectedOptions = { fixed: true, sticky: false, timeout: 5000, type: 'danger' };
    assert.deepEqual(actualOptions, expectedOptions, 'Proper message was set');
    assert.ok(flash.message.indexOf(selectedCategory.name) !== -1, 'Message text includes the category name');

    done();
  });
});

test('it sets and unsets loading state when adding', function(assert) {
  let done = assert.async();
  assert.expect(3);

  stubService(this, 'user-categories', mockUserCategoriesService);
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
  stubService(this, 'user-categories', mockUserCategoriesService);
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
