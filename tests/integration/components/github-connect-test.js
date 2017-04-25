import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/github-connect';

const { set } = Ember;
const baseUrl = 'https://github.com/login/oauth/authorize';
let page = PageObject.create(component);

moduleForComponent('github-connect', 'Integration | Component | github connect', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('check if properties are bound correctly', function(assert) {
  set(this, 'scope', '3098379083');
  set(this, 'clientId', 'ace');
  set(this, 'state', 'ace123');
  set(this, 'redirectUri', 'ace.com');
  page.render(hbs`{{github-connect scope=scope clientId=clientId state=state redirectUri=redirectUri}}`);
  assert.equal(page.button.href, `${baseUrl}?scope=3098379083&client_id=ace&state=ace123&redirect_uri=ace.com`);
});

