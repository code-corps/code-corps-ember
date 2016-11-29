import Ember from 'ember';
import FlashObject from 'ember-cli-flash/flash/object';

const { getOwner, K } = Ember;

FlashObject.reopen({ init: K });

export function getFlashMessageCount(context) {
  return getTestContainer(context).lookup('service:flash-messages').get('queue').length;
}

export function getFlashMessageAt(index, context) {
  return getTestContainer(context).lookup('service:flash-messages').get('queue')[index];
}

function getTestContainer(context) {
  if (context.application) { // acceptance test
    return context.application.__container__;

  } else { // integration/unit test
    return getOwner(context);
  }
}
