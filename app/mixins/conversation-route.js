import { get, set } from '@ember/object';
import { alias, readOnly } from '@ember/object/computed';
import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({
  conversationChannel: service(),
  currentUser: service(),
  store: service(),
  userIdle: service(),

  conversation: null,

  isIdle: readOnly('userIdle.isIdle'),
  user: alias('currentUser.user'),

  async afterModel(model) {
    let conversation = model;

    this.attemptToMarkAsRead();

    let conversationChannel = get(this, 'conversationChannel');
    let channel = await conversationChannel.join(conversation);

    get(this, 'userIdle').on('idleChanged', this, this.idleHandler);
    channel.on('new:conversation-part', () => this.refreshModel());

    this._super(...arguments);
  },

  async attemptToMarkAsRead() {
    let isIdle = get(this, 'isIdle');
    if (isIdle) {
      return; // Exit early since the user's idle
    }

    let conversation = this.modelFor(this.routeName);
    let conversationReadAt = get(conversation, 'readAt');
    let userId = get(this, 'user.id');

    if (conversationReadAt) {
      // The conversation is read, so check to see if there are unread
      // conversation parts
      get(conversation, 'conversationParts').then((conversationParts) => {
        let otherParts = conversationParts.rejectBy('authorId', userId);
        let latestPart = get(otherParts, 'lastObject');
        let readAt = get(latestPart, 'readAt');
        let authorId = get(latestPart, 'authorId');

        if (!readAt && authorId !== userId) {
          // The conversation part is unread and the user is not the author
          this.markAsRead(conversation);
        }
      });
    } else {
      let message = await get(conversation, 'message');
      let isAdminMessage = get(message, 'initiatedBy') === 'admin';

      if (isAdminMessage) {
        if (userId === get(conversation, 'user.id')) {
          // The message was sent by an admin and the user is the target
          this.markAsRead(conversation);
        }
      } else {
        if (userId !== get(message, 'authorId')) {
          // The message was sent to the project and the user did not author it
          this.markAsRead(conversation);
        }
      }
    }
  },

  idleHandler(isIdle) {
    if (!isIdle) {
      this.attemptToMarkAsRead();
    }
  },

  markAsRead(conversation) {
    set(conversation, 'read', true);
    conversation.save();
  },

  refreshModel() {
    let conversation = this.modelFor(this.routeName);
    conversation.reload().then(() => this.attemptToMarkAsRead());
  }
});
