import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';
import skillsInputItemComponent from '../../pages/components/skills-input-item';

const { Object, set } = Ember;

let page = PageObject.create(skillsInputItemComponent);

let skill = Object.create({
  selected: true,
  title: 'Ruby on Rails'
});

moduleForComponent('skills-input-item', 'Integration | Component | user skills input item', {
  integration: true,
  beforeEach() {
    stubService(this, 'user-skills-list', {
      contains() {
        return true;
      },
      find(queriedSkill) {
        if (queriedSkill === skill) {
          return skill;
        }
      }
    });
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

  page.render(hbs`
    {{skills-input-item
      query=query
      skill=skill
    }}
  `);

  assert.equal(page.listItemIsSelected, true);

  assert.equal(page.highlightedStrings(0).text, 'Ru');
  assert.equal(page.highlightedStrings(1).text, 'on');
  assert.equal(page.highlightedStrings(2).text, 'R');
});

test('it sends the hover action on mouseEnter', function(assert) {
  assert.expect(1);

  set(this, 'skill', skill);
  set(this, 'query', query);

  this.on('hover', (hoveredSkill) => {
    assert.deepEqual(skill, hoveredSkill);
  });
  page.render(hbs`
    {{skills-input-item
      hover="hover"
      query=query
      skill=skill
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

  page.render(hbs`
    {{skills-input-item
      hover="hover"
      query=query
      selectSkill=selectSkill
      skill=skill
      skills=skills
    }}
  `);

  page.mousedown();
});
