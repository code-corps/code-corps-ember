import {
  collection,
  create,
  visitable,
  isVisible,
  text
} from 'ember-cli-page-object';
import userListItem from 'code-corps-ember/tests/pages/components/user-list-item';

export default create({
  visit: visitable('/:project_organization_slug/:project_slug/people'),

  adminSection: {
    scope: '.people-list--admin',
    users: collection('li', userListItem),
    isEmpty: isVisible('.people-list--empty')
  },

  pendingSection: {
    scope: '.people-list--pending',
    users: collection('li', userListItem),
    isEmpty: isVisible('.people-list--empty')
  },

  projectMenu: {
    scope: '.project__menu',
    peopleLink: {
      scope: '[data-test-project-people-link]',
      infoText: text('.info'),
      infoVisible: isVisible('.info')
    }
  },

  contributorSection: {
    scope: '.people-list--contributor',
    users: collection('li', userListItem),
    isEmpty: isVisible('.people-list--empty')
  },

  ownerSection: {
    scope: '.people-list--owner',
    users: collection('li', userListItem),
    isEmpty: isVisible('.people-list--empty')
  }
});
