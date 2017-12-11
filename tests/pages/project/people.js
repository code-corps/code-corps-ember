import {
  collection,
  create,
  visitable,
  isVisible,
  text
} from 'ember-cli-page-object';
import userListItem from 'code-corps-ember/tests/pages/components/user-list-item';

function peopleList(role) {
  return collection({
    scope: `.people-list--${role}`,
    itemScope: 'li',
    item: userListItem,

    isEmpty: isVisible('.people-list--empty')
  });
}

export default create({
  visit: visitable('/:project_organization_slug/:project_slug/people'),

  admins: peopleList('admin'),
  pendingContributors: peopleList('pending'),

  projectMenu: {
    scope: '.project__menu',
    peopleLink: {
      scope: '[data-test-project-people-link]',
      infoText: text('.info'),
      infoVisible: isVisible('.info')
    }
  },

  others: peopleList('contributor'),
  owners: peopleList('owner')
});
