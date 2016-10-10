import Ember from 'ember';

const { Helper } = Ember;

export function endWithPeriod([string]) {
  let lastCharacter = string.slice(-1);
  if (lastCharacter !== '.') {
    string += '.';
  }
  return string;
}

export default Helper.helper(endWithPeriod);
