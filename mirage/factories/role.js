import { Factory, faker } from 'ember-cli-mirage';
import Ember from 'ember';

const { String } = Ember;

export default Factory.extend({
  name() {
    return faker.name.jobArea();
  },
  slug() {
    if (this.name) {
      return String.dasherize(this.name.toLowerCase());
    }
  }
});
