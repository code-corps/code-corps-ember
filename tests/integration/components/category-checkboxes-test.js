import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { set } from '@ember/object';
import component from 'code-corps-ember/tests/pages/components/category-checkboxes';
import PageObject from 'ember-cli-page-object';

let page = PageObject.create(component);

function renderPage() {
  page.render(hbs`
    {{category-checkboxes
      options=options
      selection=selection
      updateCategories=updateCategories
    }}
  `);
}

moduleForComponent('category-checkboxes', 'Integration | Component | category checkboxes', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it works for unselecting selected categories', function(assert) {
  assert.expect(4);

  let option = { id: 1, name: 'Test' };
  let options = [option];
  let selection = [option];

  set(this, 'options', options);
  set(this, 'selection', selection);
  set(this, 'updateCategories', function() {
    assert.ok(true);
  });

  renderPage();

  assert.equal(page.checkboxes(0).label.name, 'Test', 'Renders the name');
  assert.ok(page.checkboxes(0).isChecked, 'Checkbox is checked');
  page.checkboxes(0).label.click();
  assert.notOk(page.checkboxes(0).isChecked, 'Checkbox is not checked');
});

test('it works for selecting unselected categories', function(assert) {
  assert.expect(4);

  let option = { id: 1, name: 'Test' };
  let options = [option];
  let selection = [];

  set(this, 'options', options);
  set(this, 'selection', selection);
  set(this, 'updateCategories', function() {
    assert.ok(true);
  });

  renderPage();

  assert.equal(page.checkboxes(0).label.name, 'Test', 'Renders the name');
  assert.notOk(page.checkboxes(0).isChecked, 'Checkbox is not checked');
  page.checkboxes(0).label.click();
  assert.ok(page.checkboxes(0).isChecked, 'Checkbox is checked');
});
