import { collection, create, visitable } from 'ember-cli-page-object';
import connectedInstallation from 'code-corps-ember/tests/pages/components/github/connected-installation';
import unconnectedInstallation from 'code-corps-ember/tests/pages/components/github/unconnected-installation';

export default create({
  visit: visitable(':organization/:project/settings/integrations'),

  integrationsLink: {
    scope: '[data-test-integrations-link]'
  },

  installationLink: {
    scope: '[data-test-installation-link]'
  },

  connectedInstallations: collection({
    itemScope: '.github-app-installation.connected',
    item: connectedInstallation
  }),

  unconnectedInstallations: collection({
    itemScope: '.github-app-installation.unconnected',
    item: unconnectedInstallation
  })
});
