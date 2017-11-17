import { get, set } from '@ember/object';
import { on } from '@ember/object/evented';
import BeforeOptionsComponent from 'ember-power-select/components/power-select/before-options';
import {
  EKMixin as EmberKeyboardMixin,
  keyDown
} from 'ember-keyboard';

export default BeforeOptionsComponent.extend(EmberKeyboardMixin, {
  init() {
    this._super(...arguments);

    set(this, 'keyboardActivated', true);
  },

  keydown: on(keyDown(), function(event, ekEvent) {
    ekEvent.stopPropagation();
    ekEvent.stopImmediatePropagation();
    // Send the action ember-power-select expects
    this.sendAction('onKeydown', event);
  }),

  actions: {
    close() {
      get(this, 'selectRemoteController').actions.close();
    }
  }
});
