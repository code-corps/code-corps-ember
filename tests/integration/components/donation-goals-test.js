import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  Object,
  K
} = Ember;

function setHandlers(context, { addHandler = K, cancelHandler = K, editHandler = K, saveHandler = K } = {}) {
  context.set('addHandler', addHandler);
  context.set('cancelHandler', cancelHandler);
  context.set('editHandler', editHandler);
  context.set('saveHandler', saveHandler);
}

moduleForComponent('donation-goals', 'Integration | Component | donation goals', {
  integration: true,
  beforeEach() {
    setHandlers(this);
  }
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{donation-goals add=addHandler}}`);

  assert.equal(this.$('.donation-goals').length, 1, 'Renders the component element');
});

test('it renders the correct number of subcomponents', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({}),
    Object.create({}),
    Object.create({})
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals add=addHandler edit=editHandler project=project}}`);

  assert.equal(this.$('.donation-goal').length, 3, 'Renders correct number of donation-goal components');
});

test('it renders the correct number of subcomponents in view or edit mode', function(assert) {
  assert.expect(2);

  let mockGoals = [
    Object.create({ isEditing: false }),
    Object.create({ isEditing: true }),
    Object.create({ isEditing: false })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals cancel=cancelHandler edit=editHandler save=saveHandler project=project}}`);

  assert.equal(this.$('.donation-goal').length, 2, 'Renders correct number of donation-goal components');
  assert.equal(this.$('.donation-goal-edit').length, 1, 'Renders correct number of donation-goal-edit components');
});

test('it sends "cancel" action with donation goal as parameter when cancel button is clicked', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: true, isNew: false })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  let cancelHandler =  function(donationGoal) {
    assert.deepEqual(mockGoals[0], donationGoal, 'Handler got called, with donation goal');
  };
  setHandlers(this, { cancelHandler });

  this.render(hbs`{{donation-goals cancel=cancelHandler save=saveHandler project=project}}`);

  this.$('.cancel').click();
});

test('it sends "edit" action with donation goal as parameter when edit button is clicked', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: false, isNew: false })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  let editHandler = function(donationGoal) {
    assert.deepEqual(mockGoals[0], donationGoal, 'Handler got called, with donation goal');
  };
  setHandlers(this, { editHandler });

  this.render(hbs`{{donation-goals add=addHandler edit=editHandler project=project}}`);

  this.$('.edit').click();
});

test('it sends "save" action with donation goal curried first, and values second when save button is clicked', function(assert) {
  assert.expect(2);

  let mockGoals = [
    Object.create({ amount: 500, description: 'Lorem ipsum', isEditing: true, isNew: false })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  let saveHandler = function(donationGoal, values) {
    assert.deepEqual(mockGoals[0], donationGoal, 'First parameter for handler is donation goal');
    assert.deepEqual(values, { amount: 500, description: 'Lorem ipsum' }, 'Second parameter for handler are provided values');
  };
  setHandlers(this, { saveHandler });

  this.render(hbs`{{donation-goals cancel=cancelHandler save=saveHandler project=project}}`);

  this.$('.save').click();
});

test('it does not allow cancelling an edited record if that record is the only one, and new', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: true, isNew: true })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals cancel=cancelHandler save=saveHandler project=project}}`);

  assert.equal(this.$('.cancel').length, 0, 'No cancel button is rendered');
});

test('it allows cancelling an edited record if that record is the only one and not new', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: true, isNew: false })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals cancel=cancelHandler save=saveHandler edit=editHandler project=project}}`);

  assert.equal(this.$('.cancel').length, 1, 'Cancel button is rendered');
});

test('it allows cancelling an edited record if that record new, but there are other persisted goals', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: true, isNew: true }),
    Object.create({ isEditing: false, isNew: false })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals cancel=cancelHandler edit=editHandler save=saveHandler project=project}}`);

  assert.equal(this.$('.cancel').length, 1, 'Cancel button is rendered');
});

test('it only allows editing a single record at a time', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: true, isNew: false }),
    Object.create({ isEditing: false, isNew: false })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals cancel=cancelHandler edit=editHandler save=saveHandler project=project}}`);

  assert.equal(this.$('.edit').length, 0, 'A record is being edited, so no other record can be edited');
});

test('it does not allow adding a record if a record is being edited', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: true, isNew: false })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals cancel=cancelHandler edit=editHandler save=saveHandler project=project}}`);

  assert.equal(this.$('.add').length, 0, 'A record is being edited, so no other record can be added');
});

test('it does not allow adding a record if a record is being added', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: true, isNew: true })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals cancel=cancelHandler edit=editHandler save=saveHandler project=project}}`);

  assert.equal(this.$('.add').length, 0, 'A record is being added, so no other record can be added');
});

test('it allows adding a record if no record is being added or edited', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: false, isNew: false })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals add=addHandler edit=editHandler project=project}}`);

  assert.equal(this.$('.add').length, 1, 'No record is being added or edited, so a new record can be added');
});

test('it calls provided "add" action with project as parameter when add button is clicked', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: false, isNew: false })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  let addHandler = function(actualProject) {
    let expectedProject = this.get('project');
    assert.deepEqual(actualProject, expectedProject);
  };
  setHandlers(this, { addHandler });

  this.render(hbs`{{donation-goals add=addHandler edit=editHandler project=project}}`);

  this.$('.add').click();
});

test('it allows activating donations if there are persisted records', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: false, isNew: false })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals add=addHandler edit=editHandler project=project}}`);

  assert.equal(this.$('.activate-donations').length, 1, 'The "activate donations" button is rendered');
});

test('it prevents activating donations if there are no persisted records', function(assert) {
  assert.expect(1);

  let mockGoals = [
    Object.create({ isEditing: false, isNew: true })
  ];

  this.set('project', Object.create({ donationGoals: mockGoals }));

  this.render(hbs`{{donation-goals add=addHandler edit=editHandler project=project}}`);

  assert.equal(this.$('.activate-donations').length, 0, 'The "activate donations" button is not rendered');
});
