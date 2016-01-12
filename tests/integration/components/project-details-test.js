import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('project-details', 'Integration | Component | project details', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{project-details}}`);

  assert.equal(this.$('.project-details').length, 1);
});

test('it renders basic project information', function(assert) {
  let project = {
    title: 'CodeCorps',
    description: 'A test project',
    iconThumbUrl: 'image-url.com'
  };

  this.set('project', project);

  this.render(hbs`{{project-details project=project}}`);

  assert.equal(this.$('.title').text().trim(), 'CodeCorps', 'Title is rendered');
  assert.equal(this.$('.description').text().trim(), 'A test project', 'Description is rendered');
  assert.equal(this.$('.icon').attr('src'), 'image-url.com', 'Image element is rendered');
});
