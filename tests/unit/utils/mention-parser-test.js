import { parse } from 'code-corps-ember/utils/mention-parser';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Utility | mention parser');

// Replace this with your real tests.
test('it replaces all "@username" mention strings with links to the user profile', function(assert) {
  assert.expect(1);

  let body = '<p>Mentioning @user1 and @user2</p>';
  let mentions = [

    Ember.Object.create({
      indices: [14, 19],
      user: {
        id: 1,
        username: 'user1'
      }
    }),

    Ember.Object.create({
      indices: [25, 30],
      user: {
        id: 2,
        username: 'user2'
      }
    })

  ];

  let expectedOutput = '<p>Mentioning <a href="/users/1">@user1</a> and <a href="/users/2">@user2</a></p>';

  assert.equal(parse(body, mentions), expectedOutput);

});

test('it returns the unmodified post string when there are no mentions', function(assert) {
  let body = '<p>Not mentioning anyone</p>';

  assert.equal(parse(body, undefined), body);
});
