import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { set, get } from '@ember/object';
import EmberCan from 'ember-can';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Confirm from 'code-corps-ember/mixins/confirm';

export default Route.extend(AuthenticatedRouteMixin, Confirm, {
  modelName: 'task',

  currentUser: service(),

  ability: EmberCan.computed.ability('organization', 'membership'),

  /**
   * model - Route lifecycle hook
   *
   * @return {RSVP.hash}  promise hash containing the project,
   * the task type for the new task and the current user
   */
  model() {
    let project = this.modelFor('project').reload();
    let user = get(this, 'currentUser.user');

    return RSVP.hash({ project, user });
  },

  /**
   * setupController - Route lifecycle hook
   *
   * Takes the project, task type and user and initializes a new, unsaved task instance.
   * Sets the controller property for `task
   *
   * @param  {Ember.Controller} controller The associated controller instance
   * @param  {DS.Model} project            The currently loaded project
   * @param  {DS.Model} user               The currently authenticated user
   */
  setupController(controller, { project, user }) {
    let store = get(this, 'store');
    let task = store.createRecord('task', { project, user });

    set(controller, 'task', task);
    set(controller, 'selectedRepo', null);
    set(controller, 'unsavedTaskSkills', []);
  }
});
