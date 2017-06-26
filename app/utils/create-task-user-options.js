import Ember from 'ember';

const { get, isEmpty } = Ember;

/**
 * Takes in a list of organization members, the current user id and,
 * if it exists, the id of the user currently assigned to the taskUserId
 *
 * Out of these parameters, it builds groups of users to be displayed on
 * the task assignment dropdown.
 *
 * The groups are
 *
 * - current user
 * - currently assigned user
 * - other organization members
 *
 * @param {DS.ManyArray}  users
 * @param {String}  currentUserId
 * @param {String}  taskUserId
 * @return {Array}
 */
export default function createTaskUserOptions(users, currentUserId, taskUserId) {
  if (isEmpty(users)) {
    return [];
  }

  // Filter the current user
  let currentUserOptions = users.filter((user) => {
    return get(user, 'id') === currentUserId;
  });

  // Filter the task user, unless they're also the current user
  let taskUserOptions = users.filter((user) => {
    let userId = get(user, 'id');
    return userId !== currentUserId && userId === taskUserId;
  });

  // Filter the current user and task user from the remaining users
  let remainingUsersOptions = users.reject((user) => {
    let userId = get(user, 'id');
    return userId === currentUserId || userId === taskUserId;
  }).sortBy('username');

  // 'groupName' is needed for ember power select to work
  let currentUserGroup = { groupName: 'Current User', options: currentUserOptions };
  let taskUserGroup = { groupName: 'Assigned User', options: taskUserOptions };
  let remainingUsersGroup = { groupName: 'Everyone Else',  options: remainingUsersOptions };

  let groups = [];

  if (!isEmpty(currentUserOptions)) {
    groups.push(currentUserGroup);
  }

  if (!isEmpty(taskUserOptions)) {
    groups.push(taskUserGroup);
  }

  if (!isEmpty(remainingUsersOptions)) {
    groups.push(remainingUsersGroup);
  }

  return groups;
}
