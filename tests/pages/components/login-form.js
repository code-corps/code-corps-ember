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
    itemScope: 'p.error'
  }),

  loginSuccessfully(email, password) {
    this
      .username(email)
      .password(password)
      .submit();
  },
  loginUnsuccessfully(email, password) {
    this
      .username(email)
      .password(password)
      .submit();
  }
};
