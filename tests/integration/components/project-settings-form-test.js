import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const {
  RSVP,
  Service
} = Ember;

moduleForComponent('project-settings-form', 'Integration | Component | project settings form', {
  integration: true
});

let project = {
  title: 'Test Organization',
  description: 'A test project'
};

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{project-settings-form}}`);

  assert.equal(this.$('.project-settings-form').length, 1);
});

test('it renders form elements properly', function(assert) {
  assert.expect(3);

  this.set('project', project);

  this.render(hbs`{{project-settings-form project=project}}`);

  assert.equal(this.$('input[name=title]').val(), 'Test Organization');
  assert.equal(this.$('input[name=description]').val(), 'A test project');

  assert.equal(this.$('.save').length, 1);
});

test('it calls save on project when save button is clicked', function(assert) {
  assert.expect(2);

  project.save = function() {
    assert.ok(true, 'Save method was called on project');
    return RSVP.resolve();
  };

  this.set('project', project);

  let flashServiceStub = Service.extend({
    success() {
      assert.ok(true, 'Flash message service was called');
    }
  });

  this.register('service:flash-messages', flashServiceStub);

  this.render(hbs`{{project-settings-form project=project}}`);

  this.$('.save').click();
});
