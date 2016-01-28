import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('project-item', 'Integration | Component | project item', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{project-item}}`);

  assert.equal(this.$('.project-item').length, 1, 'The component\'s element is rendered');
});

test('it renders the correct UI elements', function(assert) {
  this.set('project', { title: 'A project' });
  this.render(hbs`{{project-item project=project}}`);

  assert.equal(this.$('.project-item .title').length, 1, 'The project title is rendered');
  assert.equal(this.$('.project-item .title').text().trim(), 'A project', 'The project title is properly bound');
});
