import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import pageComponent from 'code-corps-ember/tests/pages/components/submittable-textarea';
import PageObject from 'ember-cli-page-object';

let page = PageObject.create(pageComponent);

function renderPage() {
  page.render(hbs`{{submittable-textarea modifiedSubmit=modifiedSubmitHandler}}`);
}

function setHandler(context, modifiedSubmitHandler = () => {}) {
  context.set('modifiedSubmitHandler', modifiedSubmitHandler);
}

moduleForComponent('submittable-textarea', 'Integration | Component | submittable textarea', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    setHandler(this);
  },
  afterEach() {
    page.removeContext();
  }
});

// This test is necessary because a new line after yield in the file will
// cause a new line in the textarea itself
test('it has no extra content when created', function(assert) {
  renderPage();
  assert.equal(page.value, '', 'Element is blank.');
});

test('it sends the modifiedSubmit action on command/ctrl + enter', function(assert) {
  assert.expect(1);

  setHandler(this, () => {
    assert.equal(page.value, '', 'Action was called. Input content was unchanged.');
  });

  renderPage();

  page.keySubmit();
});
