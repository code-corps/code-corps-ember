import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

const {
  get,
  RSVP
} = Ember;

moduleFor('service:current-user', 'Unit | Service | current user', {
  // Specify the other units that are required for this test.
  needs: [
    'service:metrics',
    'service:session'
  ]
});

test('it returns null for loadCurrentUser when there is no user', function(assert) {
  assert.expect(1);
  let service = this.subject();
  let done = assert.async();
  service.loadCurrentUser().then((user) => {
    assert.equal(user, null);
    done();
  });
});

test('it sets the user when there is a user', function(assert) {
  assert.expect(4);
  let service = this.subject({
    metrics: {
      identify(user) {
        assert.equal(user.distinctId, 1);
        assert.deepEqual(user.segmentContext, {
          Intercom: {
            user_hash: 'abc123'
          }
        });
      }
    },
    store: {
      findRecord() {
        return RSVP.resolve({ id: 1, intercomUserHash: 'abc123' });
      }
    },
    session: {
      session: {
        authenticated: {
          user_id: 1
        }
      }
    }
  });

  let done = assert.async();
  service.loadCurrentUser().then((user) => {
    assert.equal(get(user, 'id'), 1);
    assert.equal(get(service, 'user'), user);
    done();
  });
});

test('it rejects when the user is not returned from the store', function(assert) {
  assert.expect(1);
  let service = this.subject({
    store: {
      find() {
        return RSVP.reject();
      }
    },
    session: {
      session: {
        authenticated: {
          user_id: 1
        }
      }
    }
  });

  let done = assert.async();
  service.loadCurrentUser().catch(() => {
    assert.ok(true);
    done();
  });
});
