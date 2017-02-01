import { isValidationError, isNonValidationError } from 'code-corps-ember/utils/error-utils';
import { module, test } from 'qunit';
import DS from 'ember-data';

const { AdapterError } = DS;

module('Unit | Utility | error-utils');

let otherError = {
  title: 'Other',
  detail: 'Other detail'
};
let validationError = {
  title: 'Validation',
  detail: 'Validation detail',
  source: 'What makes it a validation error.'
};

let payloadWithJustValidationErrors = new AdapterError([validationError, validationError]);
let payloadWithSomeValidationErrors = new AdapterError([validationError, otherError]);
let payloadWithNoValidationErrors = new AdapterError([otherError, otherError]);
let emptyPayload = new AdapterError([]);

test('isValidationError returns true if payload contains validation errors', function(assert) {
  assert.ok(isValidationError(payloadWithJustValidationErrors));
  assert.ok(isValidationError(payloadWithSomeValidationErrors));
  assert.notOk(isValidationError(payloadWithNoValidationErrors));
  assert.notOk(isValidationError(emptyPayload));
});

test('isNonValidationError returns false if payload contains validation errors', function(assert) {
  assert.notOk(isNonValidationError(payloadWithJustValidationErrors));
  assert.notOk(isNonValidationError(payloadWithSomeValidationErrors));
  assert.ok(isNonValidationError(payloadWithNoValidationErrors));
  assert.ok(isNonValidationError(emptyPayload));
});
