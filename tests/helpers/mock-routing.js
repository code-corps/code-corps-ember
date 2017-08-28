import Ember from 'ember';

const { Service } = Ember;

const service = Service.extend({
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
  },
  _routerMicrolib: {}
});

export default function mockRouting({ container }) {
  container.registry.register('service:-routing', service);
}

function mockRouter({ container }) {
  container.registry.register('router:main', service);
}

export { mockRouting, mockRouter };
