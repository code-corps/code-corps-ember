import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';
import userSkillsInputComponent from '../../pages/components/user-skills-input';
import wait from 'ember-test-helpers/wait';

const {
  Object,
  RSVP,
  set
} = Ember;

let page = PageObject.create(userSkillsInputComponent);

let skills = [
  Object.create({ title: 'Ruby' }),
  Object.create({ title: 'Ruby on Rails' })
];

let mockStore = {
  query() {
    return RSVP.resolve(skills);
  }
};

let mockUserSkillsListService = {
  contains(queriedSkill) {
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
  context.set('selectHandler', selectHandler);
}

moduleForComponent('user-skills-input', 'Integration | Component | user skills input', {
  integration: true,
  beforeEach() {
    stubService(this, 'store', mockStore);
    stubService(this, 'user-skills-list', mockUserSkillsListService);
    setHandlers(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it does nothing when pressing a random key', function(assert) {
  assert.expect(1);
  page.render(hbs`{{user-skills-input selectSkill=(action selectHandler)}}`);

  page.pressRKey();

  assert.equal(page.inputValue, '');
});

test('it fetches results when changing the input', function(assert) {
  assert.expect(5);
  let done = assert.async();
  page.render(hbs`{{user-skills-input selectSkill=(action selectHandler) query=query}}`);

  wait().then(() => {
    set(this, 'query', 'ruby ra');
    page.focus();

    assert.equal(page.inputValue, 'ruby ra');
    page.keydown();

    assert.equal(page.inputItems(0).highlightedStrings(0).text, 'Ruby');
    assert.equal(page.inputItems(0).listItemIsSelected, true);

    assert.equal(page.inputItems(1).highlightedStrings(1).text, 'Ra');
    assert.equal(page.inputItems(1).listItemIsSelected, false);

    done();
  });
});

test('it changes the selection when arrowing up or down', function(assert) {
  assert.expect(10);
  let done = assert.async();
  page.render(hbs`{{user-skills-input selectSkill=(action selectHandler) query=query}}`);

  wait().then(() => {
    set(this, 'query', 'ruby ra');
    page.focus();
    page.keydown();

    assert.equal(page.inputItems(0).listItemIsSelected, true);
    assert.equal(page.inputItems(1).listItemIsSelected, false);

    page.pressDownKey();
    assert.equal(page.inputItems(0).listItemIsSelected, false);
    assert.equal(page.inputItems(1).listItemIsSelected, true);

    page.pressDownKey();
    assert.equal(page.inputItems(0).listItemIsSelected, true);
    assert.equal(page.inputItems(1).listItemIsSelected, false);

    page.pressUpKey();
    assert.equal(page.inputItems(0).listItemIsSelected, false);
    assert.equal(page.inputItems(1).listItemIsSelected, true);

    page.pressUpKey();
    assert.equal(page.inputItems(0).listItemIsSelected, true);
    assert.equal(page.inputItems(1).listItemIsSelected, false);

    done();
  });
});

test('it hides when hitting esc key', function(assert) {
  assert.expect(2);
  let done = assert.async();
  page.render(hbs`{{user-skills-input selectSkill=(action selectHandler) query=query}}`);

  wait().then(() => {
    set(this, 'query', 'ruby ra');
    page.focus();
    page.keydown();

    assert.ok(page.dropdownMenuVisible);

    page.pressEscKey();

    assert.notOk(page.dropdownMenuVisible);
    done();
  });
});

test('it changes the selection when hovering', function(assert) {
  assert.expect(4);
  let done = assert.async();
  page.render(hbs`{{user-skills-input selectSkill=(action selectHandler) query=query}}`);

  wait().then(() => {
    set(this, 'query', 'ruby ra');
    page.focus();
    page.keydown();

    assert.equal(page.inputItems(0).listItemIsSelected, true);
    assert.equal(page.inputItems(1).listItemIsSelected, false);

    page.mouseenterDropdownSecondItem();
    assert.equal(page.inputItems(0).listItemIsSelected, false);
    assert.equal(page.inputItems(1).listItemIsSelected, true);
    done();
  });
});

test('it selects the skill when hitting enter', function(assert) {
  assert.expect(2);
  let done = assert.async();
  page.render(hbs`{{user-skills-input selectSkill=(action selectHandler) query=query}}`);

  wait().then(() => {
    set(this, 'query', 'ruby ra');
    page.focus();
    page.keydown();
    page.pressEnterKey();

    assert.equal(page.inputValue, '');
    assert.ok(page.dropdownMenuHidden);
    done();
  });
});

test('it selects the skill when hitting comma', function(assert) {
  assert.expect(2);
  let done = assert.async();
  page.render(hbs`{{user-skills-input selectSkill=(action selectHandler) query=query}}`);

  wait().then(() => {
    set(this, 'query', 'ruby ra');
    page.focus();
    page.pressCommaKey();

    assert.equal(page.inputValue, '');
    assert.ok(page.dropdownMenuHidden);
    done();
  });
});

test('it selects the skill when clicking it', function(assert) {
  assert.expect(2);
  let done = assert.async();
  page.render(hbs`{{user-skills-input selectSkill=(action selectHandler) query=query}}`);

  wait().then(() => {
    set(this, 'query', 'ruby ra');
    page.focus();
    page.keydown();
    page.mousedownDropdownSecondItem();

    assert.equal(page.inputValue, '');
    assert.ok(page.dropdownMenuHidden);
    done();
  });
});

test('it does nothing when there are no results', function(assert) {
  assert.expect(1);

  let query = function() {
    return RSVP.resolve([]);
  };
  set(this, 'store.query', query);

  let done = assert.async();
  page.render(hbs`{{user-skills-input selectSkill=(action selectHandler) query=query}}`);

  wait().then(() => {
    set(this, 'query', 'ruby ra');
    page.focus();
    page.keydown();
    page.pressEnterKey();

    assert.equal(page.inputValue, 'ruby ra');
    done();
  });
});
