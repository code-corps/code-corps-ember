import Ember from 'ember';
import { task } from 'ember-concurrency';

const {
  Component,
  get,
  set
} = Ember;
/**
  `modal-confirm` Replaces javascript confirm with a modal built with ember-modal-dialog

  ## default usage

  ```handlebars
  {{modal-confirm dialogText='Confirm Text' okAction=(action 'deny' membership) showDialog=showConfirm}}
  ```
  ### Testing

  For integration tests you need the modal-dialog service to set a container even when using it as a child component

  ```javascript
  let modalDialogService = this.container.lookup('service:modal-dialog');
  modalDialogService.destinationElementId = 'modal-container';

  this.render(hbs```<`div id='modal-container'`>` `<`/div`>`{{member-list-item membership=membership user=user}}``);
  ```

  For acceptance tests using a page object you need to specify a container of **body** since is uses ember-wormhole and its container is outside of
  ember-view

  ```javascript
  modal: {
    testContainer: 'body',
    confirmOk: clickable('button#ok')
  }
  ```
  ```javascript
  page.modal.confirmOk();
  ```

  @module Component
  @extends Ember.component
  @class modal-confirm
 */
export default Component.extend({
  /**
    Text for Cancel Button on dialog
    @property cancelText
    @type String
    @default 'Cancel'
  */
  cancelText: 'Cancel',
  /**
    Text for Ok button on dialog

    @property okText
    @type String
    @default 'Ok'
  */
  okText: 'Ok',
  /**
    @property showDialog
    @type Boolean
    @default false
  */
  showDialog: false,

  actions: {
    /**
      Closes dialog
      @method closeDialog
    */
    closeDialog() {
      get(this, '_hideDialog').perform();
    },

    /**
      Fires okAction closure action if one exists
      and closes the dialog

      @method okAction
    */
    okAction() {
      if (this.attrs.okAction) {
        get(this, 'okAction')();
      }
      this.send('closeDialog');
    }
  },

  _hideDialog: task(function* () {
    yield set(this, 'showDialog', false);
  })
});
