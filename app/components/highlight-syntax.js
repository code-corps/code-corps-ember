import Ember from 'ember';

const {
  Component
 } = Ember;

export default Component.extend({
  didRender() {
    this._super(...arguments);
    let element = this._getElement();
    if (element) {
      Prism.highlightElement(element);
    }
  },

  _getElement(){
    return this.$('[class*=language-]')[0];
  }
});
