import Ember from 'ember';
const { Component, set, get, inject: { service } } = Ember;
import { task } from 'ember-concurrency';

export default Component.extend({
  classNames: ['form--centered', 'reset-password-form'],

  /**
   * @property flashMessages
   * @type Ember.Service
   */
  flashMessages: service(),
  /**
   * @property password
   * @default String
   */
  password: '',
  /**
   * @property passwordConfirmation
   * @default String
   */
  passwordConfirmation: '',
  /**
   * @property error
   */
  error: null,

  /**
   * @property resetPasswordTask
   * @param password
   * @param passwordConfirmation
   */
  resetPasswordTask: task(function* (password, passwordConfirmation) {
    try {
      yield get(this, 'resetPassword')(password, passwordConfirmation);
      get(this, 'flashMessages').clearMessages().success("Your password has been reset and you're now signed in.");
      set(this, 'error', null);
    } catch(e) {
      set(this, 'error', e);
    }
  }),

  actions: {

  /**
   * @method resetPassword
   * @param password
   * @param passwordConfirmation
   */
    resetPassword(password, passwordConfirmation) {
      return get(this, 'resetPasswordTask').perform(password, passwordConfirmation);
    }

  }
});
