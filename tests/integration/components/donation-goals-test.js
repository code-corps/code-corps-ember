import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/donation-goals';

function setHandlers(context, { addHandler = function() {}, cancelHandler = function() {}, editHandler = function() {}, saveHandler = function() {} } = {}) {
  set(context, 'addHandler', addHandler);
  set(context, 'cancelHandler', cancelHandler);
  set(context, 'editHandler', editHandler);
  set(context, 'saveHandler', saveHandler);
}

let page = PageObject.create(component);

moduleForComponent('donation-goals', 'Integration | Component | donation goals', {
  integration: true,
  beforeEach() {
    setHandlers(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders loading goals when not loaded', function(assert) {
  assert.expect(1);

  let mockGoals = [{ isLoaded: false }];

  set(this, 'project', { donationGoals: mockGoals });

  this.render(hbs`{{donation-goals add=addHandler edit=editHandler project=project}}`);

  assert.equal(page.donationGoalLoadings.length, 1, 'Renders correct number of donation-goal-loading elements');
});

test('it renders the correct number of subcomponents', function(assert) {
  assert.expect(1);

  let mockGoals = [
    { isLoaded: true },
    { isLoaded: true },
    { isLoaded: true }
  ];

  set(this, 'project', { donationGoals: mockGoals });

  this.render(hbs`{{donation-goals add=addHandler edit=editHandler project=project}}`);

  assert.equal(page.donationGoals.length, 3, 'Renders correct number of donation-goal components');
});

test('it renders the correct number of subcomponents in view or edit mode', function(assert) {
  assert.expect(2);

  let mockGoals = [
    { isEditing: false, isLoaded: true  },
    { isEditing: true, isLoaded: true  },
    { isEditing: false, isLoaded: true  }
  ];

  set(this, 'project', { donationGoals: mockGoals });

  this.render(hbs`{{donation-goals cancel=cancelHandler edit=editHandler save=saveHandler project=project}}`);

  assert.equal(page.donationGoals.length, 2, 'Renders correct number of donation-goal components');
  assert.equal(page.donationGoalEdits.length, 1, 'Renders correct number of donation-goal-edit components');
});

test('it sends "cancel" action with donation goal as parameter when cancel button is clicked', function(assert) {
  assert.expect(1);

  let mockGoals = [
    { isEditing: true, isLoaded: true, isNew: false }
  ];

  set(this, 'project', { donationGoals: mockGoals });

  let cancelHandler =  function(donationGoal) {
    assert.deepEqual(mockGoals[0], donationGoal, 'Handler got called, with donation goal');
  };

  setHandlers(this, { cancelHandler });

  this.render(hbs`{{donation-goals cancel=cancelHandler save=saveHandler project=project}}`);

  page.cancel.click();
});

test('it sends "edit" action with donation goal as parameter when clicked', function(assert) {
  assert.expect(1);

  let mockGoals = [
    { isEditing: false, isLoaded: true, isNew: false }
  ];

  set(this, 'project', { donationGoals: mockGoals });

  let editHandler = function(donationGoal) {
    assert.deepEqual(mockGoals[0], donationGoal, 'Handler got called, with donation goal');
  };
  setHandlers(this, { editHandler });

  this.render(hbs`{{donation-goals add=addHandler edit=editHandler project=project}}`);

  page.donationGoals.objectAt(0).click();
});

test('it sends "save" action with donation goal curried first, and values second when save button is clicked', function(assert) {
  assert.expect(2);

  let mockGoals = [
    { amount: 500, description: 'Lorem ipsum', isEditing: true, isLoaded: true, isNew: false }
  ];

  set(this, 'project', { donationGoals: mockGoals });

  let saveHandler = function(donationGoal, { amount, description }) {
    assert.deepEqual(mockGoals[0], donationGoal, 'First parameter for handler is donation goal');
    assert.deepEqual({ amount, description }, { amount: 500, description: 'Lorem ipsum' }, 'Second parameter for handler are provided values');
  };
  setHandlers(this, { saveHandler });

  this.render(hbs`{{donation-goals cancel=cancelHandler save=saveHandler project=project}}`);

  page.save.click();
});

test('it does not allow cancelling an edited record if that record is the only one, and new', function(assert) {
  assert.expect(1);

  let mockGoals = [
    { isEditing: true, isLoaded: true, isNew: true }
  ];

  set(this, 'project', { donationGoals: mockGoals });

  this.render(hbs`{{donation-goals cancel=cancelHandler save=saveHandler project=project}}`);

  assert.notOk(page.cancel.isVisible);
});

test('it allows cancelling an edited record if that record is the only one and not new', function(assert) {
  assert.expect(1);

  let mockGoals = [
    { isEditing: true, isLoaded: true, isNew: false }
  ];

  set(this, 'project', { donationGoals: mockGoals });

  this.render(hbs`{{donation-goals cancel=cancelHandler save=saveHandler edit=editHandler project=project}}`);

  assert.ok(page.cancel.isVisible);
});

test('it allows cancelling an edited record if that record is new, but there are other persisted goals', function(assert) {
  assert.expect(1);

  let mockGoals = [
    { isEditing: true, isLoaded: true, isNew: true },
    { isEditing: false, isLoaded: true, isNew: false }
  ];

  set(this, 'project', { donationGoals: mockGoals });

  this.render(hbs`{{donation-goals cancel=cancelHandler edit=editHandler save=saveHandler project=project}}`);

  assert.ok(page.cancel.isVisible);
});

test('it only allows editing a single record at a time', function(assert) {
  assert.expect(1);

  let mockGoals = [
    { isEditing: true, isLoaded: true, isNew: false },
    { isEditing: false, isLoaded: true, isNew: false }
  ];

  set(this, 'project', { donationGoals: mockGoals });

  this.render(hbs`{{donation-goals cancel=cancelHandler edit=editHandler save=saveHandler project=project}}`);

  assert.notOk(page.edit.isVisible);
});

test('it does not allow adding a record if a record is being edited', function(assert) {
  assert.expect(1);

  let mockGoals = [{ isEditing: true, isLoaded: true, isNew: false }];

  set(this, 'project', { donationGoals: mockGoals });

  this.render(hbs`{{donation-goals cancel=cancelHandler edit=editHandler save=saveHandler project=project}}`);

  assert.notOk(page.add.isVisible);
});

test('it does not allow adding a record if a record is being added', function(assert) {
  assert.expect(1);

  let mockGoals = [{ isEditing: true, isLoaded: true, isNew: true }];

  set(this, 'project', { donationGoals: mockGoals });

  this.render(hbs`{{donation-goals cancel=cancelHandler edit=editHandler save=saveHandler project=project}}`);

  assert.notOk(page.add.isVisible);
});

test('it allows adding a record if no record is being added or edited', function(assert) {
  assert.expect(1);

  let mockGoals = [{ isEditing: false, isLoaded: true, isNew: false }];

  set(this, 'project', { donationGoals: mockGoals });

  this.render(hbs`{{donation-goals add=addHandler edit=editHandler project=project}}`);

  assert.ok(page.add.isVisible);
});

test('it calls provided "add" action with project as parameter when add button is clicked', function(assert) {
  assert.expect(1);

  let mockGoals = [{ isEditing: false, isLoaded: true, isNew: false }];

  set(this, 'project', { donationGoals: mockGoals });

  let addHandler = function(actualProject) {
    let expectedProject = this.get('project');
    assert.deepEqual(actualProject, expectedProject);
  };
  setHandlers(this, { addHandler });

  this.render(hbs`{{donation-goals add=addHandler edit=editHandler project=project}}`);

  page.add.click();
});
