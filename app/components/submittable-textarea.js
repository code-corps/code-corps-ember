import Ember from 'ember';

export default Ember.TextArea.extend({
  keyDown: function(event) {
    if (this._isValidCombination(event)) {
      event.preventDefault();
      this.sendAction('modifiedSubmit');
    }
  },

  _hasCorrectModifier: function(event) {
    return event.ctrlKey || event.metaKey;
  },

  _isCorrectKeyCode: function(keyCode) {
    return keyCode === 13;
  },

  _isValidCombination: function(event) {
    return this._hasCorrectModifier(event) && this._isCorrectKeyCode(event.keyCode);
  }
});
