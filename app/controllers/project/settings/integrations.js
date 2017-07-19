import Ember from 'ember';

const {
  Controller,
  inject: { service }
} = Ember;

export default Controller.extend({
  store: service(),

  actions: {
    /**
     * Action which calls to create a new GitHub App installation record
     * and an organization GitHub App Installation record for the current
     * project
     *
     * Triggered when user clicks a button to install the GitHub App
     *
     * @method createGithubAppInstallation
     * @param  {DS.Model} project A project record to initialize a new installation.
     */
    createGithubAppInstallation(/* project */) {
      // .createRecord();
    }
  }
});
