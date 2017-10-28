import { set } from '@ember/object';
import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:start/hello', 'Unit | Controller | start/hello', {
  needs: [
    'service:current-user',
    'service:flash-messages',
    'service:loading-bar',
    'service:metrics',
    'service:onboarding'
  ]
});

test('it sets "uploadingImage" to false when upload errors out', function(assert) {
  assert.expect(3);
  let controller = this.subject();

  set(controller, 'uploadingImage', true);

  set(controller, 'loadingBar', {
    stop() {
      assert.ok(true);
    }
  });

  set(controller, 'flashMessages', {
    clearMessages() {
      return this;
    },
    danger() {
      assert.ok(true);
    }
  });

  controller.uploadErrored();

  assert.notOk(controller.uploadingImage, 'uploadingImage property is set to false on uploadErrored');
});
