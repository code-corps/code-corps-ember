import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import selectBirthDateComponent from '../../../pages/components/select/birth-date';
import PageObject from 'ember-cli-page-object';

const {
  getProperties,
  set,
  setProperties
} = Ember;

let page = PageObject.create(selectBirthDateComponent);

function setHandler(context, onChange = function() {}) {
  set(context, 'onChange', onChange);
}

function renderPage() {
  page.render(hbs`{{select/birth-date month=month day=day year=year onChange=onChange}}`);
}

moduleForComponent('select/birth-date', 'Integration | Component | select/birth date', {
  integration: true,
  beforeEach() {
    setHandler(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it sets the month strings correctly', function(assert) {
  assert.expect(1);

  renderPage();

  assert.equal(page.month.text, 'January February March April May June July August September October December');
});

test('it sets to the correct date', function(assert) {
  assert.expect(1);

  this.set('day', 1);
  this.set('month', 1);
  this.set('year', 2016);

  setHandler(this, (day, month, year) => {
    setProperties(this, { day, month, year });
  });

  renderPage();

  page.month.fillIn('4');
  page.day.fillIn('13');
  page.year.fillIn('1970');

  assert.deepEqual(
    getProperties(this, 'day', 'month', 'year'),
    { day: 13, month: 4, year: 1970 },
    'Each selection change is reported correctly'
  );
});
