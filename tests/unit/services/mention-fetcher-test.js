// import Ember from 'ember';
import { moduleFor /* , test */ } from 'ember-qunit';

moduleFor('service:mention-fetcher', 'Unit | Service | mention fetcher', {
});

// NOTE: Commented out due to comment user mentions being disabled until reimplemented in phoenix
/*
test('when fetching, it queries store for proper type of mentions, with a proper type of parameter', function(assert) {
  assert.expect(2);

  let service = this.subject();

  let mockStore = Ember.Object.create({
    query(type, params) {
      assert.equal(type, 'foo-user-mention');
      assert.equal(params.foo_id, 'nope');
      return Ember.RSVP.resolve([]);
    }
  });

  let mockFooRecord = Ember.Object.create({
    id: 'nope'
  });

  service.set('store', mockStore);

  service.fetchBodyWithMentions(mockFooRecord, 'foo');
});

test('when fetching, if there are no mentions, it just returns the record body', function(assert) {
  assert.expect(1);

  let service = this.subject();

  let mockStore = Ember.Object.create({
    query() {
      return Ember.RSVP.resolve([]);
    }
  });

  let mockFooRecord = Ember.Object.create({
    id: 'nope',
    body: 'Foo body'
  });

  service.set('store', mockStore);

  let done = assert.async();

  service.fetchBodyWithMentions(mockFooRecord, 'foo').then((body) => {
    assert.equal(body, 'Foo body');
    done();
  });
});

test('when fetching, if there are mentions, it returns the record body, with those mentions inserted', function(assert) {
  assert.expect(1);

  let service = this.subject();

  let mockStoreReturningMentions = Ember.Object.create({
    query () {
      return Ember.RSVP.resolve([
        Ember.Object.create({ indices: [14, 19], username: 'user1', user: { id: 1 } }),
        Ember.Object.create({ indices: [25, 30], username: 'user2', user: { id: 2 } })
      ]);
    }
  });

  let mockFooWithMentions = Ember.Object.create({
    body: '<p>Mentioning @user1 and @user2</p>',
    user: { id: 1 },
    save() {
      return Ember.RSVP.resolve();
    }
  });

  service.set('store', mockStoreReturningMentions);

  let done = assert.async();
  let expectedOutput = '<p>Mentioning <a href="/user1" class="username">@user1</a> and <a href="/user2" class="username">@user2</a></p>';

  service.fetchBodyWithMentions(mockFooWithMentions, 'foo').then((body) => {
    assert.equal(body, expectedOutput);
    done();
  });
});

test('when prefetching, if there are no mentions, it just returns the record body', function(assert) {
  assert.expect(1);

  let service = this.subject();

  let mockFooRecord = Ember.Object.create({
    id: 'nope',
    body: 'Foo body'
  });

  let body = service.prefetchBodyWithMentions(mockFooRecord, 'foo');
  assert.equal(body, 'Foo body');
});

test('when prefetching, if there are mentions, it returns the record body, with those mentions inserted', function(assert) {
  assert.expect(1);

  let service = this.subject();

  let mockFooWithMentions = Ember.Object.create({
    body: '<p>Mentioning @user1 and @user2</p>',
    fooUserMentions: [
      Ember.Object.create({ indices: [14, 19], username: 'user1', user: { id: 1 } }),
      Ember.Object.create({ indices: [25, 30], username: 'user2', user: { id: 2 } })
    ]
  });

  let expectedOutput = '<p>Mentioning <a href="/user1" class="username">@user1</a> and <a href="/user2" class="username">@user2</a></p>';
  let body = service.prefetchBodyWithMentions(mockFooWithMentions, 'foo');
  assert.equal(body, expectedOutput);
});
*/
