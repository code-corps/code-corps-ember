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

  projects: collection({
    scope: '.user-projects-list li',
    itemScope: 'h4 a',
    item: {
      click: clickable(),
      href: attribute('href')
    }
  }),

  userDetails
});
