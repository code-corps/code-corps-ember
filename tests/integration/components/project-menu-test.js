import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { Ability } from 'ember-can';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/project-menu';

let page = PageObject.create(component);

moduleForComponent('project-menu', 'Integration | Component | project menu', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('when not authenticated, it renders properly', function(assert) {
  assert.expect(3);

  stubService(this, 'session', { isAuthenticated: false });

  this.render(hbs`{{project-menu}}`);

  assert.equal(page.links.length, 2, 'The correct number of links render');
  assert.equal(page.links.objectAt(0).text, 'About', 'The about link is rendered');
  assert.equal(page.links.objectAt(1).text, 'Tasks', 'The tasks link is rendered');
});

test('when authenticated, and user cannot manage project, it renders properly', function(assert) {
  assert.expect(3);

  stubService(this, 'session', { isAuthenticated: true });
  this.register('ability:project', Ability.extend({ canManage: false }));

  this.render(hbs`{{project-menu}}`);

  assert.equal(page.links.length, 2, 'The correct number of links render');
  assert.equal(page.links.objectAt(0).text, 'About', 'The about link is rendered');
  assert.equal(page.links.objectAt(1).text, 'Tasks', 'The tasks link is rendered');
});

test('when authenticated, and user can manage project, it renders properly', function(assert) {
  assert.expect(9);

  stubService(this, 'session', { isAuthenticated: true });
  this.register('ability:project', Ability.extend({ canAdminister: true, canManage: true }));

  this.render(hbs`{{project-menu}}`);

  assert.equal(page.links.length, 8, 'The correct number of links render');
  assert.equal(page.links.objectAt(0).text, 'About', 'The about link is rendered');
  assert.equal(page.links.objectAt(1).text, 'Tasks', 'The tasks link is rendered');
  assert.equal(page.links.objectAt(2).text, 'People', 'The people link is rendered');
  assert.equal(page.links.objectAt(3).text, 'Conversations', 'The conversations link is rendered');
  assert.equal(page.links.objectAt(4).text, 'Donations', 'The donations link is rendered');
  assert.equal(page.links.objectAt(5).text, 'Payments', 'The payments link is rendered');
  assert.equal(page.links.objectAt(6).text, 'Integrations', 'The integrations link is rendered');
  assert.equal(page.links.objectAt(7).text, 'Settings', 'The settings link is rendered');
});

test('when authenticated, and user can manage project, and project has pending members', function(assert) {
  assert.expect(1);

  stubService(this, 'session', { isAuthenticated: true });
  this.register('ability:project', Ability.extend({ canAdminister: true, canManage: true }));
  let project = {
    projectUsers: [
      { role: 'pending' }
    ]
  };
  this.set('project', project);

  this.render(hbs`{{project-menu project=project}}`);

  assert.equal(page.links.objectAt(2).badge.text, '1 pending', 'The correct number of pending members render');
});

test('when authenticated, and user can manage project, and project has no pending members', function(assert) {
  assert.expect(1);

  stubService(this, 'session', { isAuthenticated: true });
  this.register('ability:project', Ability.extend({ canAdminister: true, canManage: true }));
  let project = {
    projectUsers: [
      { role: 'contributor' }
    ]
  };
  this.set('project', project);

  this.render(hbs`{{project-menu project=project}}`);

  assert.notOk(page.links.objectAt(2).badge.isVisible, 'The pending members badge does not render');
});
