import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage from '../../helpers/setup-mirage-for-integration';

moduleForComponent('project-post-list', 'Integration | Component | project post list', {
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
  let project = mockProject(false);
  this.set('project', project);

  this.render(hbs`{{project-post-list project=project}}`);

  assert.equal(this.$('.project-post-list').length, 1);
});

test('it renders a message if the post count is 0', function(assert) {
  let project = mockProject(false);
  this.set('project', project);

  this.render(hbs`{{project-post-list project=project}}`);

  assert.equal(this.$('.no-posts').length, 1, 'The message is rendered');
});


