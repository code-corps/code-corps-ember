import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/project-details';

let page = PageObject.create(component);

moduleForComponent('project-details', 'Integration | Component | project details', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

let project = {
  title: 'Test Project',
  iconThumbUrl: 'icon.png'
};

test('it renders title', function(assert) {
  assert.expect(2);

  this.set('project', project);

  page.render(hbs`{{project-details project=project}}`);

  assert.equal(page.icon.src, project.iconThumbUrl, 'Icon is rendered');
  assert.equal(page.title.text, project.title, 'Title is rendered');
});
