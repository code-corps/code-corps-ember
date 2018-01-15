import {
  attribute,
  clickable,
  isVisible,
  text
} from 'ember-cli-page-object';

import newConversationModal from 'code-corps-ember/tests/pages/components/conversations/new-conversation-modal';
import projectUserRoleModal from 'code-corps-ember/tests/pages/components/project-user-role-modal';

export default {
  scope: '.user-list-item',

  approveButton: {
    scope: '[data-test-approve]',
    click: clickable(),
    isVisible: isVisible()
  },

  denyButton: {
    scope: '[data-test-deny]',
    click: clickable(),
    isVisible: isVisible()
  },

  icon: {
    scope: '.icon',
    url: attribute('src')
  },

  name: {
    scope: '[data-test-project-user-name]',
    name: {
      scope: 'a',
      text: text()
    }
  },

  newConversationModal,

  projectUserRoleModal
};
