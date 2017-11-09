import { moduleFor, test } from 'ember-qunit';

moduleFor('application', 'Unit | Serializer | application', {
  integration: true
});

test('it creates page meta', function(assert) {
  assert.expect(8);

  let store = this.container.lookup('service:store');

  let json = {
    data: [
      {
        type: 'github-event',
        id: 1
      }
    ],
    jsonapi: {
      version: '1.0'
    },
    links: {
      last: '/github-events?page[page]=4&page[page-size]=1',
      next: '/github-events?page[page]=3&page[page-size]=1',
      prev: '/github-events?page[page]=1&page[page-size]=1',
      self: '/github-events?page[page]=2&page[page-size]=1'
    }
  };

  let result = store.serializerFor('application').normalizeQueryResponse(store, store.modelFor('github-event'), json);

  assert.equal(result.meta.pagination.last.number, 4);
  assert.equal(result.meta.pagination.last.size, 1);
  assert.equal(result.meta.pagination.next.number, 3);
  assert.equal(result.meta.pagination.next.size, 1);
  assert.equal(result.meta.pagination.prev.number, 1);
  assert.equal(result.meta.pagination.prev.size, 1);
  assert.equal(result.meta.pagination.self.number, 2);
  assert.equal(result.meta.pagination.self.size, 1);
});
