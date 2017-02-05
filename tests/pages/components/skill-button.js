import { hasClass, is, triggerable } from 'ember-cli-page-object';

export default {
  scope: 'button',

  isDisabled: is(':disabled'),
  isLarge: hasClass('large'),

  mouseenter: triggerable('mouseenter'),
  mouseleave: triggerable('mouseleave'),

  span: {
    scope: 'span',

    hasCheck: hasClass('check-mark'),
    hasSpinner: hasClass('button-spinner'),
    hasX: hasClass('x-mark'),
    isLarge: hasClass('large')
  }
};
