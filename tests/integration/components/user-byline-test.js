import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import pageComponent from 'code-corps-ember/tests/pages/components/user-byline';
import moment from 'moment';

let page = PageObject.create(pageComponent);

function renderPage() {
  page.render(hbs`
    {{user-byline createdAt=createdAt createdFrom=createdFrom user=user}}
  `);
}

moduleForComponent('user-byline', 'Integration | Component | user byline', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders when created from Code Corps', function(assert) {
  assert.expect(3);

  set(this, 'user', { username: 'tester' });
  set(this, 'createdAt', moment().subtract(2, 'days'));
  set(this, 'createdFrom', 'code_corps');

  renderPage();

  assert.equal(page.username.text, 'tester', 'The username of the comment author renders.');
  assert.equal(page.createdAt.text, '2 days ago', 'The time ago text renders.');
  assert.equal(page.createdFrom.text, '', 'The created from text does not render.');
});

test('it renders when created from GitHub', function(assert) {
  assert.expect(3);

  set(this, 'user', { username: 'tester' });
  set(this, 'createdAt', moment().subtract(2, 'days'));
  set(this, 'createdFrom', 'github');

  renderPage();

  assert.equal(page.username.text, 'tester', 'The username of the comment author renders.');
  assert.equal(page.createdAt.text, '2 days ago', 'The time ago text renders.');
  assert.equal(page.createdFrom.text, '— from GitHub', 'The created from text renders.');
});
