import { getOwner } from '@ember/application';
import { run } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/flash-messages/fixed-position';

let page = PageObject.create(component);

moduleForComponent('flash-messages/fixed-position', 'Integration | Component | flash messages/fixed position', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders a fixed error message', function(assert) {
  page.render(hbs`{{flash-messages/fixed-position}}`);

  run(() => {
    getOwner(this).lookup('service:flash-messages').add({
      message: 'Error message',
      type: 'danger',
      fixed: true,
      sticky: false,
      timeout: 5000
    });
  });

  assert.equal(page.message, 'Error message');
});
