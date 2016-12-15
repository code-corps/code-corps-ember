import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import selectBirthDate from '../../../pages/components/select/birth-date';
import PageObject from 'ember-cli-page-object';

let page = PageObject.create(selectBirthDate);

moduleForComponent('select/birth-date', 'Integration | Component | select/birth date', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it sets the month strings correctly', function(assert) {
  assert.expect(1);
  page.render(hbs`{{select/birth-date}}`);
  assert.equal(page.month.text, 'January February March April May June July August September October December');
});

test('it sets to the correct date', function(assert) {
  assert.expect(3);

  this.set('month', 1);
  this.set('day', 1);
  this.set('year', 2016);

  page.render(hbs`{{select/birth-date month=month day=day year=year}}`);

  page.month.fillIn('4');
  page.day.fillIn('13');
  page.year.fillIn('1970');

  let month = this.get('month');
  let day = this.get('day');
  let year = this.get('year');

  assert.equal(month, 4);
  assert.equal(day, 13);
  assert.equal(year, 1970);
});
