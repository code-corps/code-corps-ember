import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';

import categoriesListComponent from '../../pages/components/categories-list';

let page = PageObject.create(categoriesListComponent);

moduleForComponent('categories-list', 'Integration | Component | categories list', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders the categories and sorts them by name', function(assert) {
  assert.expect(4);

  stubService(this, 'user-categories', { findUserCategory() {} });

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

  assert.equal(page.items.length, 3);
  assert.equal(page.items.objectAt(0).name, 'Alphabets');
  assert.equal(page.items.objectAt(1).name, 'Society');
  assert.equal(page.items.objectAt(2).name, 'Zoology');
});
