import { helper } from '@ember/component/helper';

import prettyFloat from 'code-corps-ember/utils/pretty-float';

function applyFormatting(percentage) {
  return percentage.length == 0 ? '' : `${percentage}%`;
}

/**
 * Helper formats a float or a string representing a float into a percentage value.
 *
 * By default, the value will be formatted as `'22.5%'`.
 * If the number is an integer, the format will be `'22.0%'`
 *
 * To remove the zero deciamals, a "trimZero" named argument can be provided.
 * If this argument is set to `true`, the zero decimals
 * will be removed, so the format will be `'22%'`
 *
 * @param  {String}   percentageAsString The value to be formatted as percentage
 * @param  {Boolean}  options.trimZero   Option to remove the decimal part if the value of it is zero
 * @return {String}                      Value, formatted as percentage
 */
export function formatPercentage([percentageAsString], { trimZero = false } = {}) {
  let percentage = prettyFloat(percentageAsString, { numDecimals: 1, trimZero });
  return applyFormatting(percentage);
}

export default helper(formatPercentage);
