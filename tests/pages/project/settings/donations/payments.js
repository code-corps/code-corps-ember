import { create, visitable } from 'ember-cli-page-object';
import accountSetup from 'code-corps-ember/tests/pages/components/payments/account-setup';

export default create({
  visit: visitable(':organization/:project/settings/donations/payments'),
  accountSetup
});
