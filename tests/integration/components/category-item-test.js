import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import wait from 'ember-test-helpers/wait';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import { getFlashMessageCount, getFlashMessageAt } from 'code-corps-ember/tests/helpers/flash-message';

import pageComponent from 'code-corps-ember/tests/pages/components/category-item';
import PageObject from 'ember-cli-page-object';

let page = PageObject.create(pageComponent);

const {
  getOwner,
  get,
  getProperties,
  set,
  run,
  RSVP
} = Ember;

function renderPage() {
  page.render(hbs`{{category-item category=category}}`);
}

moduleForComponent('category-item', 'Integration | Component | category item', {
  integration: true,
  beforeEach() {
    set(mockUserCategory, 'categoryId', defaultCategoryId);
    getOwner(this).lookup('service:flash-messages').registerTypes(['danger']);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

let defaultCategoryId = 2;

let mockUserCategoriesService = {
  findUserCategory(category) {
    if (category.id === get(mockUserCategory, 'categoryId')) {
      return mockUserCategory;
    }
  },
  addCategory(category) {
    return new RSVP.Promise((fulfill) => {
      run.next(() => {
        set(mockUserCategory, 'categoryId', get(category, 'id'));
        let userCategoriesService = getOwner(this).lookup('service:user-categories');
        set(userCategoriesService, 'userCategories', [mockUserCategory]);
        fulfill();
      });
    });
  },
  removeCategory() {
    return new RSVP.Promise((fulfill, reject) => {
      run.next(() => {
        set(mockUserCategory, 'categoryId', null);
        let userCategoriesService = getOwner(this).lookup('service:user-categories');
        set(userCategoriesService, 'userCategories', []);
        reject();
      });
    });
  }
};

let mockUserCategoriesServiceForErrors = {
  findUserCategory(category) {
    if (category.id === get(mockUserCategory, 'categoryId')) {
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

let mockUserCategory = {
  id: 1,
  categoryId: defaultCategoryId,
  userId: 1
};

let unselectedCategory = {
  id: 1,
  name: 'Technology',
  slug: 'technology',
  description: 'You want to help technology.'
};

let selectedCategory = {
  id: 2,
  name: 'Society',
  slug: 'society',
  description: 'You want to help society.'
};

test('it works for selecting unselected categories', function(assert) {
  let done = assert.async();

  assert.expect(5);

  stubService(this, 'user-categories', mockUserCategoriesService);
  set(this, 'category', unselectedCategory);

  renderPage();

  assert.ok(page.icon.classContains('technology'), 'renders the right icon');
  assert.notOk(page.icon.classContains('technology--selected'), 'is not selected');
  assert.equal(page.description.text, 'You want to help technology.', 'Correct description is rendered.');
  assert.equal(page.button.text, 'Technology', 'Button text is rendered correctly');

  page.button.click();

  wait().then(() => {
    assert.ok(page.icon.classContains('technology--selected'), 'is selected');
    done();
  });
});

test('it works for removing selected categories', function(assert) {
  let done = assert.async();

  assert.expect(3);

  stubService(this, 'user-categories', mockUserCategoriesService);
  this.set('category', selectedCategory);

  renderPage();

  assert.ok(page.icon.classContains('society--selected'), 'is selected');
  assert.equal(page.button.text, 'Society', 'Button text is rendered correctly.');

  page.button.click();

  wait().then(() => {
    assert.ok(page.icon.classContains('society'), 'is unselected');
    done();
  });
});

test('it creates a flash message on an error when adding', function(assert) {
  let done = assert.async();

  assert.expect(4);

  stubService(this, 'user-categories', mockUserCategoriesServiceForErrors);
  this.set('category', unselectedCategory);

  renderPage();

  page.button.click();

  wait().then(() => {
    assert.ok(page.button.unchecked, 'Operation failed. Button is rendered as unchecked.');

    assert.equal(getFlashMessageCount(this), 1, 'One message is shown');

    let flash = getFlashMessageAt(0, this);
    let actualOptions = getProperties(flash, 'fixed', 'sticky', 'timeout', 'type');
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

  renderPage();

  page.button.click();

  wait().then(() => {
    assert.ok(page.button.checked, 'Operation failed. Button is rendered as checked.');

    assert.equal(getFlashMessageCount(this), 1, 'One message is shown.');

    let flash = getFlashMessageAt(0, this);
    let actualOptions = getProperties(flash, 'fixed', 'sticky', 'timeout', 'type');
    let expectedOptions = { fixed: true, sticky: false, timeout: 5000, type: 'danger' };
    assert.deepEqual(actualOptions, expectedOptions, 'Proper message was set');

    assert.ok(flash.message.indexOf(selectedCategory.name) !== -1, 'Message text includes the category name');

    done();
  });
});

test('it sets and unsets loading state when adding', function(assert) {
  let done = assert.async();

  assert.expect(2);

  stubService(this, 'user-categories', mockUserCategoriesService);
  this.set('category', unselectedCategory);

  renderPage();

  page.button.click();

  assert.ok(page.button.spinning, 'Button is rendering as busy.');

  wait().then(() => {
    assert.ok(page.button.checked, 'Operation worked. Button is rendered as checked.');
    done();
  });
});

test('it sets and unsets loading state when removing', function(assert) {
  let done = assert.async();

  assert.expect(2);

  stubService(this, 'user-categories', mockUserCategoriesService);
  this.set('category', selectedCategory);

  renderPage();

  page.button.click();

  assert.ok(page.button.spinning, 'Button is rendering as busy.');

  wait().then(() => {
    assert.ok(page.button.unchecked, 'Operation worked. Button is rendered as unchecked.');
    done();
  });
});
