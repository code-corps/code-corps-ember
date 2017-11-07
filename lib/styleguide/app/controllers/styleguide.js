import Ember from 'ember';

export default Ember.Controller.extend({
  heading: 'power-select',
  test: ['1', '2', '3'],
  selectedComponent: 'busy-model-wrapper',
  componentList: [{
    groupName: 'common',
    options: ['busy-model-wrapper']
  }, {
    groupName: 'donation',
    options: ['card-item', 'card-logo', 'donation-container', 'project-header']
  }, {
    groupName: 'donations',
    options: ['create-donation', 'donation-amount-button', 'donation-progress',
      'donation-status', 'show-donation']
  }, {
    groupName: 'github',
    options: ['connected-installation', 'install-link', 'issue-link',
      'pull-request-icon']
  }, {
    groupName: 'password',
    options: ['forget-password', 'reset-password']
  }, {
    groupName: 'payments',
    options: [{
      groupName: 'funds-recipient',
      options: ['details-form', 'identity-document-file-upload']
    }, 'account-setup', 'bank-account', 'contact-info', 'create-info',
      'donation-goals', 'funds-recipient']
  }, {
    groupName: 'power-select',
    options: ['before-task-options']
  }, {
    groupName: 'project-card',
    options: ['donation-progress', 'project-users']
  }, {
    groupName: 'select',
    options: ['birth-date', 'country-select', 'github-repo', 'state-select']
  }, {
    groupName: 'select-inline-dropdown',
    options: ['list-item']
  }, {
    groupName: 'svg',
    options: ['sprite-icon', 'sprite-map']
  }, {
    groupName: 'task',
    options: [{
      groupName: 'sidebar',
      options: ['integration-section']
    }]
  }, {
    groupName: 'task-card',
    options: [{
      groupName: 'user',
      options: ['selected-item', 'unselected-item']
    }]
  }, {
    groupName: 'user',
    options: ['display-username']
  }, 'animated-high-five', 'categories-list', 'category-item',
    'code-theme-selector', 'comment-item', 'create-comment-form',
    'demo-categories', 'demo-category-item', 'demo-projects', 'demo-skills',
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
    'volunteer-headshot'],

    actions: {
      selectComponent(selectedComponent) {
        console.log('component: ', selectedComponent);
      }
    }
});
