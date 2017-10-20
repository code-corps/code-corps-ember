import { get } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import projectCategoryItemComponent from 'code-corps-ember/tests/pages/components/project-category-item';
import PageObject from 'ember-cli-page-object';

let page = PageObject.create(projectCategoryItemComponent);

let mockUserCategoriesService = {
  findUserCategory(category) {
    if (category.id === get(mockUserCategory, 'categoryId')) {
      return mockUserCategory;
    }
  }
};

function renderPage() {
  page.render(hbs`{{project-category-item category=category}}`);
}

moduleForComponent('project-category-item', 'Integration | Component | project category item', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    stubService(this, 'user-categories', mockUserCategoriesService);
  },
  afterEach() {
    page.removeContext();
  }
});

let mockUserCategory = {
  id: 1,
  categoryId: 2,
  userId: 1
};

test('it works for unselected categories', function(assert) {
  assert.expect(6);

  let category = {
    id: 1,
    name: 'Technology',
    slug: 'technology',
    description: 'You want to help technology.'
  };

  this.set('category', category);
  renderPage();

  assert.ok(page.linkIcon.classContains('technology'), 'Dynamic category class is properly bound.');
  assert.notOk(page.linkIcon.classContains('selected'), 'Icon is unselected.');
  page.mouseenter(); // trigger the tooltip for lazy rendering
  page.mouseleave(); // hide the tooltip
  assert.ok(page.isTooltipTarget, 'Component works as a tooltip target.');
  assert.equal(page.tooltip.text, 'Technology', 'Dynamic tooltip text is properly bound.');
  assert.ok(page.tooltip.isAriaHidden, 'Aria attribute is bound as hidden by default.');
  page.mouseenter();
  assert.ok(page.tooltip.isAriaVisible, 'Aria attribute is not hidden on hover.');
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
  renderPage();

  assert.ok(page.linkIcon.classContains('society'));
  assert.ok(page.linkIcon.classContains('selected'));
  page.mouseenter(); // trigger the tooltip for lazy rendering
  page.mouseleave(); // hide the tooltip
  assert.ok(page.isTooltipTarget);
  assert.equal(page.tooltip.text, 'Society');
  assert.ok(page.tooltip.isAriaHidden);
  page.mouseenter();
  assert.ok(page.tooltip.isAriaVisible);
});
