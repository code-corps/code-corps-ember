import Ember from 'ember';

const { Service } = Ember;

export default function mockRouting({ container }) {
  container.registry.register('service:-routing', Service.extend({
    availableRoutes() {
      return ['index'];
    },
    hasRoute(name) {
      return name === 'index';
    },
    isActiveForRoute() {
      return true;
    },
    generateURL(route) {
      return `/${route}`;
    }
  }));
}
