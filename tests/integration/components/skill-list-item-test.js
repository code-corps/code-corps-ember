import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { Service } = Ember;

let userSkillsService = Service.extend({
  hasSkill(skill) {
    return skill;
  },
  findUserSkill(skill) {
    return skill;
  }
});

moduleForComponent('skill-list-item', 'Integration | Component | skill list item', {
  integration: true,
  beforeEach() {
    this.register('service:user-skills', userSkillsService);
  }
});

test('it renders and sends an action when its hidden', function(assert) {
  assert.expect(2);

  let skill = {
    title: 'Ruby'
  };
  this.set('skill', skill);

  this.on('skillItemHidden', function() {
    assert.ok(true);
  });

  // Wrap in div to make it hidden
  this.render(hbs`
    <div style="height: 0; width: 0;">
    {{skill-list-item skill=skill action='skillItemHidden'}}
    </div>
  `);

  assert.equal(this.$('li').text().trim(), 'Ruby');
});

test('it renders and sends no action when not hidden', function(assert) {
  assert.expect(1);

  let skill = {
    title: 'Ruby'
  };
  this.set('skill', skill);

  this.on('skillItemHidden', function() {
    // We expect 1 less test in assert.expect()
    assert.ok(true);
  });

  this.render(hbs`{{skill-list-item skill=skill action='skillItemHidden'}}`);

  assert.equal(this.$('li').text().trim(), 'Ruby');
});
