import {
  attribute
} from 'ember-cli-page-object';

import projectCategoriesList from 'code-corps-ember/tests/pages/components/project-categories-list';
import relatedSkills from 'code-corps-ember/tests/pages/components/related-skills';

export default {
  scope: '.conversation-details',

  description: {
    scope: '[data-test-description]'
  },

  icon: {
    scope: 'img',
    url: attribute('src')
  },

  projectCategoriesList,

  relatedSkills,

  title: {
    scope: '[data-test-title]'
  }
};
