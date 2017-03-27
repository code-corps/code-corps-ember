import Ember from 'ember';

const {
  Helper: { helper }
} = Ember;

function convertToFloat(value) {
  return parseFloat(value);
}

/**
 * Used to convert a value to float. Should help if the value is, for example,
 * a string indicating a float
 *
 * @param  {String}  value   The value which could be a float or a string
 * @return {Number}          The value, in float
 */
export function float([value]) {
  return convertToFloat(value);
}

export default helper(float);
