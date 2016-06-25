import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  description: attr(),
  title: attr(),

  matched: attr('boolean'),
});
