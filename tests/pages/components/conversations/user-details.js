import {
  attribute
} from 'ember-cli-page-object';
import userSkillsList from 'code-corps-ember/tests/pages/components/user/skills-list';

export default {
  scope: '.conversation-details',

  name: {
    scope: '[data-test-name]'
  },

  photo: {
    scope: 'img',
    url: attribute('src')
  },

  username: {
    scope: '[data-test-username]'
  },

  userSkillsList
};
