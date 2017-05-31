import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:application', 'Unit | Controller | application', {
  needs: [
    'service:code-theme',
    'service:metrics',
    'service:onboarding',
    'service:project-task-board',
    'service:session'
  ]
});

test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it correctly invalidate the session', function(assert) {
  let controller = this.subject();
  controller.session = {
    invalidate() {
      assert.ok(true);
    }
  };
  controller.send('invalidateSession');
});
