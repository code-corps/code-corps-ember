import {
  clickable,
  collection,
  create,
  text,
  visitable
} from 'ember-cli-page-object';
import projectSettingsForm from '../../components/project-settings-form';
import skillsTypeahead from '../../components/skills-typeahead';

export default create({
  visit: visitable(':organization/:project/settings/profile'),

  projectSkillsList: collection({
    scope: '.project-skills-list',
    itemScope: 'button',
    item: {
      text: text(),
      click: clickable()
    }
  }),

  successAlert: {
    scope: '.alert-success',
    message: text('p')
  },

  projectSettingsForm,
  skillsTypeahead
});
