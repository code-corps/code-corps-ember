import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  shouldBackgroundReloadRecord() {
    return false;
  }
});
