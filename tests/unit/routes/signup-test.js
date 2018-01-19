import { moduleFor, test } from 'ember-qunit';

moduleFor('route:signup', 'Unit | Route | signup', {
  needs: [
    'service:metrics',
    'service:router-scroll',
    'service:scheduler',
    'service:session',
    'service:site-footer'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('it renders errors through controller', function(assert) {
  let route = this.subject({
    controller: {
      signup: {}
    }
  });

  let error = {
    errors: [{ status: 422 }]
  };
  route.send('handleErrors', error);

  assert.deepEqual(route.get('controller.signup.error'), error);
});

test('it signs the user in through session service', function(assert) {
  assert.expect(1);

  let route = this.subject({
    session: {
      authenticate(_param, credentials) {
        assert.equal(credentials, 'foo');
      }
    }
  });

  route.send('signIn', 'foo');
});
