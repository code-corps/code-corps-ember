import {
  clickable,
  collection,
  create,
  text,
  visitable
} from 'ember-cli-page-object';
import categoryCheckboxes from 'code-corps-ember/tests/pages/components/category-checkboxes';
import skillsTypeahead from 'code-corps-ember/tests/pages/components/skills-typeahead';
import userSettingsForm from 'code-corps-ember/tests/pages/components/user-settings-form';

export default create({
  visit: visitable('/settings/profile'),

  categoryCheckboxes,
  skillsTypeahead,

  successAlert: {
    scope: '.flash-messages--full-width .alert-success',
    message: text('p')
  },

  userSettingsForm,

  userSkillsList: collection({
    scope: '.user-skills-list',
    itemScope: 'button',
    item: {
      text: text(),
      click: clickable()
    }
  })
});
