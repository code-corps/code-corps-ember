import {
  attribute,
  text
} from 'ember-cli-page-object';
import userProjectsList from 'code-corps-ember/tests/pages/components/user-projects-list';
import userSkillsList from 'code-corps-ember/tests/pages/components/user/skills-list';
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

  userSkillsList,

  website: {
    scope: '.website',

    link: {
      scope: 'a',
      href: attribute('href'),
      text: text()
    }
  }
};
