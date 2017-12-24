import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/project-user-role-modal';
import { set } from '@ember/object';
import {
  assertTooltipContent,
  assertTooltipNotRendered,
  assertTooltipNotVisible,
  assertTooltipRendered,
  assertTooltipVisible
} from 'code-corps-ember/tests/helpers/ember-tooltips';
import { Ability } from 'ember-can';

let page = PageObject.create(component);

function renderPage() {
  page.render(hbs`
    {{project-user-role-modal
      project=project
      projectUser=projectUser
      save=save
      showModal=showModal
    }}
  `);
}

moduleForComponent('project-user-role-modal', 'Integration | Component | project user role modal', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    this.inject.service('currentUser', { as: 'currentUser' });
    set(this, 'save', function() {});
  },
  afterEach() {
    page.removeContext();
  }
});

test('it shows and hides', function(assert) {
  assert.expect(3);

  renderPage();

  assert.notOk(page.modal.isVisible, 'Modal is hidden');
  page.openButton.click();
  assert.ok(page.modal.isVisible, 'Modal is visible');
  page.modal.close();
  assert.notOk(page.modal.isVisible, 'Modal is hidden');
});

test('it renders a tooltip on the button', function(assert) {
  assert.expect(5);

  renderPage();

  assertTooltipNotRendered(assert);

  page.openButton.mouseenter();

  assertTooltipRendered(assert);
  assertTooltipVisible(assert);
  assertTooltipContent(assert, { contentString: 'Change role' });

  page.openButton.mouseleave();

  assertTooltipNotVisible(assert);
});

test('it does not allow an owner to demote themselves', function(assert) {
  assert.expect(6);

  let user = {
    id: 1
  };

  let projectUser = {
    role: 'owner',
    user
  };

  set(this, 'projectUser', projectUser);
  set(this, 'currentUser.user', user);
  this.register('ability:project', Ability.extend({ canManage: true }));
  set(this, 'showModal', true);

  renderPage();

  assert.ok(page.modal.radioGroupOwner.adminCannotRemove.isVisible, 'Admin cannot remove text is visible');
  assert.ok(page.modal.radioGroupOwner.radioButton.isChecked, 'Admin radio button is checked');
  assert.ok(page.modal.radioGroupAdmin.hasDisabledClass, 'Admin has disabled class');
  assert.ok(page.modal.radioGroupAdmin.radioButton.isDisabled, 'Admin radio button is disabled');
  assert.ok(page.modal.radioGroupContributor.hasDisabledClass, 'Contributor has disabled class');
  assert.ok(page.modal.radioGroupContributor.radioButton.isDisabled, 'Contributor radio button is disabled');
});

test('it allows an owner to demote a different owner', function(assert) {
  assert.expect(6);

  let owner = { id: 2 };

  let user = { id: 1 };

  let projectUser = {
    role: 'owner',
    user
  };

  set(this, 'projectUser', projectUser);
  set(this, 'currentUser.user', owner);
  this.register('ability:project', Ability.extend({ canManage: true }));
  set(this, 'showModal', true);

  renderPage();

  assert.notOk(page.modal.radioGroupOwner.adminCannotRemove.isVisible, 'Admin cannot remove text is hidden');
  assert.ok(page.modal.radioGroupOwner.radioButton.isChecked, 'Admin radio button is checked');
  assert.notOk(page.modal.radioGroupAdmin.hasDisabledClass, 'Admin does not have disabled class');
  assert.notOk(page.modal.radioGroupAdmin.radioButton.isDisabled, 'Admin radio button is not disabled');
  assert.notOk(page.modal.radioGroupContributor.hasDisabledClass, 'Contributor notOk class');
  assert.notOk(page.modal.radioGroupContributor.radioButton.isDisabled, 'Contributor radio button is not disabled');
});

test('it changes the role when the radio buttons are selected', function(assert) {
  assert.expect(9);

  let user = {
    id: 1
  };

  let projectUser = {
    role: 'contributor',
    user
  };

  set(this, 'projectUser', projectUser);
  set(this, 'currentUser.user', { id: 2 });
  this.register('ability:project', Ability.extend({ canManage: true }));
  set(this, 'showModal', true);

  renderPage();

  assert.notOk(page.modal.radioGroupAdmin.radioButton.isChecked);
  assert.ok(page.modal.radioGroupContributor.radioButton.isChecked);
  assert.notOk(page.modal.radioGroupOwner.radioButton.isChecked);

  page.modal.radioGroupAdmin.radioButton.click();

  assert.ok(page.modal.radioGroupAdmin.radioButton.isChecked);
  assert.notOk(page.modal.radioGroupContributor.radioButton.isChecked);
  assert.notOk(page.modal.radioGroupOwner.radioButton.isChecked);

  page.modal.radioGroupOwner.radioButton.click();

  assert.notOk(page.modal.radioGroupAdmin.radioButton.isChecked);
  assert.notOk(page.modal.radioGroupContributor.radioButton.isChecked);
  assert.ok(page.modal.radioGroupOwner.radioButton.isChecked);
});

test('it does not show owner option when cannot manage', function(assert) {
  assert.expect(1);

  this.register('ability:project', Ability.extend({ canManage: false }));
  set(this, 'showModal', true);

  renderPage();

  assert.notOk(page.modal.radioGroupOwner.isVisible);
});

test('it sends the project user on save', function(assert) {
  assert.expect(2);

  let user = {
    id: 1
  };

  let projectUser = {
    role: 'contributor',
    user
  };

  set(this, 'projectUser', projectUser);
  set(this, 'showModal', true);

  set(this, 'save', function(pu, r) {
    assert.deepEqual(pu, projectUser);
    assert.deepEqual(r, 'admin');
  });

  renderPage();

  page.modal.radioGroupAdmin.radioButton.click();
  page.modal.save();
});
