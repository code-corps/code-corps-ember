import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/donation/project-header';

let page = PageObject.create(component);

moduleForComponent('donation/project-header', 'Integration | Component | donation project header', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it displays the right title, icon, description', function(assert) {
  assert.expect(3);

  let project = {
    title: 'Test Project',
    description: 'Test project description',
    iconThumbUrl: 'icon.png'
  };
  this.set('project', project);

  this.render(hbs`{{donation/project-header project=project}}`);

  assert.equal(page.icon.src, project.iconThumbUrl, 'Icon is rendered');
  assert.equal(page.title.text, project.title, 'Title is rendered');
  assert.equal(page.description.text, project.description, 'Description is rendered');
});
