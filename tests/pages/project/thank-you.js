import { create, visitable } from 'ember-cli-page-object';
import thankYouContainer from 'code-corps-ember/tests/pages/components/thank-you-container';

export default create({
  visit: visitable(':organization/:project/thank-you'),

  thankYouContainer
});
