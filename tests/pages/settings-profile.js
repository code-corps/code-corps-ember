import {
  create,
  text,
  visitable
} from 'ember-cli-page-object';
import userSettingsForm from './components/user-settings-form';

export default create({
  visit: visitable('/settings/profile'),

  successAlert: {
    scope: '.alert-success',
    message: text('p')
  },

  userSettingsForm
});
