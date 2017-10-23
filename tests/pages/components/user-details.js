import {
  attribute,
  collection,
  text
} from 'ember-cli-page-object';
import userProjectsList from 'code-corps-ember/tests/pages/components/user-projects-list';
import userSidebar from 'code-corps-ember/tests/pages/components/user-sidebar';

export default {
  scope: '.user-details',

  twitter: {
    scope: '.twitter',

    link: {
      scope: 'a',
      href: attribute('href'),
      text: text()
    }
  },

  userProjectsList,

  userSidebar,

  userSkillsList: {
    scope: '[data-test-user-skills-list]',

    skills: collection({
      itemScope: '[data-test-user-skills-list-item]'
    })
  },

  userSkillsListEmptyState: {
    scope: '[data-test-user-skills-list-empty-state]'
  },

  website: {
    scope: '.website',

    link: {
      scope: 'a',
      href: attribute('href'),
      text: text()
    }
  }
};
