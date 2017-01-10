import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  Object,
  set
} = Ember;

function setHandlers(context, { addHandler = function() {}, activateDonationsHandler = function() {}, cancelHandler = function() {}, editHandler = function() {}, saveHandler = function() {} } = {}) {
  set(context, 'addHandler', addHandler);
  set(context, 'activateDonationsHandler', activateDonationsHandler);
  set(context, 'cancelHandler', cancelHandler);
  set(context, 'editHandler', editHandler);
  set(context, 'saveHandler', saveHandler);
}

moduleForComponent('donation-goals', 'Integration | Component | donation goals', {
  integration: true,
  beforeEach() {
    setHandlers(this);
  }
});

test('it renders loading goals when not loaded', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isLoaded: false })
  ];

  set(this, 'project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals activateDonations=activateDonationsHandler add=addHandler edit=editHandler project=project}}`);

  assert.equal(this.$('.donation-goal-loading').length, 1, 'Renders correct number of donation-goal-loading elements');
});

test('it renders the correct number of subcomponents', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isLoaded: true }),
    Object.create({ isLoaded: true }),
    Object.create({ isLoaded: true })
  ];

  set(this, 'project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals activateDonations=activateDonationsHandler add=addHandler edit=editHandler project=project}}`);

  assert.equal(this.$('.donation-goal').length, 3, 'Renders correct number of donation-goal components');
});

test('it renders the correct number of subcomponents in view or edit mode', function(assert) {
  assert.expect(2);

  let mockGoals = [
    Object.create({ isEditing: false, isLoaded: true  }),
    Object.create({ isEditing: true, isLoaded: true  }),
    Object.create({ isEditing: false, isLoaded: true  })
  ];

  set(this, 'project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals activateDonations=activateDonationsHandler cancel=cancelHandler edit=editHandler save=saveHandler project=project}}`);

  assert.equal(this.$('.donation-goal').length, 2, 'Renders correct number of donation-goal components');
  assert.equal(this.$('.donation-goal-edit').length, 1, 'Renders correct number of donation-goal-edit components');
});

test('it sends "cancel" action with donation goal as parameter when cancel button is clicked', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: true, isLoaded: true, isNew: false })
  ];

  set(this, 'project', Object.create({ donationGoals: mockGoals }));

  let cancelHandler =  function(donationGoal) {
    assert.deepEqual(mockGoals[0], donationGoal, 'Handler got called, with donation goal');
  };

  setHandlers(this, { cancelHandler });

  this.render(hbs`{{donation-goals activateDonations=activateDonationsHandler cancel=cancelHandler save=saveHandler project=project}}`);

  this.$('.cancel').click();
});

test('it sends "edit" action with donation goal as parameter when clicked', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: false, isLoaded: true, isNew: false })
  ];

  set(this, 'project', Object.create({ donationGoals: mockGoals }));

  let editHandler = function(donationGoal) {
    assert.deepEqual(mockGoals[0], donationGoal, 'Handler got called, with donation goal');
  };
  setHandlers(this, { editHandler });

  this.render(hbs`{{donation-goals activateDonations=activateDonationsHandler add=addHandler edit=editHandler project=project}}`);

  this.$('.donation-goal').click();
});

test('it sends "save" action with donation goal curried first, and values second when save button is clicked', function(assert) {
  assert.expect(2);

  let mockGoals = [
    Object.create({ amount: 500, description: 'Lorem ipsum', isEditing: true, isLoaded: true, isNew: false })
  ];

  set(this, 'project', Object.create({ donationGoals: mockGoals }));

  let saveHandler = function(donationGoal, values) {
    assert.deepEqual(mockGoals[0], donationGoal, 'First parameter for handler is donation goal');
    assert.deepEqual(values, { amount: 500, description: 'Lorem ipsum' }, 'Second parameter for handler are provided values');
  };
  setHandlers(this, { saveHandler });

  this.render(hbs`{{donation-goals activateDonations=activateDonationsHandler cancel=cancelHandler save=saveHandler project=project}}`);

  this.$('.save').click();
});

test('it does not allow cancelling an edited record if that record is the only one, and new', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: true, isLoaded: true, isNew: true })
  ];

  set(this, 'project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals cancel=cancelHandler save=saveHandler project=project}}`);

  assert.equal(this.$('.cancel').length, 0, 'No cancel button is rendered');
});

test('it allows cancelling an edited record if that record is the only one and not new', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: true, isLoaded: true, isNew: false })
  ];

  set(this, 'project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals activateDonations=activateDonationsHandler cancel=cancelHandler save=saveHandler edit=editHandler project=project}}`);

  assert.equal(this.$('.cancel').length, 1, 'Cancel button is rendered');
});

test('it allows cancelling an edited record if that record is new, but there are other persisted goals', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: true, isLoaded: true, isNew: true }),
    Object.create({ isEditing: false, isLoaded: true, isNew: false })
  ];

  set(this, 'project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals activateDonations=activateDonationsHandler cancel=cancelHandler edit=editHandler save=saveHandler project=project}}`);

  assert.equal(this.$('.cancel').length, 1, 'Cancel button is rendered');
});

test('it only allows editing a single record at a time', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: true, isLoaded: true, isNew: false }),
    Object.create({ isEditing: false, isLoaded: true, isNew: false })
  ];

  set(this, 'project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals activateDonations=activateDonationsHandler cancel=cancelHandler edit=editHandler save=saveHandler project=project}}`);

  assert.equal(this.$('.edit').length, 0, 'A record is being edited, so no other record can be edited');
});

test('it does not allow adding a record if a record is being edited', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: true, isLoaded: true, isNew: false })
  ];

  set(this, 'project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals activateDonations=activateDonationsHandler cancel=cancelHandler edit=editHandler save=saveHandler project=project}}`);

  assert.equal(this.$('.add').length, 0, 'A record is being edited, so no other record can be added');
});

test('it does not allow adding a record if a record is being added', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: true, isLoaded: true, isNew: true })
  ];

  set(this, 'project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals cancel=cancelHandler edit=editHandler save=saveHandler project=project}}`);

  assert.equal(this.$('.add').length, 0, 'A record is being added, so no other record can be added');
});

test('it allows adding a record if no record is being added or edited', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: false, isLoaded: true, isNew: false })
  ];

  set(this, 'project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals activateDonations=activateDonationsHandler add=addHandler edit=editHandler project=project}}`);

  assert.equal(this.$('.add').length, 1, 'No record is being added or edited, so a new record can be added');
});

test('it calls provided "add" action with project as parameter when add button is clicked', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: false, isLoaded: true, isNew: false })
  ];

  set(this, 'project', Object.create({ donationGoals: mockGoals }));

  let addHandler = function(actualProject) {
    let expectedProject = this.get('project');
    assert.deepEqual(actualProject, expectedProject);
  };
  setHandlers(this, { addHandler });

  this.render(hbs`{{donation-goals activateDonations=activateDonationsHandler add=addHandler edit=editHandler project=project}}`);

  this.$('.add').click();
});

test('it allows activating donations if there are persisted records', function(assert) {
  assert.expect(2);

  let mockGoals = [
    Object.create({ isEditing: false, isLoaded: true, isNew: false })
  ];

  function activateDonationsHandler() {
    assert.ok(true, 'Action was called when button was clicked');
  }

  setHandlers(this, { activateDonationsHandler });

  set(this, 'project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals activateDonations=activateDonationsHandler add=addHandler edit=editHandler project=project}}`);

  assert.equal(this.$('.activate-donations').length, 1, 'The "activate donations" button is rendered');

  this.$('.activate-donations').click();
});

test('it prevents activating donations if there are no persisted records', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: false, isLoaded: true, isNew: true })
  ];

  set(this, 'project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals add=addHandler edit=editHandler project=project}}`);

  assert.equal(this.$('.activate-donations').length, 0, 'The "activate donations" button is not rendered');
});

test('it prevents activating donations if there is already a plan associated with a project', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: false, isLoaded: true, isNew: true })
  ];

  set(this, 'project', Object.create({ donationGoals: mockGoals, stripeConnectPlan: {} }));

  this.render(hbs`{{donation-goals add=addHandler edit=editHandler project=project}}`);

  assert.equal(this.$('.activate-donations').length, 0, 'The "activate donations" button is not rendered');
});
