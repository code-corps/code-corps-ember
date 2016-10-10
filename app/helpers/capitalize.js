import Ember from 'ember';

const {
  isEmpty,
  Helper
} = Ember;

export function capitalize([string]) {
  if (isEmpty(string)) {
    return;
  }
  return string.capitalize();
}

export default Helper.helper(capitalize);
