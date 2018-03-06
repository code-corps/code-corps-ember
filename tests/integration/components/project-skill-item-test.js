import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/project-skill-item';

let page = PageObject.create(component);

function setHandler(context, clickHandler = () => {}) {
  set(context, 'clickHandler', clickHandler);
}

moduleForComponent('project-skill-item', 'Integration | Component | project skill item', {
  integration: true,
  beforeEach() {
    setHandler(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders loading spinnner if skill is loading', function(assert) {
  assert.expect(2);

  set(this, 'skill', { isLoading: true, title: 'Test' });

  this.render(hbs`{{project-skill-item skill=skill onClicked=clickHandler}}`);

  assert.ok(page.isLoading, 'Component is rendered as loading');
  assert.equal(page.text, '', 'Title is not rendered');
});

test('it renders skill title if skill is loaded', function(assert) {
  assert.expect(1);

  set(this, 'skill', { title: 'Test' });

  this.render(hbs`{{project-skill-item skill=skill onClicked=clickHandler}}`);

  assert.equal(page.text, 'Test', 'Title is rendered');
});

test('it calls action on click', function(assert) {
  assert.expect(1);

  let mockSkill = { id: 'skill', title: 'Skill' };
  set(this, 'skill', mockSkill);

  setHandler(this, (skill) => {
    assert.deepEqual(skill, mockSkill, 'The sent skill matches the assigned skill.');
  });

  this.render(hbs`{{project-skill-item skill=skill onClicked=clickHandler}}`);

  page.click();
});
