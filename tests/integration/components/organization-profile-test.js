import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('organization-profile', 'Integration | Component | organization profile', {
  integration: true,
  beforeEach() {
    this.register('service:credentials', Ember.Service);
  }
});

let members = [
  { id: 1, },
  { id: 2, },
  { id: 3, }
];

let memberships = members.map((member) => {
  return { id: member.id, member: member };
});

let projects = [
  { id: 1, },
  { id: 2, },
  { id: 3, }
];

let organization = {
  name: "Test Organization",
  description: "Test organization description",
  slug: 'test_organization',
  organizationMemberships: memberships,
  projects: projects,
};

test('it renders all its elements', function(assert) {
  assert.expect(9);

  this.set('organization', organization);


  this.render(hbs`{{organization-profile organization=organization}}`);

  assert.equal(this.$('.organization-profile').length, 1, 'The component itself renders');
  assert.equal(this.$('.organization-header').length, 1, 'The header component renders');
  assert.ok(this.$('.organization-header').hasClass('expanded'), 'The header is expanded');
  assert.equal(this.$('.organization-menu').length, 1, 'The menu component renders');
  assert.equal(this.$('.project-list').length, 1, 'The projects list renders');
  assert.equal(this.$('.organization-members').length, 1, 'The members component renders');

  // Test components populate with right data
  assert.equal(this.$('.organization-header h2').text().trim(), 'Test Organization', 'The header has data');
  assert.equal(this.$('.project-list .project-item').length, 3, 'The projects render');
  assert.equal(this.$('.organization-members li').length, 3, 'The members render');
});
