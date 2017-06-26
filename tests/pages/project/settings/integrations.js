import { create, visitable } from 'ember-cli-page-object';
import testSelector from 'ember-test-selectors';

export default create({
  visit: visitable(':organization/:project/settings/integrations'),
  integrationsLink: {
    scope: testSelector('integrations-link')
  },
  installationLink: {
    scope: testSelector('installation-link')
  }
});
