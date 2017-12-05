export default {
  scope: '.project-notifications',

  callout: {
    scope: '[data-test-callout]',

    descriptionAdded: {
      scope: '[data-test-description-added]'
    },

    descriptionNeeded: {
      scope: '[data-test-description-needed]'
    },

    reviewAdded: {
      scope: '[data-test-review-added]'
    },

    reviewNeeded: {
      scope: '[data-test-review-needed]'
    },

    submitReviewButton: {
      scope: '[data-test-submit-review]'
    }
  }
};
