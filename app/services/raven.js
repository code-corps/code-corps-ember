import RavenLogger from 'ember-cli-sentry/services/raven';

export default RavenLogger.extend({

  unhandledPromiseErrorMessage: '',

  captureException(/* error */) {
    this._super(...arguments);
  },

  captureMessage(/* message */) {
    return this._super(...arguments);
  },

  enableGlobalErrorCatching() {
    return this._super(...arguments);
  },

  ignoreError(error) {
    // Ember 2.X seems to not catch `TransitionAborted` errors caused by
    // regular redirects. We don't want these errors to show up in Sentry
    // so we have to filter them ourselves.
    //
    // Once this issue https://github.com/emberjs/ember.js/issues/12505 is
    // resolved we can remove this code.
    return error.name === 'TransitionAborted';
  },

  callRaven(/* methodName, ...optional */) {
    return this._super(...arguments);
  }
});
