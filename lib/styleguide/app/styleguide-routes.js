let componentList = ['busy-model-wrapper', 'donation-card-item', 'donation-card-logo',
'donation-container', 'project-header', 'create-donation', 'donation-amount-button', 'donation-progress',
  'donation-status', 'show-donation', 'connected-installation', 'install-link', 'issue-link',
  'pull-request-icon', 'forget-password', 'reset-password', 'details-form', 'identity-document-file-upload', 'account-setup', 'bank-account', 'contact-info', 'create-info',
  'donation-goals', 'funds-recipient', 'before-task-options', 'donation-progress', 'project-users', 'birth-date', 'country-select', 'github-repo', 'state-select', 'list-item', 'sprite-icon', 'sprite-map', 'integration-section', 'selected-item', 'unselected-item', 'animated-high-five',
  'categories-list', 'category-item', 'code-theme-selector', 'comment-item',
  'create-comment-form', 'demo-categories', 'demo-category-item', 'demo-projects', 'demo-skills',
  'donation-goal-edit', 'donation-goals-activation', 'donation-goals',
  'drag-zone', 'editor-with-preview', 'error-formatter', 'error-wrapper',
  'flash-messages', 'github-connect-state', 'github-connect', 'github-repo',
  'image-drop', 'landing-subsection', 'loading-bar', 'loading-spinner',
  'login-form', 'modal-confirm', 'modal-dialog', 'navigation-menu',
  'organization-header', 'organization-menu', 'organization-profile',
  'organization-settings-form', 'organization-settings', 'pager-control',
  'progress-bar-container', 'progress-bar', 'project-card-users',
  'project-card', 'project-categories-list', 'project-category-item',
  'project-header', 'project-item', 'project-join-modal', 'project-list',
  'project-long-description', 'project-menu', 'project-settings-form',
  'project-skill-item', 'project-skills-list', 'project-users',
  'related-skills', 'project-skills-list', 'project-users', 'related-skills',
  'role-item', 'scroll-top', 'settings-menu', 'signup-email-input',
  'signup-form', 'signup-password-input', 'signup-username-input',
  'site-footer', 'skill-button', 'skill-list-item-link', 'skill-list-item',
  'skill-list-items', 'skills-textfield', 'skills-typeahead-result',
  'skills-typeahead', 'slugged-route-model-details', 'submittable-textarea',
  'task-board', 'task-card', 'task-comment-list', 'task-details',
  'task-list-cards', 'task-new-form', 'task-status-button', 'task-status',
  'task-title', 'team-member', 'thank-you-container', 'user-byline',
  'user-details', 'user-dropdown', 'user-list-item', 'user-menu',
  'user-project-list', 'user-settings-form', 'user-sidebar',
  'volunteer-headshot'
];

export default function() {
  this.route('styleguide', function() {
    componentList.forEach((routeName) => {
      this.route(routeName);
    });
  });
}
