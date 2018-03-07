import { set, getProperties } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import selectBirthDateComponent from '../../../pages/components/select/birth-date';
import PageObject from 'ember-cli-page-object';

let page = PageObject.create(selectBirthDateComponent);

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

  set(this, 'day', 1);
  set(this, 'month', 1);
  set(this, 'year', 2016);

  this.render(hbs`{{select/birth-date month=month day=day year=year}}`);

  assert.equal(page.month.text, 'January February March April May June July August September October November December');
});

test('it sets to the correct date', function(assert) {
  assert.expect(1);

  set(this, 'day', 1);
  set(this, 'month', 1);
  set(this, 'year', 2016);

  this.render(hbs`{{select/birth-date month=month day=day year=year}}`);

  page.month.fillIn('4');
  page.day.fillIn('13');
  page.year.fillIn('1970');

  assert.deepEqual(
    getProperties(this, 'day', 'month', 'year'),
    { day: 13, month: 4, year: 1970 },
    'Each selection change is passed out correctly'
  );
});
