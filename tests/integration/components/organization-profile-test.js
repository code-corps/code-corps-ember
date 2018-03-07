import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/organization-profile';

let page = PageObject.create(component);

moduleForComponent('organization-profile', 'Integration | Component | organization profile', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

let projects = [
  { id: 1 },
  { id: 2 },
  { id: 3 }
];

let organization = {
  name: 'Test Organization',
  description: 'Test organization description',
  slug: 'test_organization',
  projects
};

test('it renders all its elements', function(assert) {
  assert.expect(6);

  this.set('organization', organization);

  this.render(hbs`{{organization-profile organization=organization}}`);

  assert.ok(page.organizationHeader.isVisible, 'The header component renders');
  assert.ok(page.organizationHeader.isExpanded, 'The header is expanded');
  assert.ok(page.organizationMenu.isVisible, 'The menu component renders');
  assert.ok(page.projectList.isVisible, 'The projects list renders');

  // Test components populate with right data
  assert.equal(page.organizationHeader.title.text, 'Test Organization', 'The header has data');
  assert.equal(page.projectList.items.length, 3, 'The projects render');
});
