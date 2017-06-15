import {
  create,
  text,
  visitable
} from 'ember-cli-page-object';
import userSettingsForm from 'code-corps-ember/tests/pages/components/user-settings-form';

export default create({
  visit: visitable('/settings/profile'),

  successAlert: {
    scope: '.alert-success',
    message: text('p')
  },

  userSettingsForm
});
