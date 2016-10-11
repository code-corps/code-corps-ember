import Ember from 'ember';

const { TextArea } = Ember;

export default TextArea.extend({
  keyDown(event) {
    if (this._isValidCombination(event)) {
      event.preventDefault();
      this.sendAction('modifiedSubmit');
    }
  },

  _hasCorrectModifier(event) {
    return event.ctrlKey || event.metaKey;
  },

  _isCorrectKeyCode(keyCode) {
    return keyCode === 13;
  },

  _isValidCombination(event) {
    return this._hasCorrectModifier(event) && this._isCorrectKeyCode(event.keyCode);
  }
});
