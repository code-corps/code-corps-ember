// from https://topaxi.codes/using-es7-async-functions-in-ember/
// Sets the global Promise object to the Ember.RSVP.Promise.
// This change guaranties that async code runs with the Ember run-loop in mind.
// To elaborate, without this, until ember-cli fully supports ecma8, we might get
// errors along the lines of 'calling set on destroyed object'
import Ember from 'ember';

const { RSVP } = Ember;

export function initialize() {
  window.Promise = RSVP.Promise;
}

export default {
  name: 'promise',
  initialize
};
