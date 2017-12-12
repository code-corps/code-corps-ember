import Mixin from '@ember/object/mixin';
import { isPresent } from '@ember/utils';
import { get } from '@ember/object';

export default Mixin.create({
  modelName: null,
  message: 'You will lose any unsaved information if you leave this page. Are you sure?',

  actions: {
    willTransition(transition) {
      let modelName = get(this, 'controller.modelName');
      if (isPresent(modelName)) {
        let model = get(this, `controller.${modelName}`);
        if (get(model, 'isNew')) {
          this._confirmTransition(transition, model);
        }
      } else {
        this._confirmTransition(transition);
      }
    }
  },

  _confirmTransition(transition, model) {
    let message = get(this, 'message');
    if (window.confirm(message)) {
      if (isPresent(model)) {
        model.destroyRecord();
      }
    } else {
      transition.abort();
    }
  }
});