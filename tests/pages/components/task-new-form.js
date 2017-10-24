import selectGithubRepo from 'code-corps-ember/tests/pages/components/select/github-repo';

import {
  attribute
} from 'ember-cli-page-object';

export default {
  callout: {
    scope: '[data-test-callout]'
  },

  markdown: {
    scope: '[name=markdown]',
    placeholder: attribute('placeholder')
  },

  saveButton: {
    scope: 'input[name=submit]'
  },

  selectGithubRepo,

  title: {
    scope: '[name=title]'
  }
};
