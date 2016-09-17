import MirageApplicationSerializer from './application';

export default MirageApplicationSerializer.extend({
  include: ['organization', 'user'],
});
