import {
  attribute,
  text
} from 'ember-cli-page-object';
import userOrganizationsList from 'code-corps-ember/tests/pages/components/user-organizations-list';
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

  userOrganizationsList,

  userSidebar,

  website: {
    scope: '.website',

    link: {
      scope: 'a',
      href: attribute('href'),
      text: text()
    }
  }
};
