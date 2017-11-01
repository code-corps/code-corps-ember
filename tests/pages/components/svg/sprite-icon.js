import {
  attribute,
  hasClass
} from 'ember-cli-page-object';

const ICONS = {
  comments: 'comments-48',
  githubComments: 'github-comments-48',
  githubIssue: 'github-issue-48',
  githubLogo: 'github-48',
  githubMerge: 'github-merge-48',
  githubPullRequest: 'github-pull-request-48',
  githubRepo: 'github-repo-48',
  githubRepoClone: 'github-repo-clone-48',
  githubRepoPull: 'github-repo-pull-48',
  tasks: 'tasks-48'
};

export default {
  scope: '.sprite-icon',

  isComments: {
    isDescriptor: true,
    get() {
      return this.svg.use.xlinkHref.indexOf(ICONS.comments) > -1;
    }
  },

  isGithubComments: {
    isDescriptor: true,
    get() {
      return this.svg.use.xlinkHref.indexOf(ICONS.githubComments) > -1;
    }
  },

  isGithubIssue: {
    isDescriptor: true,
    get() {
      return this.svg.use.xlinkHref.indexOf(ICONS.githubIssue) > -1;
    }
  },

  isGithubLogo: {
    isDescriptor: true,
    get() {
      return this.svg.use.xlinkHref.indexOf(ICONS.githubLogo) > -1;
    }
  },

  isGithubMerge: {
    isDescriptor: true,
    get() {
      return this.svg.use.xlinkHref.indexOf(ICONS.githubMerge) > -1;
    }
  },

  isGithubPullRequest: {
    isDescriptor: true,
    get() {
      return this.svg.use.xlinkHref.indexOf(ICONS.githubPullRequest) > -1;
    }
  },

  isGithubRepo: {
    isDescriptor: true,
    get() {
      return this.svg.use.xlinkHref.indexOf(ICONS.githubRepo) > -1;
    }
  },

  isGithubRepoClone: {
    isDescriptor: true,
    get() {
      return this.svg.use.xlinkHref.indexOf(ICONS.githubRepoClone) > -1;
    }
  },

  isGithubRepoPull: {
    isDescriptor: true,
    get() {
      return this.svg.use.xlinkHref.indexOf(ICONS.githubRepoPull) > -1;
    }
  },

  isTasks: {
    isDescriptor: true,
    get() {
      return this.svg.use.xlinkHref.indexOf(ICONS.tasks) > -1;
    }
  },

  svg: {
    scope: 'svg',

    hasClass,

    isSolidBlack: hasClass('solid-black'),
    isSolidBlue: hasClass('solid-blue'),
    isSolidDarkBlue: hasClass('solid-dark-blue'),
    isSolidGreen: hasClass('solid-green'),
    isSolidLightGray: hasClass('solid-light-gray'),
    isSolidPurple: hasClass('solid-purple'),
    isSolidRed: hasClass('solid-red'),
    isSolidWhite: hasClass('solid-white'),

    use: {
      scope: 'use',
      xlinkHref: attribute('xlink:href')
    }
  }
};
