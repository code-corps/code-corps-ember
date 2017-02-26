import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { getFlashMessageCount } from 'code-corps-ember/tests/helpers/flash-message';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/project-settings-form';

const { getOwner, RSVP, set } = Ember;

let page = PageObject.create(component);

moduleForComponent('project-settings-form', 'Integration | Component | project settings form', {
  integration: true,
  beforeEach() {
    getOwner(this).lookup('service:flash-messages').registerTypes(['success']);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

let project = {
  title: 'Test Project',
  description: 'A test project'
};

test('it renders form elements properly', function(assert) {
  assert.expect(3);

  set(this, 'project', project);

  page.render(hbs`{{project-settings-form project=project}}`);

  assert.equal(page.title.value, 'Test Project');
  assert.equal(page.description.value, 'A test project');
  assert.ok(page.save.isVisible);
});

test('it calls save on project when save button is clicked', function(assert) {
  assert.expect(2);

  project.save = function() {
    assert.ok(true, 'Save method was called on project');
    return RSVP.resolve();
  };

  set(this, 'project', project);

  page.render(hbs`{{project-settings-form project=project}}`);

  page.save.click();

  assert.equal(getFlashMessageCount(this), 1, 'A flash message was shown');
});
