import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

const {
  Object,
  RSVP
} = Ember;

moduleFor('service:current-user', 'Unit | Service | current user', {
  // Specify the other units that are required for this test.
  needs: ['service:session']
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
  assert.expect(3);
  let service = this.subject({
    metrics: {
      identify(user) {
        assert.equal(user.distinctId, 1);
      }
    },
    store: {
      findRecord() {
        return RSVP.resolve(Object.create({ id: 1 }));
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
    assert.equal(user.get('id'), 1);
    assert.equal(service.get('user'), user);
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
