import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import userProjectsList from '../../pages/components/user-projects-list';
let page = PageObject.create(userProjectsList);

moduleForComponent('user-projects-list', 'Integration | Component | user projects list', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('with no projects renders all required elements', function(assert) {
  assert.expect(2);

  // No organizations
  set(this, 'projects', []);

  set(this, 'user', {
    username: 'JoshSmith'
  });

  this.render(hbs`{{user-projects-list user=user projects=projects}}`);

  assert.equal(page.header, 'Projects', 'The header renders');
  assert.equal(page.emptyState, 'JoshSmith', 'Component\'s element is rendered');
});

test('with several organizations renders all required elements', function(assert) {
  assert.expect(5);

  let mockProjects = [];
  for (let i = 1; i <= 3; i++) {
    mockProjects.push({
      id: i,
      title: `Project ${i}`,
      slug: `project_${i}`,
      description: `Project ${i} description`,
      iconThumbUrl: `/icon_${i}.png`
    });
  }

  set(this, 'projects', mockProjects);

  set(this, 'user', {
    username: 'JoshSmith'
  });

  this.render(hbs`{{user-projects-list user=user projects=projects}}`);

  assert.equal(page.header, 'Projects', 'The header renders');
  assert.equal(page.listItemCount, 3, 'All project items render');
  assert.equal(page.projectTitle, 'Project 1', 'The project title renders');
  assert.equal(page.projectDescription, 'Project 1 description', 'The project description renders');
  assert.ok(page.projectIconSrc.indexOf('icon_1.png') > -1, 'The project icon renders');
});
