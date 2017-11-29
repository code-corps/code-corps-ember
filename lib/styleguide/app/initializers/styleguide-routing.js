import CodeCorpsRouter from 'code-corps-ember/router';
import styleguideRoutes from '../styleguide-routes';

export function initialize() {
  CodeCorpsRouter.map(styleguideRoutes);
}

export default {
  name: 'styleguide-routes',
  initialize
};
