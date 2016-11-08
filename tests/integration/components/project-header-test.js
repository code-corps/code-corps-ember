import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage from '../../helpers/setup-mirage-for-integration';

moduleForComponent('project-header', 'Integration | Component | project header', {
  integration: true,
  setup() {
    startMirage(this.container);
  },
  afterEach() {
    server.shutdown();
  }
});

test('it displays the right title, icon, description', function(assert) {
  assert.expect(3);

  let project = server.create('project');
  this.set('project', project);

  this.render(hbs`{{project-header project=project}}`);

  assert.equal(this.$('img.icon').attr('src'), project.iconThumbUrl, 'Icon is rendered');
  assert.equal(this.$('h2').text().trim(), project.title, 'Title is rendered');
  assert.equal(this.$('p').text().trim(), project.description, 'Description is rendered');
});
