import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/github/unconnected-installation';

const { set, setProperties, run } = Ember;

let page = PageObject.create(component);

function renderPage() {
  page.render(hbs`
    {{github/unconnected-installation
      connect=(action connect)
      githubAppInstallation=githubAppInstallation
      organization=organization
    }}
  `);
}

function setHandlers(context, connect = () => {}) {
  set(context, 'connect', connect);
}

moduleForComponent('github/unconnected-installation', 'Integration | Component | github/unconnected installation', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    setHandlers(this);
  },
  afterEach() {
    page.removeContext();
  }
});

const githubAppInstallation = {
  githubAccountLogin: 'foo-login',
  githubAccountAvatarUrl: 'foo-url',
  githubRepos: []
};

const organization = { name: 'Organization' };

test('renders correct elements for provided github app installation', function(assert) {
  assert.expect(3);

  setProperties(this, { githubAppInstallation, organization });
  renderPage();

  assert.ok(page.avatar.url.indexOf('foo-url') > -1, 'Avatar url is rendered.');
  assert.equal(page.login.text, 'foo-login', 'Account login is rendered.');
  assert.ok(page.connect.text.indexOf(organization.name, 'Organization name is rendered on button.') > -1);
});

test('triggers/passes out all actions action', function(assert) {
  assert.expect(1);

  setProperties(this, { githubAppInstallation, organization });
  setHandlers(this, () => {
    assert.ok('Connect action was called.');
  });

  renderPage();

  run(() => page.connect.click());
});
