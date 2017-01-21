import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('project-header', 'Integration | Component | project header', {
  integration: true
});

test('it displays the right title, icon, description', function(assert) {
  assert.expect(3);

  let project = {
    title: 'Test Project',
    description: 'Test project description',
    iconThumbUrl: 'icon.png'
  };
  this.set('project', project);

  this.render(hbs`{{project-header project=project}}`);

  assert.equal(this.$('img.icon').attr('src'), project.iconThumbUrl, 'Icon is rendered');
  assert.equal(this.$('h2').text().trim(), project.title, 'Title is rendered');
  assert.equal(this.$('p').text().trim(), project.description, 'Description is rendered');
});
