import progressBar from 'code-corps-ember/tests/pages/components/progress-bar';
import userMenu from 'code-corps-ember/tests/pages/components/user-menu';

export default {
  // logo
  logo: {
    scope: '.header__logo a'
  },

  // navigation
  projectsLink: {
    scope: '.header-navigation__options li a:contains("Projects")'
  },

  blogLink: {
    scope: '.header-navigation__options li a:contains("Blog")'
  },

  signInLink: {
    scope: '.header-navigation__options li a:contains("Sign in")'
  },

  signUpLink: {
    scope: '.header-navigation__options li a:contains("Sign up")'
  },

  // user menu
  userMenu,

  // onboarding

  onboarding: {
    // status text
    status: {
      scope: '.onboarding__steps'
    },

    // progress bar
    progressBar,

    // link to finish signing up
    finishSigningUp: {
      scope: '.onboarding__continue a'
    }
  }
};
