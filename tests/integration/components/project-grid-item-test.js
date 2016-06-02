import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage from '../../helpers/setup-mirage-for-integration';

moduleForComponent('project-grid-item', 'Integration | Component | project grid item', {
  integration: true,
  setup() {
    startMirage(this.container);
  }
});

test('it renders', function(assert) {
  let project = server.create('project');
  let organization = server.create('organization');
  let user = server.create('user');
  let categories = [
    {
      name: 'Society',
      slug: 'society',
    },
    {
      name: 'Technology',
      slug: 'technology',
    },
    {
      name: 'Politics',
      slug: 'politics',
    },
  ];

  let mockedProject = {
    id: project.id,
    title: project.title,
    description: project.description,
    iconLargeUrl: project.iconLargeUrl,
    organization: {
      name: organization.name,
      members: [user]
    },
    categories: categories,
  };

  this.set('project', mockedProject);
  this.render(hbs`{{project-grid-item project=project}}`);

  assert.equal(this.$('.icon-container img').attr('src'), project.iconLargeUrl);
  assert.equal(this.$('.details-container h4').text().trim(), project.title);
  assert.equal(this.$('p.organization').text().trim(), `by ${organization.name}`);
  assert.equal(this.$('ul.categories li').length, 3);
  assert.equal(this.$('p.description').text().trim(), project.description);
  assert.equal(this.$('.project-grid-item-skills-list').length, 1);
  assert.equal(this.$('ul.members li').length, 1);
  assert.equal(this.$('ul.members li:first img').attr('src'), user.photoThumbUrl);
});
