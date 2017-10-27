import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.modelFor('project').reload();
  },

  renderTemplate() {
    this.render('project/thank-you', { into: 'application' });
  }
});
