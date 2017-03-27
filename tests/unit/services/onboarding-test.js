import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

const { get, isPresent } = Ember;

moduleFor('service:onboarding', 'Unit | Service | onboarding', {
  // Specify the other units that are required for this test.
  needs: ['service:current-user', 'service:session']
});

test('it has number, state, currentRoute, and nextRoute defined in each step', function(assert) {
  let service = this.subject();
  let steps = get(service, '_steps');
  let totalSteps = get(service, 'totalSteps');
  let numberOfKeys = 5;

  assert.expect(totalSteps * numberOfKeys);

  for (let i = 0; i < totalSteps; i++) {
    assert.ok(isPresent(steps[i].number));
    assert.ok(isPresent(steps[i].state));
    assert.ok(isPresent(steps[i].route));
    assert.ok(isPresent(steps[i].nextRoute));
    assert.ok(isPresent(steps[i].nextStateTransition));
  }
});

test('it returns the number of steps', function(assert) {
  let service = this.subject({
    currentUser: {
      user: {
        state: 'signed_up'
      }
    }
  });
  assert.equal(get(service, 'totalSteps'), 4);
});

test('it returns the current step number', function(assert) {
  let service = this.subject({
    routing: {
      currentRouteName: 'start.hello'
    }
  });
  assert.equal(get(service, 'currentRouteStepNumber'), 1);
});

test('it returns the current step state', function(assert) {
  let service = this.subject({
    currentUser: {
      user: {
        state: 'signed_up'
      }
    }
  });
  assert.equal(get(service, 'currentStepState'), 'signed_up');
});

test('it computes states', function(assert) {
  assert.expect(4);
  let service = this.subject({
    currentUser: {
      user: {
        state: 'signed_up'
      }
    }
  });
  assert.ok(get(service, 'shouldEditProfile'));
  assert.notOk(get(service, 'shouldSelectCategories'));
  assert.notOk(get(service, 'shouldSelectRoles'));
  assert.notOk(get(service, 'shouldSelectSkills'));
});

test('it knows when the user is onboarding', function(assert) {
  let service = this.subject({
    currentUser: {
      user: {
        state: 'signed_up'
      }
    }
  });
  assert.ok(get(service, 'isOnboarding'));
});

test('it knows when the user is not onboarding', function(assert) {
  let service = this.subject({
    currentUser: {
      user: {
        state: 'selected_skills'
      }
    }
  });
  assert.notOk(get(service, 'isOnboarding'));
});

test('it knows the progress percentage', function(assert) {
  let service = this.subject({
    routing: {
      currentRouteName: 'start.hello'
    }
  });
  assert.equal(get(service, 'progressPercentage'), 25);
});

test('it knows the current route', function(assert) {
  let service = this.subject({
    routing: {
      currentRouteName: 'start.hello'
    }
  });
  assert.equal(get(service, 'currentRouteName'), 'start.hello');
});

test('it knows the next route', function(assert) {
  let service = this.subject({
    routing: {
      currentRouteName: 'start.hello'
    }
  });
  assert.equal(get(service, 'nextRoute'), 'start.interests');
});

test('it knows the next state transition', function(assert) {
  let service = this.subject({
    currentUser: {
      user: {
        state: 'signed_up'
      }
    }
  });
  assert.equal(get(service, 'nextStateTransition'), 'edit_profile');
});
