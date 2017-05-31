import Ember from 'ember';
import { EKMixin as EmberKeyboardMixin, keyDown } from 'ember-keyboard';

const {
  Component,
  computed: { alias },
  get,
  inject: { service },
  on,
  set
} = Ember;

export default Component.extend(EmberKeyboardMixin, {
  classNames: ['project-join-modal-container'],
  /**
   * Flag indicating if the modal to quickly join a project should be shown
   * Even if true, the modal will not be shown if there is a
   * currentProjectMembership
   *
   * @property showModal
   * @type {Boolean}
   */
  showModal: false,

  currentUser: service(),
  projectUser: service(),

  user: alias('currentUser.user'),

  init() {
    this._super(...arguments);
    set(this, 'keyboardActivated', true);
  },

  closeOnEsc: on(keyDown('Escape'), function() {
    set(this, 'showModal', false);
  }),

  actions: {
    joinProject(project) {
      get(this, 'projectUser').joinProject(project);
    }
  }
});
