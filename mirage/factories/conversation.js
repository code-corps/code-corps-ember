import { Factory } from 'ember-cli-mirage';
import moment from 'moment';

export default Factory.extend({
  updatedAt(i) {
    return moment().subtract(i, 'days');
  }
});
