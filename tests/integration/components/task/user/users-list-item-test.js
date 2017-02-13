import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import pageComponent from 'code-corps-ember/tests/pages/components/task/user/users-list-item';

const { set, setProperties } = Ember;

let page = PageObject.create(pageComponent);

function renderPage() {
  page.render(hbs`
    {{task/user/users-list-item
      hover=hoverHandler
      query=query
      selectUser=selectHandler
      selected=selected
      task=task
      user=user
      userTask=userTask
    }}
  `);
}

function setHandlers(context, { hoverHandler = function() {}, selectHandler = function() {} } = {}) {
  setProperties(context, { hoverHandler, selectHandler });
}

moduleForComponent('task/user/users-list-item', 'Integration | Component | users list item', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    setHandlers(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders correct user information', function(assert) {
  assert.expect(3);

  let user = {
    photoThumbUrl: '',
    name: 'John Smith',
    username: 'coder'
  };

  set(this, 'user', user);

  renderPage();

  assert.equal(page.image.src, user.photoThumbUrl, 'Correct user image was rendered.');
  assert.equal(page.name.text, user.name, 'Correct name was rendered.');
  assert.equal(page.username.text, user.username, 'Correct username was rendered');
});

test('it renders as assigned when assigned to user', function(assert) {
  assert.expect(1);

  let user = { id: 1 };
  let userTask = { user };

  setProperties(this, { user, userTask });

  renderPage();

  assert.ok(page.assigned, 'Component is rendered as assigned.');
});

test('it renders as selected when selected', function(assert) {
  assert.expect(1);

  set(this, 'selected', true);

  renderPage();

  assert.ok(page.selected, 'Component is rendered as selected.');
});

test('it sends out user with hover action on mouseEnter', function(assert) {
  assert.expect(1);

  let user = { id: 1 };
  set(this, 'user', user);

  function hoverHandler(sentUser) {
    assert.deepEqual(user, sentUser, 'User was sent with action.');
  }

  setHandlers(this, { hoverHandler });

  renderPage();

  page.mouseEnter();
});

test('it sends out user with select action on mouseDown', function(assert) {
  assert.expect(1);

  let user = { id: 1 };
  set(this, 'user', user);

  function selectHandler(sentUser) {
    assert.deepEqual(user, sentUser, 'User was sent with action.');
  }
  setHandlers(this, { selectHandler });

  renderPage();

  page.mouseDown();
});
