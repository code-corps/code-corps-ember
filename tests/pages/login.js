import {
  create,
  visitable
} from 'ember-cli-page-object';
import form from './components/login-form';
import navMenu from './components/navigation-menu';

export default create({
  visit: visitable('/login'),

  form,
  navMenu
});
