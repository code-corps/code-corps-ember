/**
 * Figures out if an error payload received from the server
 * contains validation errors and thus is a validation error payload
 *
 * This is done by checking for presence of a `source` property in
 * any of the received error objects.
 *
 * @param  {DS.AdapterError}  payload An instance of a `DS.AdapterError`
 * @return {Boolean}          `true` if the payload is a validaton error payload
 */
export function isValidationError(payload) {
  if (!payload.isAdapterError) {
    return false;
  }

  let errors = payload.errors || [];

  return errors.some((e) => e.source);
}

/**
 * isNonValidationError - function
 *
 * Returns the negation of isValidationError
 *
 * @param  {DS.AdapterError} payload An instance of a DS.Adapter error.
 * @return {Boolean}                 `true`, if the payload is a non-validation error.
 */
export function isNonValidationError(payload) {
  return !isValidationError(payload);
}
