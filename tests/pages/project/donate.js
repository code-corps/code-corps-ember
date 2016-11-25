import { clickable, create, is, visitable } from 'ember-cli-page-object';
import creditCard from '../components/donation/credit-card';
import errorFormatter from '../components/error-formatter';

export default create({
  visit: visitable(':organization/:project/donate'),

  clickDonate: clickable('button.donate'),
  donateButtonIsDisabled: is(':disabled', 'button.donate'),

  creditCard,
  errorFormatter
});
