import { alias, not } from '@ember/object/computed';
import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  codeTheme: service(),
  conversations: service(),
  onboarding: service(),
  projectTaskBoard: service(),
  session: service(),

  isNotOnboarding: not('isOnboarding'),
  isNotViewingConversations: not('isViewingConversations'),
  isNotViewingTasks: not('isViewingTasks'),
  isOnboarding: alias('onboarding.isOnboarding'),
  isViewingConversations: alias('conversations.isViewing'),
  isViewingTasks: alias('projectTaskBoard.isViewing'),

  shouldShowFooter: computed('isOnboarding', 'isViewingConversations', 'isViewingTasks', function() {
    let isOnboarding = get(this, 'isOnboarding');
    let isViewingConversations = get(this, 'isViewingConversations');
    let isViewingTasks = get(this, 'isViewingTasks');

    if (isOnboarding || isViewingConversations || isViewingTasks) {
      return false;
    } else {
      return true;
    }
  }),

  shouldShowSpacer: computed('isViewingConversations', 'isViewingTasks', function() {
    let isViewingConversations = get(this, 'isViewingConversations');
    let isViewingTasks = get(this, 'isViewingTasks');

    if (isViewingConversations || isViewingTasks) {
      return false;
    } else {
      return true;
    }
  }),

  actions: {
    invalidateSession() {
      get(this, 'session').invalidate();
    }
  }
});
