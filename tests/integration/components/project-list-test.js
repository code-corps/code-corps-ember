import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('project-list', 'Integration | Component | project list', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{project-list}}`);

  assert.equal(this.$('.project-list').length, 1, 'The component\'s element is rendered');
});

test('it renders an item for each project in the list', function(assert) {
  assert.expect(1);

  let mockProjects = [];
  for (let i = 0; i < 3; i++) {
    mockProjects.push({ id: i, title: `Project ${i}`, slug: `project_${i}` });
  }

  this.set('projects', mockProjects);
  this.render(hbs`{{project-list projects=projects}}`);

  assert.equal(this.$('.project-item').length, 3, 'The correct number of project-items is rendered');
});
