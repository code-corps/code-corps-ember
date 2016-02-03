import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage from '../../helpers/setup-mirage-for-integration';

moduleForComponent('project-details', 'Integration | Component | project details', {
  integration: true,
  setup() {
    startMirage(this.container);
  }
});

function mockProject() {
  // the only way I could figure out to use mirage
  // to create a project
  // just doing `let project = server.schema.project.create(attrs)`
  // gives us a proper project object, but then ember clashes with it somewhere,
  // trying to redefine its properties
  // TODO: figure out how to do it better
  let project = {
    id: 1,
    title: 'CodeCorps',
    description: 'A test project',
    iconThumbUrl: 'image-url.com'
  };
  server.schema.project.create(project);
  return project;
}

test('it renders', function(assert) {
  let project = mockProject();
  this.set('project', project);

  this.render(hbs`{{project-details project=project}}`);

  assert.equal(this.$('.project-details').length, 1);
});

test('it renders basic project information', function(assert) {
  let project = mockProject();
  this.set('project', project);

  this.render(hbs`{{project-details project=project}}`);

  assert.equal(this.$('.title').text().trim(), 'CodeCorps', 'Title is rendered');
  assert.equal(this.$('.description').text().trim(), 'A test project', 'Description is rendered');
  assert.equal(this.$('.icon').attr('src'), 'image-url.com', 'Image element is rendered');
});