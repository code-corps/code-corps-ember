import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

const { Controller, set } = Ember;

moduleForComponent(
  'power-select/before-task-options',
  'Unit | Component | power select before task options',
  {
    unit: true
  }
);

test('close action calls "close" action on assigned "selectRemoteController"', function(assert) {
  assert.expect(1);

  let stubController = Controller.extend({
    actions: {
      close() {
        assert.ok(true, 'Action was called');
      }
    }
  });

  let component = this.subject();
  set(component, 'selectRemoteController', stubController.create());
  component.send('close');
});
