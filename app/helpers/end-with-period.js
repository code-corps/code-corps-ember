import Ember from 'ember';

export function endWithPeriod([string]) {
  let lastCharacter = string.slice(-1);
  if (lastCharacter !== '.') {
    string += '.';
  }
  return string;
}

export default Ember.Helper.helper(endWithPeriod);
