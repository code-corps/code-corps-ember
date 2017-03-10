import {
  clickable,
  create,
  isHidden,
  text
} from 'ember-cli-page-object';

export default create({
  cancel: clickable('a#cancel'),
  cancelText: text('a#cancel'),
  dialogText: text('p', { scope: '.dialog-text' }),
  dialogTextIsHidden: isHidden('p', { scope: '.dialog-text' }),
  ok: clickable('button#ok'),
  okText: text('button#ok'),
  testContainer: 'body'
});
