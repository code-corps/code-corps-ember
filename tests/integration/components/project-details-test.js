import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage from '../../helpers/setup-mirage-for-integration';

moduleForComponent('project-details', 'Integration | Component | project details', {
  integration: true,
  setup() {
    startMirage(this.container);
  }
});

test('it renders', function(assert) {
  let project = server.create('project');
  this.set('project', project);

  this.render(hbs`{{project-details project=project}}`);

  assert.equal(this.$('.project-details').length, 1);
});

test('when expanded', function(assert) {
  let project = server.create('project');
  this.set('project', project);

  this.render(hbs`{{project-details project=project expanded=true}}`);

  assert.equal(this.$('.title').text().trim(), project.title, 'Title is rendered');
  assert.equal(this.$('.description').text().trim(), project.description, 'Description is rendered');
});

test('when not expanded', function(assert) {
  let project = server.create('project');
  this.set('project', project);

  this.render(hbs`{{project-details project=project}}`);

  assert.equal(this.$('.title').text().trim(), project.title, 'Title is rendered');
  assert.equal(this.$('.description').length, 0, 'Hides description');
});
