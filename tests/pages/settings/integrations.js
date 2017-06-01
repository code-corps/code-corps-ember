import { create, visitable } from 'ember-cli-page-object';
import githubConnectButton from 'code-corps-ember/tests/pages/components/github-connect';

export default create({
  visit: visitable('/settings/integrations'),

  githubConnectButton
});
