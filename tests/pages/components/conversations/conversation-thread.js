import { collection } from 'ember-cli-page-object';
import conversationComposer from 'code-corps-ember/tests/pages/components/conversations/conversation-composer';
import conversationPart from 'code-corps-ember/tests/pages/components/conversations/conversation-part';

export default {
  scope: '.conversation-thread',
  conversationComposer,
  conversationParts: collection(`.conversation-thread__messages ${conversationPart.scope}`, conversationPart)
};
