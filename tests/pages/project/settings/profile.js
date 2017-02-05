import {
  clickable,
  collection,
  create,
  text,
  visitable
} from 'ember-cli-page-object';
import projectSettingsForm from '../../components/project-settings-form';
import skillsInput from '../../components/skills-input';

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
  skillsInput
});
