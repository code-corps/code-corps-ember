import {
  fillable,
  clickable,
  collection
} from 'ember-cli-page-object';

export default {
  scope:    '.login-form',

  username: fillable('#identification'),
  password: fillable('#password'),
  submit:   clickable('#login'),

  errors:   collection({
    itemScope: 'p.error',
  }),

  loginSuccessfully() {
    this
      .username('josh@coderly.com')
      .password('password')
      .submit();
  },
  loginUnsuccessfully() {
    this
      .username('josh@coderly.com')
      .password('wrongpassword')
      .submit();
  }
};
