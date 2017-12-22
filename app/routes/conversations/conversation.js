import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { CanMixin } from 'ember-can';
import ConversationRouteMixin from 'code-corps-ember/mixins/conversation-route';

export default Route.extend(AuthenticatedRouteMixin, CanMixin, ConversationRouteMixin, {
  conversationChannel: service(),
  store: service(),

  async model(params) {
    let conversation = await get(this, 'store').findRecord('conversation', params.id);
    await get(conversation, 'conversationParts');
    return conversation;
  },

  actions: {
    willTransition() {
      let conversation = get(this, 'controller.conversation');
      let conversationChannel = get(this, 'conversationChannel');
      conversationChannel.leave(conversation);
    }
  }
});
