import { collection, isVisible } from 'ember-cli-page-object';
import projectSkillItem from 'code-corps-ember/tests/pages/components/project-skill-item';

export default {
  scope: '.project-skills-list',

  header: {
    scope: '.project-skills-list__header'
  },

  headerIsVisible: isVisible('.project-skills-list__header'),

  fallback: {
    scope: '.project-skills-list__falback'
  },

  fallbackIsVisible: isVisible('.project-skills-list__fallback'),

  skills: collection('.skill', projectSkillItem)
};
