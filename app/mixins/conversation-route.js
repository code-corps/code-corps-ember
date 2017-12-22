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
    let targetId = get(conversation, 'user.id');
    let message = await get(conversation, 'message');
    let isAdminMessage = get(message, 'initiatedBy') === 'admin';
    let userIsTarget = userId === targetId;

    if (conversationReadAt) {
      // The conversation is read, so check to see if there are unread
      // conversation parts
      get(conversation, 'conversationParts').then((conversationParts) => {
        // Remove all parts where the user is the author
        let otherParts = conversationParts.rejectBy('authorId', userId);

        // Get the most recent part
        let latestPart = get(otherParts, 'lastObject');

        if (get(latestPart, 'readAt')) {
          return; // Exit early since the most recent part is already read
        }

        let authorId = get(latestPart, 'authorId');
        let userIsNotAuthor = authorId !== userId;
        let authorIsTarget = authorId === targetId;

        if (userIsTarget && userIsNotAuthor) {
          // The user is the target and the part was not written by them
          this.markAsRead(conversation);
        }

        if (!userIsTarget && authorIsTarget) {
          // The user is a project admin and the part was written by the target
          this.markAsRead(conversation);
        }
      });
    } else {
      if (isAdminMessage) {
        if (userIsTarget) {
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
