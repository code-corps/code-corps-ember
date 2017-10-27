import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { set, get } from '@ember/object';

/**
  `login-form` composes the login form, and makes the required calls to
  handle user authentication.

  ## default usage

  ```handlebars
  {{login-form}}
  ```

  @class login-form
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['form--centered', 'login-form'],

  /**
    @property session
    @type Ember.Service
   */
  session: service(),

  isLoading: false,

  actions: {

    /**
      Action that calls the `session.authenticate` method to authenticate the
      user.

      @method authenticate
     */
    authenticate() {
      set(this, 'isLoading', true);

      let credentials = this.getProperties('identification', 'password');

      get(this, 'session').authenticate('authenticator:jwt', credentials).catch((reason) => {
        set(this, 'isLoading', false);
        set(this, 'errors', reason.error || reason);
      });
    }
  }
});
