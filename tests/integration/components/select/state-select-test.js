import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import selectState from '../../../pages/components/select/state-select';
import PageObject from 'ember-cli-page-object';

const {
  get,
  set
} = Ember;

let page = PageObject.create(selectState);

moduleForComponent('select/state-select', 'Integration | Component | select/state select', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it sets the correct state', function(assert) {
  assert.expect(1);
  set(this, 'state', 'CA');
  page.render(hbs`{{select/state-select state=state}}`);
  page.state.fillIn('CA');
  let state = get(this, 'state');
  assert.equal(state, 'CA');
});
