import { AdapterError } from 'ember-data/adapters/errors';

export default function FriendlyError(message, errors) {
  this.isFriendlyError = true;
  AdapterError.call(this, errors, message);
}
