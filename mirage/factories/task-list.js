import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  order() {
    return (this.position || 0) * 100;
  },
  position(i) {
    return i + 1;
  }
});
