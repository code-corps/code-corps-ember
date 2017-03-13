import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/project-skills-list';

let page = PageObject.create(component);

const {
  set, setProperties
} = Ember;

function setHandler(context, clickHandler = () => {}) {
  set(context, 'clickHandler', clickHandler);
}

function renderPage() {
  page.render(hbs`
    {{project-skills-list
      project=project
      excludedSkills=excludedSkills
      onSkillClicked=clickHandler
      showHeader=showHeader
      header=header
    }}
  `);
}

let ruby = { title: 'Ruby', id: 1 };
let css = { title: 'CSS', id: 2 };

let project = {
  projectSkills: [
    { skill: ruby },
    { skill: css }
  ]
};

moduleForComponent('project-skills-list', 'Integration | Component | project skills list', {
  integration: true,
  beforeEach() {
    setHandler(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders header if set that way', function(assert) {
  assert.expect(1);

  setProperties(this, { showHeader: true, header: 'Test' });
  renderPage();

  assert.equal(page.header.text, 'Test');
});

test('it hides header by default', function(assert) {
  assert.expect(1);

  set(this, 'header', 'Test');
  renderPage();

  assert.notOk(page.headerIsVisible, 'Header is not rendered');
});

test('it renders a list of project skills', function(assert) {
  assert.expect(3);

  set(this, 'project', project);

  renderPage();

  assert.equal(page.skills().count, 2, 'Correct number of skills is rendered.');
  assert.equal(page.skills(0).text, 'Ruby', 'Skill is rendered correctly.');
  assert.equal(page.skills(1).text, 'CSS', 'Skill is rendered correctly.');
});

test('it is able to filter out skills if exclusion list is provided', function(assert) {
  assert.expect(2);

  set(this, 'project', project);
  set(this, 'excludedSkills', [css]);

  renderPage();

  assert.equal(page.skills().count, 1, 'Correct number of skills is rendered.');
  assert.equal(page.skills(0).text, 'Ruby', 'Skill is rendered correctly.');
});

test('it renders fallback if there are no skills to render', function(assert) {
  assert.expect(1);

  renderPage();

  assert.ok(page.fallbackIsVisible, 'Fallback is rendered.');
});

test('it calls proper function when clicking a skill', function(assert) {
  assert.expect(1);

  set(this, 'project', project);

  setHandler(this, (skill) => {
    assert.deepEqual(skill, css, 'Correct skill was sent on click.');
  });

  renderPage();

  page.skills(1).click();
});
