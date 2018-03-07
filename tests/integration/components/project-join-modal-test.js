import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';
import pageComponent from 'code-corps-ember/tests/pages/components/project-join-modal';

let page = PageObject.create(pageComponent);

moduleForComponent('project-join-modal', 'Integration | Component | project join modal', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    set(this, 'onJoin', () => {});
  },
  afterEach() {
    page.removeContext();
  }
});

test('ui is rendered correctly when modal is open', function(assert) {
  assert.expect(1);

  let skills = [{ title: 'CSS' }, { title: 'HTML' }];

  set(this, 'skills', skills);
  set(this, 'showModal', true);

  this.render(hbs`{{project-join-modal onJoin=onJoin project=project showModal=showModal skills=skills}}`);

  assert.equal(page.modal.relatedSkills.skillListItems.listItems.length, 2, 'Related skills are rendered.');
});

test('when button is clicked, modal opens', function(assert) {
  assert.expect(2);

  this.render(hbs`{{project-join-modal onJoin=onJoin project=project showModal=showModal skills=skills}}`);

  assert.notOk(page.modal.isVisible, 'Modal is initially hidden.');
  page.openButton.click();
  assert.ok(page.modal.isVisible, 'Modal is now visible.');
});

test('when clicking outside the modal, the modal closes', function(assert) {
  assert.expect(2);

  set(this, 'showModal', true);

  this.render(hbs`{{project-join-modal onJoin=onJoin project=project showModal=showModal skills=skills}}`);

  assert.ok(page.modal.isVisible, 'Modal is initially visible.');
  page.overlay.click();
  assert.notOk(page.modal.isVisible, 'Modal is now hidden.');
});

test('when hitting escape, the modal closes', function(assert) {
  assert.expect(2);

  set(this, 'showModal', true);

  this.render(hbs`{{project-join-modal onJoin=onJoin project=project showModal=showModal skills=skills}}`);

  assert.ok(page.modal.isVisible, 'Modal is initially visible.');
  page.modal.hitEscape();
  assert.notOk(page.modal.isVisible, 'Modal is now hidden.');
});

test('when hitting "join project" button, the service is called', function(assert) {
  assert.expect(1);

  set(this, 'showModal', true);
  let project = { title: 'Test' };

  set(this, 'project', project);

  stubService(this, 'project-user', {
    joinProject(joinedProject) {
      assert.deepEqual(joinedProject, project);
    }
  });

  this.render(hbs`{{project-join-modal onJoin=onJoin project=project showModal=showModal skills=skills}}`);

  page.modal.joinProjectButton.click();
});
