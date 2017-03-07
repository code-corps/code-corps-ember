import EmberCan from 'ember-can';
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  get,
  inject: { service },
  Route,
  RSVP,
  set
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
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
    set(controller, 'unsavedTaskSkills', []);
  },

  actions: {
    /**
     * willTransition - Action.
     *
     * Triggers on transitioning away from this route.
     * Prompts the user to confirm navigating away.
     *
     * If the user confirms, the currently initiated task is destroyed.
     * If the user cancels out, the transition is aborted.
     *
     * @param  {Ember.Transition} transition The initiated transition.
     */
    willTransition(transition) {
      let task = get(this, 'controller.task');

      // prompt to confirm if the user did not save
      if (get(task, ('isNew'))) {
        let confirmed = window.confirm('You will lose any unsaved information if you leave this page. Are you sure?');
        if (confirmed) {
          task.destroyRecord();
        } else {
          transition.abort();
        }
      }
    }
  }
});
