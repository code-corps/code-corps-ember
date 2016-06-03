import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('service:onboarding', 'Unit | Service | onboarding', {
  // Specify the other units that are required for this test.
  needs: ['service:current-user', 'service:session'],
});

test('it has number, state, currentRoute, and nextRoute defined in each step', function(assert) {
  let service = this.subject();
  let steps = service.get('_steps');
  let totalSteps = service.get('totalSteps');
  const numberOfKeys = 5;

  assert.expect(totalSteps * numberOfKeys);

  for(var i = 0; i < totalSteps; i++) {
    assert.ok(Ember.isPresent(steps[i].number));
    assert.ok(Ember.isPresent(steps[i].state));
    assert.ok(Ember.isPresent(steps[i].currentRoute));
    assert.ok(Ember.isPresent(steps[i].nextRoute));
    assert.ok(Ember.isPresent(steps[i].nextStateTransition));
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
  assert.equal(service.get('totalSteps'), 3);
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

test('it computes selecting of categories, roles, and skills', function(assert) {
  assert.expect(3);
  let service = this.subject({
    currentUser: {
      user: {
        state: 'signed_up'
      }
    }
  });
  assert.ok(service.get('isSelectingCategories'));
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
  assert.equal(service.get('progressPercentage'), 33.33333333333333);
});

test('it knows the current route', function(assert) {
  let service = this.subject({
    currentUser: {
      user: {
        state: 'signed_up'
      }
    }
  });
  assert.equal(service.get('currentRoute'), 'start.interests');
});

test('it knows the next route', function(assert) {
  let service = this.subject({
    currentUser: {
      user: {
        state: 'signed_up'
      }
    }
  });
  assert.equal(service.get('nextRoute'), 'start.expertise');
});

test('it knows the next state transition', function(assert) {
  let service = this.subject({
    currentUser: {
      user: {
        state: 'signed_up'
      }
    }
  });
  assert.equal(service.get('nextStateTransition'), 'select_categories');
});

test('it knows the onboarding routes', function(assert) {
  let service = this.subject();
  let steps = service.get('_steps');
  let totalSteps = service.get('totalSteps');
  let routes = service.get('routes');

  assert.expect(totalSteps);

  for(var i = 0; i < totalSteps; i++) {
    assert.ok(routes.contains(steps[i].currentRoute));
  }
});
