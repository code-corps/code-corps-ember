import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';
import skillListItemLink from 'code-corps-ember/tests/pages/components/skill-list-item-link';

const {
  set
} = Ember;

let mockSession = { isAuthenticated: true };

let page = PageObject.create(skillListItemLink);

function setHandlers(context, toggleHandler = function() {}) {
  context.set('toggleHandler', toggleHandler);
}

function renderPage() {
  page.render(hbs`{{skill-list-item-link skill=skill matched=matched toggleSkill=toggleHandler}}`);
}

moduleForComponent('skill-list-item-link', 'Integration | Component | skill list item link', {
  integration: true,
  beforeEach() {
    setHandlers(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders correctly for skill', function(assert) {
  assert.expect(1);

  set(this, 'skill', { title: 'Ember.js' });
  renderPage();

  assert.equal(page.skillTitle.text, 'Ember.js', 'The skill title renders');
});

test('it renders correctly when matched', function(assert) {
  assert.expect(1);

  set(this, 'matched', true);
  renderPage();

  assert.equal(page.tooltip.text, 'Delete your skill', 'The delete text renders when matched');
});

test('it renders correctly when unmatched', function(assert) {
  assert.expect(1);

  set(this, 'matched', false);
  renderPage();

  assert.equal(page.tooltip.text, 'Add new skill', 'The add text renders when not matched');
});

test('it toggles the action when clicked and authenticated', function(assert) {
  assert.expect(1);

  stubService(this, 'session', { isAuthenticated: true });

  let skill = { title: 'Ember.js' };
  set(this, 'skill', skill);

  function toggleHandler(toggledSkill) {
    assert.deepEqual(skill, toggledSkill);
  }
  setHandlers(this, toggleHandler);
  renderPage();

  page.click();
});

test('it does not toggle the action when clicked and unauthenticated', function(assert) {
  assert.expect(0);

  stubService(this, 'session', { isAuthenticated: false });

  let skill = { title: 'Ember.js' };
  set(this, 'skill', skill);

  function toggleHandler(toggledSkill) {
    assert.deepEqual(skill, toggledSkill);
  }
  setHandlers(this, toggleHandler);

  renderPage();
  page.click();
});

test('it does not have clicked or removed classes at first', function(assert) {
  assert.expect(2);
  renderPage();
  assert.notOk(page.hasJustClicked, 'Does not have clicked class');
  assert.notOk(page.hasJustRemoved, 'Does not have removed class');
});

test('it correctly adds and removes clicked class', function(assert) {
  assert.expect(2);

  stubService(this, 'session', mockSession);
  renderPage();

  page.mouseenter();
  page.click();

  assert.ok(page.hasJustClicked, 'Added clicked class');

  page.mouseleave();
  assert.notOk(page.hasJustClicked, 'Removed clicked class');
});

test('it correctly adds and removes removed class', function(assert) {
  assert.expect(2);

  stubService(this, 'session', mockSession);
  this.render(hbs`{{skill-list-item-link matched=true toggleSkill=(action toggleHandler)}}`);

  page.mouseenter();
  page.click();
  assert.ok(page.hasJustRemoved, 'Added removed class');

  page.mouseleave();
  assert.notOk(page.hasJustRemoved, 'Removed removed class');
});

test('it does not add removed class when unmatched', function(assert) {
  assert.expect(2);

  stubService(this, 'session', mockSession);
  set(this, 'matched', false);
  renderPage();

  page.mouseenter();

  page.click();

  assert.ok(page.hasJustClicked, 'Added clicked class');
  assert.notOk(page.hasJustRemoved, 'Does not have removed class');
});
