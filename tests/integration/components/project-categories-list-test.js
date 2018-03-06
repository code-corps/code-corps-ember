import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'code-corps-ember/tests/helpers/stub-service';

import pageComponent from 'code-corps-ember/tests/pages/components/project-categories-list';
import PageObject from 'ember-cli-page-object';

let page = PageObject.create(pageComponent);

moduleForComponent('project-categories-list', 'Integration | Component | project categories list', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

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

test('it renders the categories and sorts them by name', function(assert) {
  assert.expect(4);

  stubService(this, 'user-categories', { findUserCategory() {} });

  this.set('categories', categories);

  this.render(hbs`{{project-categories-list categories=categories}}`);

  // trigger lazy rendering of tooltips
  [0, 1, 2].forEach((index) => page.projectCategoryItems.objectAt(index).mouseenter());
  assert.equal(page.projectCategoryItems.length, 3);
  assert.equal(page.projectCategoryItems.objectAt(0).tooltip.text, 'Alphabets');
  assert.equal(page.projectCategoryItems.objectAt(1).tooltip.text, 'Society');
  assert.equal(page.projectCategoryItems.objectAt(2).tooltip.text, 'Zoology');
});
