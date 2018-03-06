import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import selectState from '../../../pages/components/select/state-select';
import PageObject from 'ember-cli-page-object';

let page = PageObject.create(selectState);

function setHandler(context, onChange = function() {}) {
  set(context, 'onChange', onChange);
}

moduleForComponent('select/state-select', 'Integration | Component | select/state select', {
  integration: true,
  beforeEach() {
    setHandler(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it triggers action on selection change', function(assert) {
  assert.expect(1);
  set(this, 'state', 'CA');

  setHandler(this, (newState) => {
    assert.equal(newState, 'NY', 'Action was triggered with expected value');
  });

  this.render(hbs`{{select/state-select state=state onChange=onChange}}`);

  page.state.fillIn('NY');
});
