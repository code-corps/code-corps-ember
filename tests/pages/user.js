import {
  attribute,
  clickable,
  collection,
  create,
  visitable
} from 'ember-cli-page-object';
import userDetails from './components/user-details';

export default create({
  visit: visitable(':username'),

  organizations: collection({
    scope: '.user-organizations-list li',
    itemScope: 'h3 a',
    item: {
      click: clickable(),
      href: attribute('href')
    }
  }),

  userDetails
});
