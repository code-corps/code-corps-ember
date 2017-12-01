import computed from 'ember-macro-helpers/computed';
import { get } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default function(projectUsersKey, userKey) {
  if (arguments.length < 2) {
    throw new Error('This macro needs two or more arguments.');
  }

  return computed(projectUsersKey, userKey, (projectUsers, user) => {
    let userId;

    if (user) {
      userId = get(user, 'id');
    }

    if (isEmpty(userId)) {
      return undefined;
    } else {
      return projectUsers.find((item) => {
        return item.belongsTo('user').id() === userId;
      });
    }
  }).readOnly();
}
