import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import projectItemComponent from 'code-corps-ember/tests/pages/components/project-item';

let page = PageObject.create(projectItemComponent);

moduleForComponent('project-item', 'Integration | Component | project item', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
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
  page.render(hbs`{{project-item project=project}}`);

  assert.equal(page.icon.src, 'icon.png', 'The project icon is properly bound');
  assert.equal(page.title, 'A project', 'The project title is properly bound');
  assert.equal(page.description, 'A description', 'The project description is properly bound');
});
