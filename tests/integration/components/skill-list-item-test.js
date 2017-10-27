import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import mockRouting from '../../helpers/mock-routing';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';
import skillListItem from 'code-corps-ember/tests/pages/components/skill-list-item';

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
      includes() {
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

test('it renders and sends an action when hidden', function(assert) {
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

  assert.equal(page.skillListItemSpan.text, 'Ruby');
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

  assert.equal(page.skillListItemSpan.text, 'Ruby');
});

test('it renders a link when clickable and authenticated', function(assert) {
  assert.expect(1);
  stubService(this, 'session', { isAuthenticated: true });
  this.render(hbs`{{skill-list-item isClickable=true}}`);
  assert.ok(page.skillListItemLink.isVisible, 'Renders a link');
});

test('it renders no link when clickable and unauthenticated', function(assert) {
  assert.expect(1);
  stubService(this, 'session', { isAuthenticated: false });
  this.render(hbs`{{skill-list-item isClickable=true}}`);
  assert.notOk(page.skillListItemLink.isVisible, 'Renders no link');
});
