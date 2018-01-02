import EmberObject from '@ember/object';
import MarketingRouteMixinMixin from 'code-corps-ember/mixins/marketing-route-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | marketing route mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let MarketingRouteMixinObject = EmberObject.extend(MarketingRouteMixinMixin);
  let subject = MarketingRouteMixinObject.create();
  assert.ok(subject);
});
