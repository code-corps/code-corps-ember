import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import { set, get } from '@ember/object';
import unselectedItemComponent from 'code-corps-ember/tests/pages/unselected-item.js';

let page = PageObject.create(unselectedItemComponent);

function renderPage() {
  page.render(hbs`
    {{unselected-item
      dropdownOpen=dropdownOpen
      tooltipShown=tooltipShown 
     }}`);
}

moduleForComponent('task-card/user/unselected-item', 'Integration | Component | task card/user/unselected item', {
  integration: true
});

test('mouseEnter hovers', function(assert) {
  renderPage();



});

test('mouseLeave unhovers')
