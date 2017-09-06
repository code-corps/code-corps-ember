export default {
  scope: '.github-repo',

  name: {
    scope: '[data-test-github-repo-name]'
  },

  inLoadingState: {
    isDescriptor: true,
    get() {
      return this.text.indexOf('Loading') > -1;
    }
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
