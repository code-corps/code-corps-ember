import { set } from '@ember/object';
import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:task', 'Unit | Adapter | task', {
  needs: [
    'service:session'
  ]
});

test('"sortQueryParams" passes through (and underscores) any keys that arent special', function(assert) {
  assert.expect(2);

  let adapter = this.subject();

  assert.deepEqual(
    adapter.sortQueryParams({ foo: 'bar' }),
    { foo: 'bar' },
    'Leaves single-word keys untouched.'
  );

  assert.deepEqual(
    adapter.sortQueryParams({ camelFoo: 'bar' }),
    { camel_foo: 'bar' },
    'Underscores camelCase keys.'
  );
});

test('"sortQueryParams" moves page param into query sub-object if present', function(assert) {
  assert.expect(5);

  let adapter = this.subject();

  assert.deepEqual(
    adapter.sortQueryParams({ page: 'foo' }),
    { page: { page: 'foo' } },
    'When there is a page key, it needs to be nested.'
  );

  assert.deepEqual(
    adapter.sortQueryParams({ page: undefined }),
    { },
    'An undefined value is discarded.'
  );

  assert.deepEqual(
    adapter.sortQueryParams({ page: null }),
    { },
    'A null value is discarded.'
  );

  assert.deepEqual(
    adapter.sortQueryParams({ page: null }),
    { },
    'An empty string value is discarded.'
  );

  assert.deepEqual(
    adapter.sortQueryParams({ page: '' }),
    { },
    'An empty string value is discarded.'
  );
});

test('"sortQueryParams" discards "projectId"', function(assert) {
  assert.expect(6);

  let adapter = this.subject();

  assert.deepEqual(
    adapter.sortQueryParams({ projectId: 'bar' }),
    { },
    'Discards "projectId" when it has a value.'
  );

  assert.deepEqual(
    adapter.sortQueryParams({ projectId: '' }),
    { },
    'Discards "projectId" when empty string.'
  );

  assert.deepEqual(
    adapter.sortQueryParams({ projectId: null }),
    { },
    'Discards "projectId" when null.'
  );

  assert.deepEqual(
    adapter.sortQueryParams({ projectId: undefined }),
    { },
    'Discards "projectId" undefined.'
  );

  assert.deepEqual(
    adapter.sortQueryParams({ projectId: [] }),
    { },
    'Discards "projectId" when blank array.'
  );

  assert.deepEqual(
    adapter.sortQueryParams({ }),
    { },
    'Works on blank object.'
  );
});

test('"urlForQuery" makes "projectId" part of the path', function(assert) {
  assert.expect(1);

  let adapter = this.subject();
  set(adapter, 'host', 'test');

  assert.equal(
    adapter.urlForQuery({ projectId: 2 }),
    'test/projects/2/tasks',
    '"projectId" is correctly made part of the path.'
  );
});

test('"urlForQueryRecord" makes "projectId" and "number" part of the path', function(assert) {
  assert.expect(1);

  let adapter = this.subject();
  set(adapter, 'host', 'test');

  assert.equal(
    adapter.urlForQueryRecord({ projectId: 2, number: 5 }),
    'test/projects/2/tasks/5',
    '"projectId" and "number" are correctly made part of the path.'
  );
});
