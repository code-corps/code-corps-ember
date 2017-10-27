import { getOwner } from '@ember/application';
import { run } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/flash-messages';

let page = PageObject.create(component);

moduleForComponent('flash-messages', 'Integration | Component | flash messages', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders a fixed error message', function(assert) {
  page.render(hbs`{{flash-messages}}`);

  run(() => {
    getOwner(this).lookup('service:flash-messages').add({
      message: 'Error message',
      type: 'danger',
      fixed: true,
      sticky: false,
      timeout: 5000
    });
  });

  assert.equal(page.fixed.message, 'Error message');
});

test('it renders a normal success message', function(assert) {
  page.render(hbs`{{flash-messages}}`);

  run(() => {
    getOwner(this).lookup('service:flash-messages').add({
      message: 'Success message',
      type: 'success'
    });
  });

  assert.equal(page.normal.message, 'Success message');
});
