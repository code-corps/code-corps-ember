import { helper } from '@ember/component/helper';
import prettyFloat from 'code-corps-ember/utils/pretty-float';

const COMMAS_EVERY_THREE_DIGITS = /(\d)(?=(\d{3})+(?!\d))/g;

function applyFormatting(number) {
  if (number.length == 0) {
    return '';
  } else {
    return `${number.replace(COMMAS_EVERY_THREE_DIGITS, '$1,')}`;
  }
}

/**
 * Used to display a number in the format of 20,000.50
 *
 * - commas every 3 digits
 * - dot as decimal separator when not trimming zero
 * - fixed 2-decimal notation when not trimming zero
 *
 * In order to display zero decimals, provide a hash, consisting of
 * `{ trimZero: false }` as the second parameter.
 *
 * @param  {String}  numberAsString   The value to be formatted
 * @param  {Boolean} options.trimZero  Indicates if zero decimals should be added
 * @return {String}                    The value, formatted
 */
export function formatNumber([numberAsString], { trimZero = true } = {}) {
  let number = prettyFloat(numberAsString, { trimZero });
  return applyFormatting(number);
}

export default helper(formatNumber);
