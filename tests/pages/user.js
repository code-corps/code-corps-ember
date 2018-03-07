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

  projects: collection('.user-projects-list li h4 a', {
    click: clickable(),
    href: attribute('href')
  }),

  userDetails
});
