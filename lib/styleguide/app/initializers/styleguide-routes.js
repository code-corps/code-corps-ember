import CodeCorpsRouter from 'code-corps-ember/router';
import styleguideRoutes from '../styleguide-routes';

export function initialize(/* application */) {
  CodeCorpsRouter.map(styleguideRoutes);
}

export default { initialize };
