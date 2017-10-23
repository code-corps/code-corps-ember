import {
  create,
  visitable,
  hasClass
} from 'ember-cli-page-object';
import navMenu from './components/navigation-menu';
import siteFooter from './components/site-footer';
import spriteMap from './components/svg/sprite-map';

export default create({
  visit: visitable('/'),

  isLightTheme: hasClass('code-theme--light', '.site-content'),

  navMenu,
  siteFooter,
  spriteMap
});
