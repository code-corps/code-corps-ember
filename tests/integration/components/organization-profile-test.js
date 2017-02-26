import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/organization-profile';

let page = PageObject.create(component);

moduleForComponent('organization-profile', 'Integration | Component | organization profile', {
  integration: true,
  beforeEach() {
    stubService(this, 'credentials');
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

let members = [
  { id: 1 },
  { id: 2 },
  { id: 3 }
];

let memberships = members.map((member) => {
  return { id: member.id, member };
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
  organizationMemberships: memberships,
  projects
};

test('it renders all its elements', function(assert) {
  assert.expect(8);

  this.set('organization', organization);

  page.render(hbs`{{organization-profile organization=organization}}`);

  assert.ok(page.organizationHeader.isVisible, 'The header component renders');
  assert.ok(page.organizationHeader.isExpanded, 'The header is expanded');
  assert.ok(page.organizationMenu.isVisible, 'The menu component renders');
  assert.ok(page.projectList.isVisible, 'The projects list renders');
  assert.ok(page.organizationMembers.isVisible, 'The members component renders');

  // Test components populate with right data
  assert.equal(page.organizationHeader.title.text, 'Test Organization', 'The header has data');
  assert.equal(page.projectList.items().count, 3, 'The projects render');
  assert.equal(page.organizationMembers.members().count, 3, 'The members render');
});
