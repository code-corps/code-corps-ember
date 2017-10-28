import progressBar from 'code-corps-ember/tests/pages/components/progress-bar';
import spriteIcon from 'code-corps-ember/tests/pages/components/svg/sprite-icon';

export default {
  scope: '.github__repo-sync',

  progressBar,

  progressText: {
    scope: '[data-test-text]'
  },

  spriteIcon
};
