import {
  create,
  visitable
} from 'ember-cli-page-object';
import errorWrapper from './components/error-wrapper';
import organizationProfile from './components/organization-profile';
import userDetails from './components/user-details';

export default create({
  visit: visitable(':slug'),

  errorWrapper,
  organizationProfile,
  userDetails
});
