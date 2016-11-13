import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

const { isPresent } = Ember;

moduleFor('service:onboarding', 'Unit | Service | onboarding', {
  // Specify the other units that are required for this test.
  needs: ['service:current-user', 'service:session']
});

test('it has number, state, currentRoute, and nextRoute defined in each step', function(assert) {
  let service = this.subject();
  let steps = service.get('_steps');
  let totalSteps = service.get('totalSteps');
  let numberOfKeys = 5;

  assert.expect(totalSteps * numberOfKeys);

  for (let i = 0; i < totalSteps; i++) {
    assert.ok(isPresent(steps[i].number));
    assert.ok(isPresent(steps[i].state));
    assert.ok(isPresent(steps[i].currentRoute));
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
  assert.equal(service.get('totalSteps'), 4);
});

test('it returns the current step number', function(assert) {
  let service = this.subject({
    currentUser: {
      user: {
        state: 'signed_up'
      }
    }
  });
  assert.equal(service.get('currentStepNumber'), 1);
});

test('it returns the current step state', function(assert) {
  let service = this.subject({
    currentUser: {
      user: {
        state: 'signed_up'
      }
    }
  });
  assert.equal(service.get('currentStepState'), 'signed_up');
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
  assert.ok(service.get('isEditingProfile'));
  assert.notOk(service.get('isSelectingCategories'));
  assert.notOk(service.get('isSelectingRoles'));
  assert.notOk(service.get('isSelectingSkills'));
});

test('it knows when the user is onboarding', function(assert) {
  let service = this.subject({
    currentUser: {
      user: {
        state: 'signed_up'
      }
    }
  });
  assert.ok(service.get('isOnboarding'));
});

test('it knows when the user is not onboarding', function(assert) {
  let service = this.subject({
    currentUser: {
      user: {
        state: 'selected_skills'
      }
    }
  });
  assert.notOk(service.get('isOnboarding'));
});

test('it knows the progress percentage', function(assert) {
  let service = this.subject({
    currentUser: {
      user: {
        state: 'signed_up'
      }
    }
  });
  assert.equal(service.get('progressPercentage'), 25);
});

test('it knows the current route', function(assert) {
  let service = this.subject({
    currentUser: {
      user: {
        state: 'signed_up'
      }
    }
  });
  assert.equal(service.get('currentRoute'), 'start.hello');
});

test('it knows the next route', function(assert) {
  let service = this.subject({
    currentUser: {
      user: {
        state: 'signed_up'
      }
    }
  });
  assert.equal(service.get('nextRoute'), 'start.interests');
});

test('it knows the next state transition', function(assert) {
  let service = this.subject({
    currentUser: {
      user: {
        state: 'signed_up'
      }
    }
  });
  assert.equal(service.get('nextStateTransition'), 'edit_profile');
});

test('it knows the onboarding routes', function(assert) {
  let service = this.subject();
  let steps = service.get('_steps');
  let totalSteps = service.get('totalSteps');
  let routes = service.get('routes');

  assert.expect(totalSteps);

  for (let i = 0; i < totalSteps; i++) {
    assert.ok(routes.includes(steps[i].currentRoute));
  }
});
