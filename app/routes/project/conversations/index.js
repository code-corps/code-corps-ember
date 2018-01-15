import { get } from '@ember/object';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  redirect(model, transition) {
    let { conversations } = this.modelFor('project.conversations');

    // If status changed on one conversation, the model did not update
    // We filter here to ensure the statuses are filtered
    let status = transition.queryParams.status || 'open';
    let filteredConversations = conversations.filterBy('status', status);

    if (get(filteredConversations, 'length') > 0) {
      let sortedConversations = filteredConversations.sortBy('updatedAt');
      this.transitionTo('project.conversations.conversation',  get(sortedConversations, 'lastObject'));
    }
  }
});
