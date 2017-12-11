import {
  attribute,
  clickable,
  isVisible,
  text
} from 'ember-cli-page-object';
import newConversationModal from 'code-corps-ember/tests/pages/components/conversations/new-conversation-modal';

export default {
  scope: '.user-list-item',

  approveButton: {
    scope: '[data-test-approve]',
    click: clickable(),
    isVisible: isVisible(),
    text: text()
  },

  denyButton: {
    scope: '[data-test-deny]',
    click: clickable(),
    isVisible: isVisible(),
    text: text()
  },

  icon: {
    scope: '.icon',
    url: attribute('src')
  },

  messageButton: {
    scope: '[data-test-message]',
    click: clickable(),
    isVisible: isVisible(),
    text: text()
  },

  modal: {
    resetScope: true,
    testContainer: '.ember-modal-dialog',
    confirmButton: {
      scope: 'button.default',
      click: clickable(),
      isVisible: isVisible(),
      text: text()
    }
  },

  name: {
    scope: '[data-test-project-user-name]',
    name: {
      scope: 'a',
      text: text()
    }
  },

  newConversationModal
};
