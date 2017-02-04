import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import mockRouting from '../../helpers/mock-routing';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';
import skillListItem from 'code-corps-ember/tests/pages/components/skill-list-item';

const { set } = Ember;

let mockSession = { isAuthenticated: true };

let skill = {
  title: 'Ruby'
};

let page = PageObject.create(skillListItem);

moduleForComponent('skill-list-item', 'Integration | Component | skill list item', {
  integration: true,
  setup() {
    mockRouting(this);
  },
  beforeEach() {
    stubService(this, 'user-skills-list', {
      contains() {
        return true;
      },
      find(skill) {
        return skill;
      }
    });
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders and sends an action when its hidden', function(assert) {
  assert.expect(2);

  stubService(this, 'session', mockSession);
  set(this, 'skill', skill);
  this.on('skillItemHidden', function() {
    assert.ok(true);
  });

  // Wrap in div to make it hidden
  this.render(hbs`
    <div style="height: 0; width: 0;">
      {{skill-list-item skill=skill action='skillItemHidden'}}
    </div>
  `);

  assert.equal(page.skillListItemLink.skillTitle.text, 'Ruby');
});

test('it renders and sends no action when not hidden', function(assert) {
  assert.expect(1);

  stubService(this, 'session', mockSession);
  set(this, 'skill', skill);
  this.on('skillItemHidden', function() {
    // We expect 1 less test in assert.expect()
    assert.ok(true);
  });

  this.render(hbs`{{skill-list-item skill=skill action='skillItemHidden'}}`);

  assert.equal(page.skillListItemLink.skillTitle.text, 'Ruby');
});

test('it renders the login link', function(assert) {
  assert.expect(1);
  this.render(hbs`{{skill-list-item}}`);

  stubService(this, 'session', { authenticated: false });
  assert.ok(page.rendersLogin, 'Renders the login link');
});
