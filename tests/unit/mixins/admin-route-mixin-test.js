import EmberObject from '@ember/object';
import AdminRouteMixin from 'code-corps-ember/mixins/admin-route-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | admin route mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let AdminRouteObject = EmberObject.extend(AdminRouteMixin);
  let subject = AdminRouteObject.create();
  assert.ok(subject);
});
