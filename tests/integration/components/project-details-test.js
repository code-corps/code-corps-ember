import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('project-details', 'Integration | Component | project details', {
  integration: true
});

test('it renders title', function(assert) {
  let project = { title: 'Test title' };
  this.set('project', project);

  this.render(hbs`{{project-details project=project}}`);

  assert.equal(this.$('.project__header__title').text().trim(), project.title, 'Title is rendered');
});
