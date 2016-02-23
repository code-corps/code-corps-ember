import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  slug() {
    return this.name().toLowerCase();
  }
});
