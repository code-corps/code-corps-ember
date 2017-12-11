import Component from '@ember/component';
import { get, set } from '@ember/object';
import { and, not, notEmpty } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

const SAVE_SUCCESS = 'Your message is queued to send.';

export default Component.extend({
  classNames: ['new-conversation-modal-container'],

  showModal: false,

  initiatedBy: null,
  message: null,
  project: null,
  user: null,

  currentUser: service(),
  flashMessages: service(),
  store: service(),

  isBodyPresent: notEmpty('message.body'),
  isSubjectPresent: notEmpty('message.subject'),
  submitDisabled: not('submitEnabled'),
  submitEnabled: and('isBodyPresent', 'isSubjectPresent'),

  createConversation() {
    let store = get(this, 'store');
    let currentUser = get(this, 'currentUser.user');
    let project = get(this, 'project');
    let user = get(this, 'user');

    let message = store.createRecord('message', {
      author: currentUser,
      initiatedBy: 'admin',
      project
    });

    let conversation = store.createRecord('conversation', { user });

    get(message, 'conversations').pushObject(conversation);

    set(this, 'message', message);
  },

  discardConversation() {
    let confirmed =  window.confirm('You will lose any unsaved information if you close. Are you sure?');
    if (confirmed) {
      let message = get(this, 'message');
      get(message, 'conversations.firstObject').destroyRecord();
      message.destroyRecord();
    } else {
      // Stop the pipe by rejecting
      return RSVP.reject();
    }
  },

  actions: {
    send(message) {
      // Since it's created without an ID, the store will not detect the
      // association was saved and will keep it around.
      // We need to store a reference to it, so we can unload it on save
      let unsavedConversation = get(message, 'conversations.firstObject');

      let onSaved = () => {
        get(this, 'flashMessages').clearMessages().success(SAVE_SUCCESS);
        get(this, 'store').unloadRecord(unsavedConversation);
      };

      return message.save().then(onSaved);
    }
  }
});
