import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/github-connect';
import setupSession from 'ember-simple-auth/initializers/setup-session';
import setupSessionService from 'ember-simple-auth/initializers/setup-session-service';

const { get, set } = Ember;
const baseUrl = 'https://github.com/login/oauth/authorize';

let page = PageObject.create(component);

moduleForComponent('github-connect', 'Integration | Component | github connect', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    setupSession(this.registry);
    setupSessionService(this.registry);
  },
  afterEach() {
    page.removeContext();
  }
});

test('binds href correctly', function(assert) {
  set(this, 'scope', '3098379083');
  set(this, 'clientId', 'ace');
  set(this, 'redirectUri', 'ace.com');
  page.render(hbs`{{github-connect scope=scope clientId=clientId state=state redirectUri=redirectUri}}`);

  let session = this.container.lookup('service:session');
  let { githubState } = get(session, 'data');
  assert.equal(page.button.href, `${baseUrl}?scope=3098379083&client_id=ace&state=${githubState}&redirect_uri=ace.com`);
});
