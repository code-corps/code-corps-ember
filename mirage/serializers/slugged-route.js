import MirageModelWithPolymorphicBelongsToSerializer from './model-with-polymorphic-belongs-to';

export default MirageModelWithPolymorphicBelongsToSerializer.extend({
  // we're faking a polymorphic relationship by including
  // user and organization in the serialize method
  include: ['organization', 'user'],
  // we then rename whichever of those is present
  // into 'model'
  renameTo: 'owner'
});
