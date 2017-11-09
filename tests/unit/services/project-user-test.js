import RSVP from 'rsvp';
import { set } from '@ember/object';
import { moduleFor, test } from 'ember-qunit';

moduleFor('service:project-user', 'Unit | Service | project user', {
  needs: [
    'service:current-user',
    'service:flash-messages',
    'service:session',
    'service:metrics'
  ]
});

test('it creates a new projectUser with properties', function(assert) {
  assert.expect(3);
  let done = assert.async();
  let service = this.subject();
  let user = { id: 1 };
  let project = { title: 'Code Corps' };
  let projectUser = { project, user, role: 'pending' };

  let mockCurrentUser = { user };

  let mockStore = {
    createRecord(modelName, inputProperties) {
      return {
        save() {
          assert.equal(modelName, 'project-user');
          assert.deepEqual(inputProperties, projectUser);
          return RSVP.resolve(projectUser);
        }
      };
    }
  };

  // test doesn't care what the message is, just that it was called
  // need to support function chaining because actual flash-messages
  // service does function chaining and our component calls to clear all messages first
  // so the fake needs to support that.

  let mockFlashMessage = {
    success() {
      assert.ok(true);
      return this;
    },
    clearMessages() {
      return this;
    }
  };

  set(service, 'currentUser', mockCurrentUser);
  set(service, 'flashMessages', mockFlashMessage);
  set(service, 'store', mockStore);

  service.joinProject(project).then(() => {
    done();
  });
});

test('it sends an error flash message if joinProject fails', function(assert) {
  assert.expect(1);
  let service = this.subject();
  let done = assert.async();

  let mockStore = {
    createRecord() {
      return {
        save() {
          return RSVP.reject();
        }
      };
    }
  };

  let mockFlashMessage = {
    danger() {
      assert.ok(true);
      return this;
    },
    clearMessages() {
      return this;
    }
  };

  set(service, 'flashMessages', mockFlashMessage);
  set(service, 'store', mockStore);

  service.joinProject().then(() => {
    done();
  });
});
