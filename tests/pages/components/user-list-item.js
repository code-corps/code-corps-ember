import {
  attribute,
  clickable,
  collection,
  isVisible,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.user-list-item',

  approveButton: {
    scope: 'button.default',
    click: clickable(),
    isVisible: isVisible(),
    text: text()
  },

  denyButton: {
    scope: 'button.danger',
    click: clickable(),
    isVisible: isVisible(),
    text: text()
  },

  icon: {
    scope: '.icon',
    url: attribute('src')
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
      scope: 'strong',
      text: text()
    },
    username: {
      scope: 'span',
      text: text()
    }
  },

  skills: collection({
    scope: '[data-test-project-user-skills]',
    itemScope: 'li',
    item: {
      text: text()
    }
  })
};
