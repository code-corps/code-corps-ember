import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import skillsTypeaheadResultComponent from '../../pages/components/skills-typeahead-result';

let page = PageObject.create(skillsTypeaheadResultComponent);

let skill = {
  selected: true,
  title: 'Ruby on Rails'
};

let userSkillsList = {
  includes() {
    return true;
  },
  find(queriedSkill) {
    if (queriedSkill === skill) {
      return skill;
    }
  }
};

moduleForComponent('skills-typeahead-result', 'Integration | Component | skills input item', {
  integration: true,
  beforeEach() {
    this.set('userSkillsList', userSkillsList);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

let query = 'ru on r';

test('it renders as selected with the highlighted string', function(assert) {
  assert.expect(4);

  set(this, 'skill', skill);
  set(this, 'query', query);

  this.render(hbs`
    {{skills-typeahead-result
      query=query
      skill=skill
      skillsList=userSkillsList
    }}
  `);

  assert.ok(page.listItemIsSelected);

  assert.equal(page.highlightedStrings.objectAt(0).text, 'Ru');
  assert.equal(page.highlightedStrings.objectAt(1).text, 'on');
  assert.equal(page.highlightedStrings.objectAt(2).text, 'R');
});

test('it sends the hover action on mouseEnter', function(assert) {
  assert.expect(1);

  set(this, 'skill', skill);
  set(this, 'query', query);

  this.on('hover', (hoveredSkill) => {
    assert.deepEqual(skill, hoveredSkill);
  });
  this.render(hbs`
    {{skills-typeahead-result
      hover="hover"
      query=query
      skill=skill
      skillsList=userSkillsList
    }}
  `);

  page.mouseenter();
});

test('it sends the selectSkill action on mouseDown', function(assert) {
  assert.expect(1);

  set(this, 'skill', skill);
  set(this, 'query', query);
  set(this, 'selectSkill', () => {
    assert.ok(true);
  });

  this.render(hbs`
    {{skills-typeahead-result
      hover="hover"
      query=query
      selectSkill=selectSkill
      skill=skill
      skillsList=userSkillsList
    }}
  `);

  page.mousedown();
});
