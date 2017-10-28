import { helper } from '@ember/component/helper';
import { formatNumber } from 'code-corps-ember/helpers/format-number';

function applyFormatting(amount) {
  if (amount.length == 0) {
    return '';
  } else {
    return `$${amount}`;
  }
}

/**
 * Used to display an amount (in dollars) as currency in the format of
 * $20,000.50
 *
 * - prefixed with a dollar sign
 * - commas every 3 digits
 * - dot as decimal separator
 * - fixed 2-decimal notation
 *
 * In order to not display zero decimals, provide a hash, consisting of
 * `{ trimZero: true }` as the second parameter.
 *
 * @param  {String}  dollarsAsString   The value to be formatted as currency
 * @param  {Boolean} options.trimZero  Indicates if zero decimals should be removed
 * @return {String}                    The value, formatted as currency
 */
export function formatCurrency([dollarsAsString], { trimZero = false } = {}) {
  let dollarsAmount = formatNumber([dollarsAsString], { trimZero });
  return applyFormatting(dollarsAmount);
}

export default helper(formatCurrency);
