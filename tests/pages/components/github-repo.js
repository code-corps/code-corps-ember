import repoDisconnectConfirmModal from 'code-corps-ember/tests/pages/components/github/repo-disconnect-confirm-modal';
import repoSync from 'code-corps-ember/tests/pages/components/github/repo-sync';
export default {
  scope: '.github-repo',

  actions: {
    scope: '[data-test-github-repo-actions]',

    close: {
      scope: '[data-test-close-repo-settings]'
    },

    connect: {
      scope: '[data-test-open-repo-settings-connect]'
    },

    edit: {
      scope: '[data-test-open-repo-settings-edit]'
    }

  },

  callout: {
    scope: '[data-test-callout]',

    button: {
      scope: 'button'
    },

    title: {
      scope: '[data-test-callout-title]'
    },

    repoDisconnectConfirmModal
  },

  loading: {
    scope: '[data-test-loading]'
  },

  name: {
    scope: '[data-test-github-repo-name]'
  },

  otherProject: {
    scope: '[data-test-repo-project]'
  },

  repoSync
};
