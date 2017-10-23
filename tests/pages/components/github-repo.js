export default {
  scope: '.github-repo',

  loading: {
    scope: '[data-test-loading]'
  },

  name: {
    scope: '[data-test-github-repo-name]'
  },

  actions: {
    scope: '[data-test-github-repo-actions]',

    connect: {
      scope: '[data-test-connect-repo]'
    },

    disconnect: {
      scope: '[data-test-disconnect-repo]'
    }
  }
};
