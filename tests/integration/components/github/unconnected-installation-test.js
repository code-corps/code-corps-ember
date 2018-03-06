import { setProperties, set } from '@ember/object';
import { run } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/github/unconnected-installation';

let page = PageObject.create(component);

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

  this.render(hbs`
    {{github/unconnected-installation
      connect=(action connect)
      githubAppInstallation=githubAppInstallation
      organization=organization
    }}
  `);

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

  this.render(hbs`
    {{github/unconnected-installation
      connect=(action connect)
      githubAppInstallation=githubAppInstallation
      organization=organization
    }}
  `);

  run(() => page.connect.click());
});
