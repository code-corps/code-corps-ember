import { parse } from 'code-corps-ember/utils/mention-parser';
import { module, test } from 'qunit';
import Ember from 'ember';

const { Object } = Ember;

module('Unit | Utility | mention parser');

test('it replaces all "@username" mention strings with links to the user profile', function(assert) {
  assert.expect(1);

  let body = '<p>Mentioning @user1 and @user2</p>';
  let mentions = [

    Object.create({
      indices: [14, 19],
      username: 'user1',
      user: { id: 1 }
    }),

    Object.create({
      indices: [25, 30],
      username: 'user2',
      user: { id: 2 }
    })

  ];

  let expectedOutput = '<p>Mentioning <a href="/user1" class="username">@user1</a> and <a href="/user2" class="username">@user2</a></p>';

  assert.equal(parse(body, mentions), expectedOutput);
});

test('it returns the unmodified task string when there are no mentions', function(assert) {
  let body = '<p>Not mentioning anyone</p>';

  assert.equal(parse(body, undefined), body);
});
