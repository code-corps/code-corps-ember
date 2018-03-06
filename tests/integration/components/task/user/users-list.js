import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/task/user/users-list';

let page = PageObject.create(component);

moduleForComponent('task/user/users-list', 'Integration | Component | users list', {
  integration: true,
  beforeEach() {
    page.setContext(this);
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

  this.render(hbs`
    {{task/user/users-list
      action=hideHandler
      task=task
      user=user
      userTask=userTask
    }}
  `);

  page.header.clickClose();
});
