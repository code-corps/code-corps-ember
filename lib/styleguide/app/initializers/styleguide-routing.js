// my-app/lib/styleguide/app/initializers/styleguide-routing.js

import MyAppRouter from 'code-corps-ember/router';
import styleguideRoutes from '../styleguide-routes';

export function initialize() {
  MyAppRouter.map(styleguideRoutes);
}

export default {
  name: 'styleguide-routes',
  initialize
};
