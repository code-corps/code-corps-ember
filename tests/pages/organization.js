import {
  clickable,
  collection,
  create,
  fillable,
  hasClass,
  text,
  visitable
} from 'ember-cli-page-object';

export default create({
  visitIndex: visitable(':organization'),
  visitSettingsProfile: visitable('organizations/:organization/settings/profile'),

  name: fillable('[name=name]'),
  description: fillable('[name=description]'),
  clickSave: clickable('.save'),

  successAlerts: collection({
    scope: '.alert-success',
    item: {
      scope: 'p'
    }
  }),

  clickSettingsMenuItem: clickable('.organization-menu li a:contains("Settings")'),
  
  projectsMenuItemIsActive: hasClass('active', '.organization-menu li a:contains("Projects")'),
  
  settingsMenuItemIsActive: hasClass('active', '.organization-menu li a:contains("Settings")'),

  orgHeader: {
    scope: '.organization-header'
  },

  projectList: {
    scope: '.project-list'
  },

  orgMembersSection: {
    scope: '.organization-members'
  },

  orgMembers: collection({
    scope: '.organization-members li'
  }),

  settingsForm: {
    scope: '.organization-settings-form'
  },

  orgTitle: {
    scope: 'h2'
  },

  orgDescription: {
    scope: 'p.description'
  },

  projectListItems: collection({
    scope: '.project-list .project-item',
    itemScope: 'h4 a',
    item: {
      text: text(),
      click: clickable()
    }
  }),

  projectDetails: {
    scope: '.project-details'
  }
});
