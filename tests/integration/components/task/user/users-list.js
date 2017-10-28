import { setProperties, set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/task/user/users-list';

let page = PageObject.create(component);

function renderPage() {
  page.render(hbs`
    {{task/user/users-list
      action=hideHandler
      task=task
      user=user
      userTask=userTask
    }}
  `);
}

function setHandlers(context, { hideHandler = function() {} } = {}) {
  setProperties(context, { hideHandler });
}

moduleForComponent('task/user/users-list', 'Integration | Component | users list', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    setHandlers(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it sends the hide action when clicking to close', function(assert) {
  assert.expect(1);
  let hideHandler = function() {
    assert.ok();
  };
  set(this, 'hideHandler', hideHandler);
  renderPage();
  page.header.clickClose();
});
