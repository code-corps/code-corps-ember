import { collection, create, visitable } from 'ember-cli-page-object';
import connectedInstallation from 'code-corps-ember/tests/pages/components/github/connected-installation';
import installLink from 'code-corps-ember/tests/pages/components/github/install-link';
import unconnectedInstallation from 'code-corps-ember/tests/pages/components/github/unconnected-installation';

export default create({
  visit: visitable(':organization/:project/settings/integrations'),

  integrationsLink: {
    scope: '[data-test-integrations-link]'
  },

  installLink,
  connectedInstallations: collection('.github-app-installation.connected', connectedInstallation),
  unconnectedInstallations: collection('.github-app-installation.unconnected', unconnectedInstallation)
});
