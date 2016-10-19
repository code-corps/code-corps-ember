import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

const { getOwner } = Ember;

moduleFor('route:application', 'Unit | Route | application', {
  // Specify the other units that are required for this test.
  needs: [
    'service:flash-messages',
    'service:metrics',
    'service:session'
  ]
});

test('it clears flash messages on transition', function(assert) {
  assert.expect(2);

  let typesUsed = ['success'];
  let flashMessages = getOwner(this).lookup('service:flash-messages');
  flashMessages.registerTypes(typesUsed);

  let route = this.subject();

  flashMessages.success('Success!');
  assert.equal(flashMessages.get('queue.length'), 1);

  route.send('didTransition');
  assert.equal(flashMessages.get('queue.length'), 0);
});
