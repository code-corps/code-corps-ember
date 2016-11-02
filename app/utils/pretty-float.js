function cleanupDecimals(value, numDecimals, trimZero) {
  let roundedValue = parseFloat(value.toFixed(numDecimals));
  let noDecimals = roundedValue - Math.floor(roundedValue) == 0;
  let decimalCount = trimZero && noDecimals ? 0 : numDecimals;

  return roundedValue.toFixed(decimalCount);
}

/**
 * Makes a float "pretty" by rounding it to the specified number of decimals.
 *
 * The default number of decimals is 2.
 *
 * If the number is integer, it still displays as "X.00" by default. A `trimZero` option
 * is available to format it as "X" instead.
 *
 * @param  {String}  valueAsString        A string representing a numeric value to be made 'pretty'
 * @param  {Number}  options.numDecimals  Number of decimals to round to
 * @param  {Boolean} options.trimZero     A flag indicating if decimals should be trimmed away if the number is integer
 * @return {String}                       A string representing a float made 'pretty.'
 */
export default function prettyFloat(valueAsString, { numDecimals = 2, trimZero = false } = {}) {
  let value = parseFloat(valueAsString);

  // parseFloat can only be NaN, or an actual number
  return isNaN(value) ? '' : cleanupDecimals(value, numDecimals, trimZero);
}
