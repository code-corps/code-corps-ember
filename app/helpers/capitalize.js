import Ember from 'ember';

export function capitalize([string]) {
  if (Ember.isEmpty(string)) {
    return;
  }
  return string.capitalize();
}

export default Ember.Helper.helper(capitalize);
