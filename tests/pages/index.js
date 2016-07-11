import {
  create,
  visitable,
  hasClass
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/'),

  isLightTheme: hasClass('light', '.main.container'),

  logOut: {
    scope: 'a.logout'
  },
  logIn: {
    scope: 'a.login'
  }
});
