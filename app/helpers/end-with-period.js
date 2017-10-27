import Helper from '@ember/component/helper';

export function endWithPeriod([string]) {
  let lastCharacter = string.slice(-1);
  if (lastCharacter !== '.') {
    string += '.';
  }
  return string;
}

export default Helper.helper(endWithPeriod);
