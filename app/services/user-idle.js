import UserIdleService from 'ember-user-activity/services/user-idle';

export default UserIdleService.extend({
  IDLE_TIMEOUT: 10000 // 10 seconds
});
