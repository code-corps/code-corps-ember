import {
  clickable,
  collection,
  create,
  text,
  visitable
} from 'ember-cli-page-object';
import categoryCheckboxes from '../../components/category-checkboxes';
import projectSettingsForm from '../../components/project-settings-form';
import skillsTypeahead from '../../components/skills-typeahead';

export default create({
  visit: visitable(':organization/:project/settings/profile'),

  categoryCheckboxes,
  projectSettingsForm,

  projectSkillsList: collection({
    scope: '.project-skills-list',
    itemScope: 'button',
    item: {
      text: text(),
      click: clickable()
    }
  }),

  skillsTypeahead,

  successAlert: {
    scope: '.flash-messages--full-width .alert-success',
    message: text('p')
  }
});
