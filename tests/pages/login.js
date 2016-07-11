import {
  create,
  visitable,
} from 'ember-cli-page-object';
import form from './components/login-form';

export default create({
  visit: visitable('/login'),

  form,
  logOut: {
    scope: 'a.logout'
  },
});
