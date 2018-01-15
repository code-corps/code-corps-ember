import {
  clickable,
  create,
  fillable,
  triggerable,
  visitable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/signup'),

  form: {
    scope: '.signup-form',
    email: fillable('[name=email]'),
    keydownEmail: triggerable('keydown', '[name=email]'),
    keydownUsername: triggerable('keydown', '[name=username]'),
    password: fillable('[name=password]'),
    save: clickable('[name=signup]'),
    username: fillable('[name=username]')
  }
});
