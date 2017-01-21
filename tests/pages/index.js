import {
  create,
  visitable,
  hasClass
} from 'ember-cli-page-object';
import navMenu from './components/navigation-menu';
import siteFooter from './components/site-footer';

export default create({
  visit: visitable('/'),

  isLightTheme: hasClass('code-theme--light', '.main.container'),

  navMenu,
  siteFooter
});
