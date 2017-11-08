import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:start/skills', 'Unit | Controller | start/skills', {
  needs: [
    'service:current-user',
    'service:metrics',
    'service:onboarding',
    'service:router-scroll',
    'service:scheduler',
    'service:user-skills-list'
  ]
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
