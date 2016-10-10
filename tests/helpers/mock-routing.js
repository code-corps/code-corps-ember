import Ember from 'ember';

const { Object } = Ember;

export default function mockRouting({ container }) {
  container.registry.register('service:-routing', Object.extend({
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
