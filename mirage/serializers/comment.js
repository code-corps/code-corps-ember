import MirageApplicationSerializer from './application';

export default MirageApplicationSerializer.extend({
  include: ['commentUserMentions'],
});
