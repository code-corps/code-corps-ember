import Ember from 'ember';
const { Component, set, get, inject: { service } } = Ember;
import { task } from 'ember-concurrency';

export default Component.extend({
  classNames: ['form--centered', 'forgot-password-form'],

  /**
   * @property flashMessages
   * @type Ember.Service
   */
  flashMessages: service(),

  /**
   * @property email
   * @default String
   */
  email: '',
  /**
   * @property error
   */
  error: null,

  /**
   * @property forgotPasswordTask
   * @param email
   */
  forgotPasswordTask: task(function* (email) {
    try {
      yield get(this, 'forgotPassword')(email);
      get(this, 'flashMessages').clearMessages().success("Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder or double-check whether you have an account with this email.");
      set(this, 'error', null);
    } catch(e) {
      set(this, 'error', e);
    }
  }),

  actions: {

  /**
   * @method forgotPassword
   * @param email
   */
    forgotPassword(email) {
      return get(this, 'forgotPasswordTask').perform(email);
    }

  }
});
