import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

const {
  get,
  Object,
  RSVP,
  set
} = Ember;

let mockStore = Object.create({
  createRecord() {
    return Object.create({
      save() {
        return RSVP.resolve({ created: true });
      }
    });
  }
});

let task1 = Object.create({
  id: 'task-1',
  userTask: Object.create({
    destroyRecord() {
      return RSVP.resolve({ destroyed: true });
    },
    save() {
      return RSVP.resolve({ saved: true });
    },
    user: {
      id: 'user-1'
    }
  })
});

let task2 = Object.create({
  id: 'task-2'
});

let user1 = Object.create({
  id: 'user-1'
});

let user2 = Object.create({
  id: 'user-2'
});

moduleFor('service:task-assignment', 'Unit | Service | task assignment', {
  beforeEach() {
    let service = this.subject();
    set(service, 'store', mockStore);
  }
});

test('it resolves to true for isAssignedTo correctly', function(assert) {
  let done = assert.async();
  let service = this.subject();

  service.isAssignedTo(task1, user1).then((result) => {
    assert.equal(result, true);
    done();
  });
});

test('it resolves to false for isAssignedTo correctly', function(assert) {
  let done = assert.async();
  let service = this.subject();

  service.isAssignedTo(task1, user2).then((result) => {
    assert.equal(result, false);
    done();
  });
});

test('it assigns an unassigned task to a user using assign', function(assert) {
  let done = assert.async();
  let service = this.subject();

  service.assign(task2, user2).then((result) => {
    let created = get(result, 'created');
    assert.equal(created, true);
    done();
  });
});

test('it updates an assigned task to a user using assign', function(assert) {
  let done = assert.async();
  let service = this.subject();

  service.assign(task1, user2).then((result) => {
    let saved = get(result, 'saved');
    assert.equal(saved, true);
    done();
  });
});

test('it unassigns a task from the user using unassign', function(assert) {
  let done = assert.async();
  let service = this.subject();

  service.unassign(task1).then((result) => {
    let destroyed = get(result, 'destroyed');
    assert.equal(destroyed, true);
    done();
  });
});

test('it calls unloadRecord if assign fails', function(assert) {
  let done = assert.async();
  let service = this.subject();

  let rejectingStore = Object.create({
    createRecord() {
      return Object.create({
        save() {
          return RSVP.reject();
        },
        unloadRecord() {
          assert.ok(true);
          done();
        }
      });
    }
  });

  set(service, 'store', rejectingStore);

  service.assign(Object.create(), Object.create());
});

test('it calls rollbackAttributes if assign fails', function(assert) {
  let done = assert.async();
  let service = this.subject();

  let assignedTask = Object.create({
    id: 'task-1',
    userTask: Object.create({
      rollbackAttributes() {
        assert.ok(true);
        done();
      },
      save() {
        return RSVP.reject();
      },
      user: {
        id: 'user-1'
      }
    })
  });

  service.assign(assignedTask, user2);
});
