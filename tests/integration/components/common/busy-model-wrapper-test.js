import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { set } from '@ember/object';
import PageObject from 'ember-cli-page-object';

// Since this is a tagless component, we cannot effectively use a typical page
// object.
//
// Instead, we render the tagless form inside a test container and dynamically
// define a page object using the scope of the test container.

let page = PageObject.create({ scope: '.test-container' });

function renderPage() {
  page.render(hbs`
    <div class="test-container">
      {{#common/busy-model-wrapper model=model}}
        Yielded
      {{/common/busy-model-wrapper}}
    </div>
  `);
}

moduleForComponent('common/busy-model-wrapper', 'Integration | Component | common/busy model wrapper', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it shows "Deleting" if model is saving and is deleted', function(assert) {
  let model = { isSaving: true, isDeleted: true };
  set(this, 'model', model);

  renderPage();
  assert.equal(page.text, 'Deleting...', 'A deletion indicator is rendered in place of the yielded block.');
});

test('it shows "Saving" if model is saving and not deleted', function(assert) {
  let model = { isSaving: true, isDeleted: false };
  set(this, 'model', model);

  renderPage();
  assert.equal(page.text, 'Saving...', 'A deletion indicator is rendered in place of the yielded block.');
});

test('it shows yield if model is neither saving or deleted', function(assert) {
  let model = { isSaving: false, isDeleted: false };
  set(this, 'model', model);

  renderPage();
  assert.equal(page.text, 'Yielded', 'The yielded block is rendered.');
});
