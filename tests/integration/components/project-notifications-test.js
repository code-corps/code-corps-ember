import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/project-notifications';

let page = PageObject.create(component);

function renderPage() {
  page.render(hbs`
    {{project-notifications
      project=project
      submitForReview=submitForReview
    }}
  `);
}

moduleForComponent('project-notifications', 'Integration | Component | project notifications', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('when the project is approved', function(assert) {
  assert.expect(1);

  this.set('project', { approved: true });

  renderPage();

  assert.notOk(page.callout.isVisible, 'Callout is not visible.');
});

test('when the project is not approved and has no description', function(assert) {
  assert.expect(5);

  this.set('project', { approved: false, longDescriptionBody: null, approvalRequested: false });

  renderPage();

  assert.ok(page.callout.isVisible, 'Callout is visible.');
  assert.ok(page.callout.descriptionNeeded.isVisible, 'Description is needed');
  assert.notOk(page.callout.descriptionAdded.isVisible, 'Description is not added');
  assert.notOk(page.callout.reviewNeeded.isVisible, 'Review is not yet needed');
  assert.notOk(page.callout.reviewAdded.isVisible, 'Review is not added');
});

test('when the project is not approved and has a description but no review', function(assert) {
  assert.expect(6);

  let submitForReview = function() {
    assert.ok(true, 'The action is called.');
  };

  this.set('project', { approved: false, longDescriptionBody: 'Body', approvalRequested: false });
  this.set('submitForReview', submitForReview);

  renderPage();

  assert.ok(page.callout.isVisible, 'Callout is visible.');
  assert.notOk(page.callout.descriptionNeeded.isVisible, 'Description is already added');
  assert.ok(page.callout.descriptionAdded.isVisible, 'Description is added');
  assert.ok(page.callout.reviewNeeded.isVisible, 'Review is needed');
  assert.notOk(page.callout.reviewAdded.isVisible, 'Review is not added');

  page.callout.submitReviewButton.click();
});

test('when the project is not approved and is awaiting approval', function(assert) {
  assert.expect(5);

  this.set('project', { approved: false, longDescriptionBody: 'Body', approvalRequested: true });

  renderPage();

  assert.ok(page.callout.isVisible, 'Callout is visible.');
  assert.notOk(page.callout.descriptionNeeded.isVisible, 'Description is already added');
  assert.ok(page.callout.descriptionAdded.isVisible, 'Description is added');
  assert.notOk(page.callout.reviewNeeded.isVisible, 'Review is already submitted');
  assert.ok(page.callout.reviewAdded.isVisible, 'Review is pending');
});
