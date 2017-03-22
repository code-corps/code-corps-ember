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

  close() {
    // Without this check, tests are throwing
    // errors on "calling set on destroyed object"
    // There must be some sort of async behavior related to ember-modal-dialog
    // we are not understanding.
    if (this && !get(this, 'isDestroying')) {
      set(this, 'showModal', false);
    }
  },

  closeOnEsc: on(keyDown('Escape'), function() {
    get(this, 'close')();
  }),

  actions: {
    joinProject(project) {
      get(this, 'projectUser').joinProject(project);
    }
  }
});
