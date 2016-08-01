import Ember from 'ember';

const {
  Component,
  get,
  inject,
  set,
} = Ember;

const { service } = inject;

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
  classNames: ['login-form'],

  /**
    @property session
    @type Ember.Service
   */
  session: service(),

  actions: {

    /**
      Action that calls the `session.authenticate` method to authenticate the
      user.

      @method authenticate
     */
    authenticate() {
      let { identification, password } = this.getProperties('identification', 'password');

      get(this, 'session').authenticate('authenticator:oauth2', identification, password).catch((reason) => {
        set(this, 'errors', reason.error || reason);
      });
    },
  },
});
