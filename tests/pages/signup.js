import {
  clickable,
  create,
  fillable,
  visitable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/signup'),

  form: {
    scope: '.signup-form',
    email: fillable('[name=email]'),
    password: fillable('[name=password]'),
    save: clickable('[name=signup]'),
    username: fillable('[name=username]')
  }
});
