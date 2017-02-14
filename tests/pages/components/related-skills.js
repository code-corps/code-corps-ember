import { clickable, hasClass, notHasClass } from 'ember-cli-page-object';
import skillListItems from 'code-corps-ember/tests/pages/components/skill-list-items';

export default {
  scope: '.related-skills',
  expander: {
    scope: '.expander',
    hidden: hasClass('hidden'),
    visible: hasClass('visible'),
    click: clickable('a')
  },

  overflow: {
    scope: 'ul',
    hidden: hasClass('overflow-hidden'),
    visible: notHasClass('overflow-hidden')
  },

  skillListItems
};
