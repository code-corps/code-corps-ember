import { moduleForComponent, test } from 'ember-qunit';
import { set } from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/conversations/project-details';

let page = PageObject.create(component);

moduleForComponent('conversations/project-details', 'Integration | Component | conversations/project details', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders the project details', function(assert) {
  assert.expect(5);

  let project = {
    categories: [{ name: 'Test category' }],
    description: 'Test description',
    iconThumbUrl: 'http://lorempixel.com/500/500/',
    skills: [{ title: 'Ember.js' }],
    title: 'Test Project'
  };

  set(this, 'project', project);

  this.render(hbs`{{conversations/project-details project=project}}`);

  assert.equal(page.icon.url, project.iconThumbUrl, 'The icon renders');
  assert.equal(page.title.text, project.title, 'The title renders');
  assert.equal(page.description.text, project.description, 'The description renders');
  page.projectCategoriesList.projectCategoryItems.objectAt(0).mouseenter();
  assert.equal(page.projectCategoriesList.projectCategoryItems.objectAt(0).tooltip.text, project.categories[0].name, 'The categories render');
  assert.equal(page.relatedSkills.skillListItems.listItems.objectAt(0).text, project.skills[0].title, 'The skills render');
});
