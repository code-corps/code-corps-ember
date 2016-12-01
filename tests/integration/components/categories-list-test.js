import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';

import categoriesListComponent from '../../pages/components/categories-list';

const { K } = Ember;

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
  page.render(hbs`{{categories-list categories=categories}}`);

  assert.equal(page.items().count, 3);
  assert.equal(page.items(0).name, 'Alphabets');
  assert.equal(page.items(1).name, 'Society');
  assert.equal(page.items(2).name, 'Zoology');
});
