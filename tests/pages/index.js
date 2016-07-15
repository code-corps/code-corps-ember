import {
  create,
  visitable,
  hasClass
} from 'ember-cli-page-object';
import navMenu from './components/navigation-menu';

export default create({
  visit: visitable('/'),

  isLightTheme: hasClass('light', '.main.container'),

  navMenu
});
