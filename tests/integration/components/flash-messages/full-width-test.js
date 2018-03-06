import { getOwner } from '@ember/application';
import { run } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/flash-messages/full-width';

let page = PageObject.create(component);

moduleForComponent('flash-messages/full-width', 'Integration | Component | flash messages/full width', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders a normal success message', function(assert) {
  this.render(hbs`{{flash-messages/full-width}}`);

  run(() => {
    getOwner(this).lookup('service:flash-messages').add({
      message: 'Success message',
      type: 'success'
    });
  });

  assert.equal(page.message, 'Success message');
});
