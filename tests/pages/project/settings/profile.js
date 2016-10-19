import {
  create,
  text,
  visitable
} from 'ember-cli-page-object';
import projectSettingsForm from '../../components/project-settings-form';

export default create({
  visit: visitable(':organization/:project/settings/profile'),

  successAlert: {
    scope: '.alert-success',
    message: text('p')
  },

  projectSettingsForm
});
