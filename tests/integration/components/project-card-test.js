import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage from '../../helpers/setup-mirage-for-integration';
import Ember from 'ember';

const {
  K,
  Service
} = Ember;

moduleForComponent('project-card', 'Integration | Component | project card', {
  integration: true,
  setup() {
    startMirage(this.container);
  }
});

test('it renders', function(assert) {
  let project = server.create('project');
  let organization = server.create('organization');
  let user = server.create('user');
  let membership = server.create('organization-membership', { member: user, organization });
  let projectCategory = server.create('project-category', { project });

  let mockedProject = {
    id: project.id,
    title: project.title,
    description: project.description,
    iconLargeUrl: project.iconLargeUrl,
    organization: {
      name: organization.name,
      organizationMemberships: [membership]
    },
    projectCategories: [projectCategory]
  };

  let mockUserCategoriesService = Service.extend({
    findUserCategory: K
  });
  this.register('service:user-categories', mockUserCategoriesService);

  this.set('project', mockedProject);
  this.render(hbs`{{project-card project=project}}`);

  assert.equal(this.$('.icon-container img').attr('src'), project.iconLargeUrl);
  assert.equal(this.$('.details-container h4').text().trim(), project.title);
  assert.equal(this.$('p.organization').text().trim(), `by ${organization.name}`);
  assert.equal(this.$('ul.categories li').length, 1);
  assert.equal(this.$('p.description').text().trim(), project.description);
  assert.equal(this.$('.project-card-skills').length, 1);
  assert.equal(this.$('ul.project-card-members li').length, 1);
  assert.equal(this.$('ul.project-card-members li:first img').attr('src'), user.photoThumbUrl);
});
