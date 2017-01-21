import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import ContainsCodeMixin from 'code-corps-ember/mixins/contains-code';
import { moduleFor, test } from 'ember-qunit';

const {
  getOwner,
  run
} = Ember;

moduleFor('mixin:contains-code', 'Unit | Mixin | contains code mixin', {
  subject(record) {
    let ContainsCodeMixinObject = Model.extend(ContainsCodeMixin, {
      body: attr('string')
    });
    this.register('model:contains-code-mixin-object', ContainsCodeMixinObject);
    return run(() => {
      let store = getOwner(this).lookup('service:store');
      return store.createRecord('contains-code-mixin-object', record || {});
    });
  }
});

test('it works', function(assert) {
  let subject = this.subject();
  assert.ok(subject);
});

test('it returns true "code" tag is present', function(assert) {
  assert.expect(1);

  let model = this.subject({ body: '<code>Hello, world!<code>' });

  assert.equal(model.get('containsCode'), true);
});

test('it returns false if "code" tag is absent', function(assert) {
  assert.expect(1);

  let model = this.subject({ body: 'Hello, world!' });

  assert.equal(model.get('containsCode'), false);
});
