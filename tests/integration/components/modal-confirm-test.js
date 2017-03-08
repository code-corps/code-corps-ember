import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import page from '../../pages/components/modal-confirm';

moduleForComponent('modal-confirm', 'Integration | Component | modal confirm', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('Render with defaults', function(assert) {
  assert.expect(3);

  let modalDialogService = this.container.lookup('service:modal-dialog');
  modalDialogService.destinationElementId = 'modal-container';

  page.render(hbs`<div id='modal-container'></div>{{modal-confirm showDialog=true}}`);
  assert.equal(page.dialogText, '');
  assert.equal(page.okText, 'Ok');
  assert.equal(page.cancelText, 'Cancel');
});

test('Render with "cancelText", "dialogText", and "okText" options', function(assert) {
  assert.expect(3);

  let modalDialogService = this.container.lookup('service:modal-dialog');
  modalDialogService.destinationElementId = 'modal-container';

  page.render(hbs`<div id='modal-container'></div>{{modal-confirm cancelText='Dismiss' dialogText='Are you sure?' okText='Confirm' showDialog=true}}`);
  assert.equal(page.dialogText, 'Are you sure?');
  assert.equal(page.okText, 'Confirm');
  assert.equal(page.cancelText, 'Dismiss');
});

test('test that dialog disappears when clicking "Cancel"', function(assert) {
  assert.expect(1);

  let modalDialogService = this.container.lookup('service:modal-dialog');
  modalDialogService.destinationElementId = 'modal-container';

  page.render(hbs`<div id='modal-container'></div>{{modal-confirm cancelText='Dismiss' dialogText='Are you sure?' okText='Confirm' showDialog=true}}`);
  page.cancel();
  assert.ok(page.dialogTextIsHidden, '');
});

test('test that dialog disappears when clicking "OK", test closure action when clicking "OK"', function(assert) {
  assert.expect(3);

  let modalDialogService = this.container.lookup('service:modal-dialog');
  modalDialogService.destinationElementId = 'modal-container';

  this.set('confirmActionArg', true);
  this.set('showDialog', true);

  this.set('confirmAction', (confirm) => {
    this.set('confirmValue', confirm);
  });

  page.render(hbs`<div id='modal-container'></div>{{modal-confirm okAction=(action confirmAction confirmActionArg) showDialog=showDialog}}`);
  page.ok();
  assert.equal(this.get('confirmValue'), true);
  assert.ok(page.dialogTextIsHidden);

  this.set('showDialog', true);

  page.render(hbs`<div id='modal-container'></div>{{modal-confirm showDialog=showDialog}}`);
  page.ok();
  assert.ok(page.dialogTextIsHidden);
});

