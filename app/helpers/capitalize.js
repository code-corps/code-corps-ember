import { isEmpty } from '@ember/utils';
import Helper from '@ember/component/helper';

export function capitalize([string]) {
  if (isEmpty(string)) {
    return;
  }
  return string.capitalize();
}

export default Helper.helper(capitalize);
