import testSelector from 'ember-test-selectors';
export default {
  scope: '.settings__menu',
  profileLink: {
    scope: testSelector('profile-link')
  },
  integrationsLink: {
    scope: testSelector('integrations-link')
  }
};
