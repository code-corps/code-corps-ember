import Ember from 'ember';

const {
  Controller,
  inject: { service }
} = Ember;

export default Controller.extend({
  store: service(),

  actions: {
    /**
     * Activates donations for a project by creating an associated stripe plan record
     *
     * @method addDonationGoal
     * @param  {DS.Model} project A project record to activate donations for.
     */
    activateDonations(project) {
      this.get('store')
          .createRecord('stripe-plan', { project })
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
      project.get('donationGoals').createRecord().set('isEditing', true);
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
      donationGoal.set('isEditing', false);

      if (donationGoal.get('isNew')) {
        donationGoal.destroyRecord();
      }
    },

    /**
     * Action which switches a donation goal from view to edit mode.
     *
     * Trigged when user clicks the edit link.
     *
     * @method editDonationGoal
     * @param  {DS.Model} donationGoal A donation goal record
     */
    editDonationGoal(donationGoal) {
      donationGoal.set('isEditing', true);
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
      donationGoal.save().then((donationGoal) => {
        donationGoal.set('isEditing', false);
      });
    }
  }
});
