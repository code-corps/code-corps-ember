import Ember from 'ember';

const {
  Controller,
  get,
  inject: { service },
  set
} = Ember;

export default Controller.extend({
  projectDonationGoals: service(),
  store: service(),

  actions: {
    /**
     * Activates donations for a project by creating an associated stripe plan record
     *
     * @method addDonationGoal
     * @param  {DS.Model} project A project record to activate donations for.
     */
    activateDonations(project) {
      get(this, 'store')
          .createRecord('stripe-connect-plan', { project })
          .save();
    },

    /**
     * Action which calls to initialize a new donation goal record
     * for the current project.
     *
     * Triggered when user clicks a button to add a new donation goal
     *
     * @method addDonationGoal
     * @param  {DS.Model} project A project record to initialize a new donation goal for.
     */
    addDonationGoal(project) {
      let donationGoal = get(project, 'donationGoals').createRecord();
      this.send('editDonationGoal', donationGoal);
    },

    /**
     * Action which switches a donation goal from edit to view mode
     * If the donation goal is a new, unsaved record, it will be destroyed.
     *
     * Triggered when user clicks the cancel button,
     * when editing or adding a donation goal.
     *
     * @method cancelDonationGoal
     * @param  {DS.Model} donationGoal A donation goal record
     */
    cancelDonationGoal(donationGoal) {
      set(donationGoal, 'isEditing', false);

      if (get(donationGoal, 'isNew')) {
        donationGoal.destroyRecord();
      }
    },

    /**
     * Action which switches a donation goal from view to edit mode.
     *
     * Trigged when user clicks the donation goal or its edit link.
     *
     * @method editDonationGoal
     * @param  {DS.Model} donationGoal A donation goal record
     * @param  {Boolean} canEdit Whether you can edit
     */
    editDonationGoal(donationGoal, canEdit = true) {
      if (canEdit) {
        set(donationGoal, 'isEditing', true);
      }
    },

    /**
     * Action which commits changes to a donation goal.
     *
     * Triggers when user clicks the save button while edditing or
     * adding a new donation goal.
     *
     * @method saveDonationGoal
     * @param  {DS.Model} donationGoal An unmodified or new donation goal record
     * @param  {Object}   properties   A hash consisting of donation goal properties to update and save
     */
    saveDonationGoal(donationGoal, properties) {
      donationGoal.setProperties(properties);
      console.log('set');
      donationGoal.save().then((donationGoal) => {
        let projectDonationGoals = get(this, 'projectDonationGoals');
        let project = get(this, 'project');
        project.reload().then((project) => {
          projectDonationGoals.reload(project).then(() => {
            this.send('cancelDonationGoal', donationGoal);
          });
        });
      });
    }
  }
});
