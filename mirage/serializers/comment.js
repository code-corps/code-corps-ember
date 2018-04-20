import MirageApplicationSerializer from './application';

export default MirageApplicationSerializer.extend({
  include: ['comment-user-mentions']
});
