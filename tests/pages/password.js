import {
  create,
  visitable
} from 'ember-cli-page-object';
import forgotPasswordForm from './components/password/forgot-password';
import resetPasswordForm from './components/password/reset-password';
import errorFormatter from './components/error-formatter';

export default create({
  visitReset: visitable('/password/reset'),
  visitForgot: visitable('/password/forgot'),

  forgotPasswordForm,
  resetPasswordForm,
  errorFormatter
});
