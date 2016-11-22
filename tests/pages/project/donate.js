import { clickable, create, is, visitable } from 'ember-cli-page-object';
import cardList from '../components/donation/card-list';
import creditCard from '../components/donation/credit-card';
import errorFormatter from '../components/error-formatter';

export default create({
  visit: visitable(':organization/:project/donate'),

  clickDonate: clickable('donation-container--donate'),
  donateButtonIsDisabled: is(':disabled', 'donation-container--donate'),

  cardList,
  creditCard,
  errorFormatter
});
