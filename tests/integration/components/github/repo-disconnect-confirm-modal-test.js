import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import pageComponent from 'code-corps-ember/tests/pages/components/github/repo-disconnect-confirm-modal';

let page = PageObject.create(pageComponent);

moduleForComponent('github/repo-disconnect-confirm-modal', 'Integration | Component | github/repo disconnect confirm modal', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    set(this, 'disconnect', () => {});
  },
  afterEach() {
    page.removeContext();
  }
});

test('when button is clicked, modal opens', function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{github/repo-disconnect-confirm-modal
      disconnect=disconnect
      githubRepo=githubRepo
      showModal=showModal
    }}
  `);

  assert.notOk(page.modal.isVisible, 'Modal is initially hidden.');
  page.openButton.click();
  assert.ok(page.modal.isVisible, 'Modal is now visible.');
});

test('when clicking outside the modal, the modal closes', function(assert) {
  assert.expect(2);

  set(this, 'showModal', true);

  this.render(hbs`
    {{github/repo-disconnect-confirm-modal
      disconnect=disconnect
      githubRepo=githubRepo
      showModal=showModal
    }}
  `);

  assert.ok(page.modal.isVisible, 'Modal is initially visible.');
  page.overlay.click();
  assert.notOk(page.modal.isVisible, 'Modal is now hidden.');
});

test('when hitting escape, the modal closes', function(assert) {
  assert.expect(2);

  set(this, 'showModal', true);

  this.render(hbs`
    {{github/repo-disconnect-confirm-modal
      disconnect=disconnect
      githubRepo=githubRepo
      showModal=showModal
    }}
  `);

  assert.ok(page.modal.isVisible, 'Modal is initially visible.');
  page.modal.hitEscape();
  assert.notOk(page.modal.isVisible, 'Modal is now hidden.');
});

test('when the name in the input matches the repo name', function(assert) {
  assert.expect(1);

  let githubRepo = { name: 'Test' };

  set(this, 'githubRepo', githubRepo);
  set(this, 'disconnect', function() {
    assert.ok(true, 'The disconnect action was called.');
  });
  set(this, 'showModal', true);

  this.render(hbs`
    {{github/repo-disconnect-confirm-modal
      disconnect=disconnect
      githubRepo=githubRepo
      showModal=showModal
    }}
  `);

  page.modal.input.fillIn(githubRepo.name);
  page.modal.disconnectButton.click();
});

test('when the name in the input does not match the repo name', function(assert) {
  assert.expect(1);

  let githubRepo = { name: 'Test' };

  set(this, 'githubRepo', githubRepo);
  set(this, 'disconnect', function() {
    assert.ok(true, 'The disconnect action was called.');
  });
  set(this, 'showModal', true);

  this.render(hbs`
    {{github/repo-disconnect-confirm-modal
      disconnect=disconnect
      githubRepo=githubRepo
      showModal=showModal
    }}
  `);

  page.modal.input.fillIn('Tes');
  assert.ok(page.modal.disconnectButton.isDisabled, 'The button is disabled.');
  page.modal.disconnectButton.click();
});
