import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { CanMixin } from 'ember-can';

export default Route.extend(AuthenticatedRouteMixin, CanMixin, {
  conversationChannel: service(),
  store: service(),

  async model(params) {
    let conversation = await get(this, 'store').findRecord('conversation', params.id);
    await get(conversation, 'conversationParts');
    return conversation;
  },

  afterModel(model) {
    let conversation = model;
    let conversationChannel = get(this, 'conversationChannel');
    conversationChannel.join(conversation);
  },

  actions: {
    willTransition() {
      let conversation = this.controller.get('conversation');
      let conversationChannel = get(this, 'conversationChannel');
      conversationChannel.leave(conversation);
    }
  }
});
