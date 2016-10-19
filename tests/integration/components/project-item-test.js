import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('project-item', 'Integration | Component | project item', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{project-item}}`);

  assert.equal(this.$('.project-item').length, 1, 'The component\'s element is rendered');
});

test('it renders the correct UI elements', function(assert) {
  assert.expect(3);

  this.set('project', {
    iconThumbUrl: 'icon.png',
    title: 'A project',
    description: 'A description'
  });
  this.render(hbs`{{project-item project=project}}`);

  assert.equal(this.$('img').attr('src'), 'icon.png', 'The project icon is properly bound');
  assert.equal(this.$('h4').text().trim(), 'A project', 'The project title is properly bound');
  assert.equal(this.$('p').text().trim(), 'A description', 'The project description is properly bound');
});
