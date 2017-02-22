import {
  collection,
  hasClass,
  isVisible,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.suggestions p',

  ok: hasClass('ok'),
  notOk: hasClass('not-ok'),
  visible: isVisible(),

  suggestions: collection({
    itemScope: 'li',
    item: {
      text: text()
    }
  })
};
