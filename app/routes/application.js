import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    // see https://github.com/emberjs/ember.js/issues/12791
    // if we don't handle the error action at application level
    // te error will continue to be thrown, causing tests to fail
    // and the error to be outputed to console, even though we technically
    // "handled" it with our application_error route/template
    error(e) {
      console.error(e);
      this.intermediateTransitionTo('application_error', e);
    }
  }
});
