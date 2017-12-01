import RSVP from 'rsvp';
import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';
import skillsTypeaheadComponent from '../../pages/components/skills-typeahead';
import { focus } from 'ember-native-dom-helpers';

let page = PageObject.create(skillsTypeaheadComponent);

let skills = [
  { title: 'Ruby' },
  { title: 'Ruby on Rails' }
];

let mockStore = {
  query() {
    return RSVP.resolve(skills);
  }
};

let mockListService = {
  includes(queriedSkill) {
    return queriedSkill === skills[1];
  },
  find(queriedSkill) {
    if (queriedSkill === skills[1]) {
      return queriedSkill;
    }
  },
  remove() {
    return true;
  }
};

function setHandlers(context, { selectHandler = function() {} } = {}) {
  set(context, 'mockListService', mockListService);
  set(context, 'selectHandler', selectHandler);
}

moduleForComponent('skills-typeahead', 'Integration | Component | skills typeahead', {
  integration: true,
  beforeEach() {
    stubService(this, 'store', mockStore);
    stubService(this, 'user-skills-list', mockListService);
    setHandlers(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it does nothing when pressing a random key', function(assert) {
  assert.expect(1);
  page.render(hbs`{{skills-typeahead selectSkill=(action selectHandler) skillsList=mockListService}}`);
  page.pressRKey();
  assert.equal(page.inputValue, '');
});

test('it fetches results when changing the input', function(assert) {
  let done = assert.async();
  assert.expect(5);

  page.render(hbs`{{skills-typeahead selectSkill=(action selectHandler) query=query skillsList=mockListService}}`);

  page.fillIn('ruby ra');

  assert.equal(page.inputValue, 'ruby ra');
  page.keydown();
  focus('input');

  page.dropdown.inputItems(0).as((item) => {
    assert.equal(item.highlightedStrings(0).text, 'Ruby');
    assert.ok(item.listItemIsSelected);
  });

  page.dropdown.inputItems(1).as((item) => {
    assert.equal(item.highlightedStrings(1).text, 'Ra');
    assert.notOk(item.listItemIsSelected);
  });

  done();
});

test('it changes the selection when arrowing up or down', function(assert) {
  let done = assert.async();
  assert.expect(10);

  page.render(hbs`{{skills-typeahead selectSkill=(action selectHandler) query=query skillsList=mockListService}}`);

  page.fillIn('ruby ra');
  page.keydown();
  focus('input');

  assert.ok(page.dropdown.inputItems(0).listItemIsSelected);
  assert.notOk(page.dropdown.inputItems(1).listItemIsSelected);

  page.pressDownKey();
  assert.notOk(page.dropdown.inputItems(0).listItemIsSelected);
  assert.ok(page.dropdown.inputItems(1).listItemIsSelected);

  page.pressDownKey();
  assert.ok(page.dropdown.inputItems(0).listItemIsSelected);
  assert.notOk(page.dropdown.inputItems(1).listItemIsSelected);

  page.pressUpKey();
  assert.notOk(page.dropdown.inputItems(0).listItemIsSelected);
  assert.ok(page.dropdown.inputItems(1).listItemIsSelected);

  page.pressUpKey();
  assert.ok(page.dropdown.inputItems(0).listItemIsSelected);
  assert.notOk(page.dropdown.inputItems(1).listItemIsSelected);

  done();
});

test('it hides and clears input when hitting esc key', function(assert) {
  let done = assert.async();
  assert.expect(3);

  page.render(hbs`{{skills-typeahead selectSkill=(action selectHandler) query=query skillsList=mockListService}}`);

  page.fillIn('ruby ra');
  page.keydown();
  focus('input');

  assert.ok(page.dropdown.isVisible);

  page.pressEscKey();

  assert.equal(page.inputValue, '');
  assert.notOk(page.dropdown.isVisible);
  done();
});

test('it changes the selection when hovering', function(assert) {
  let done = assert.async();
  assert.expect(4);

  page.render(hbs`{{skills-typeahead selectSkill=(action selectHandler) query=query skillsList=mockListService}}`);

  page.fillIn('ruby ra');
  page.keydown();
  focus('input');

  assert.ok(page.dropdown.inputItems(0).listItemIsSelected);
  assert.notOk(page.dropdown.inputItems(1).listItemIsSelected);

  page.dropdown.mouseenterSecondItem();
  assert.notOk(page.dropdown.inputItems(0).listItemIsSelected);
  assert.ok(page.dropdown.inputItems(1).listItemIsSelected);
  done();
});

test('it selects the skill when hitting enter', function(assert) {
  let done = assert.async();
  assert.expect(2);

  page.render(hbs`{{skills-typeahead selectSkill=(action selectHandler) query=query skillsList=mockListService}}`);

  page.fillIn('ruby ra');
  page.keydown();
  page.pressEnterKey();

  assert.equal(page.inputValue, '');
  assert.notOk(page.dropdown.isVisible);
  done();
});

test('it selects the skill when hitting comma', function(assert) {
  let done = assert.async();
  assert.expect(2);

  page.render(hbs`{{skills-typeahead selectSkill=(action selectHandler) query=query skillsList=mockListService}}`);

  page.fillIn('ruby ra');
  page.pressCommaKey();

  assert.equal(page.inputValue, '');
  assert.notOk(page.dropdown.isVisible);
  done();
});

test('it selects the skill when clicking it', function(assert) {
  let done = assert.async();
  assert.expect(2);

  page.render(hbs`{{skills-typeahead selectSkill=(action selectHandler) query=query skillsList=mockListService}}`);

  page.fillIn('ruby ra');
  page.keydown();
  focus('input');

  page.dropdown.mousedownSecondItem();

  assert.equal(page.inputValue, '');
  assert.notOk(page.dropdown.isVisible);
  done();
});

test('it does nothing when there are no results', function(assert) {
  let done = assert.async();
  assert.expect(1);

  let query = function() {
    return RSVP.resolve([]);
  };
  set(this, 'store.query', query);

  page.render(hbs`{{skills-typeahead selectSkill=(action selectHandler) query=query skillsList=mockListService}}`);

  page.fillIn('ruby ra');
  page.keydown();
  page.pressEnterKey();

  assert.equal(page.inputValue, 'ruby ra');
  done();
});
