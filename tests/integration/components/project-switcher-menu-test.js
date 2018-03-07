import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/project-switcher-menu';
import { Ability } from 'ember-can';

let page = PageObject.create(component);

let user = {
  organizations: [
    {
      name: 'Test organization',
      projects: [
        {
          iconThumbUrl: 'http://lorempixel.com/25/25/',
          isNew: false,
          title: 'Test project'
        }
      ]
    }
  ]
};

moduleForComponent('project-switcher-menu', 'Integration | Component | project switcher menu', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders the links', function(assert) {
  assert.expect(5);

  set(this, 'user', user);

  this.render(hbs`{{project-switcher-menu user=user}}`);

  assert.equal(page.menu.organizations.length, 1, 'One organization renders.');
  assert.equal(page.menu.projects.length, 1, 'One project renders.');
  assert.equal(page.menu.organizations.objectAt(0).text, user.organizations[0].name, 'The organization name is correct.');
  assert.equal(page.menu.projects.objectAt(0).text, user.organizations[0].projects[0].title, 'The project title is correct.');
  assert.equal(page.menu.projects.objectAt(0).icon.url, user.organizations[0].projects[0].iconThumbUrl, 'The project icon URL is correct.');
});

test('it renders the new project link if the user can manage', function(assert) {
  set(this, 'user', user);
  this.register('ability:organization', Ability.extend({ canManage: true }));

  this.render(hbs`{{project-switcher-menu user=user}}`);

  assert.ok(page.menu.newProjectLink.isVisible, 'The new project link renders.');
});

test('it does not render the new project link if the user cannot manage', function(assert) {
  assert.expect(1);

  set(this, 'user', user);
  this.register('ability:organization', Ability.extend({ canManage: false }));

  this.render(hbs`{{project-switcher-menu user=user}}`);

  assert.notOk(page.menu.newProjectLink.isVisible, 'The new project link does not render.');
});
