// tests/helpers/setup-mirage-for-integration.js
import mirageInitializer from '../../initializers/ember-cli-mirage';

export default function startMirage(container) {
  mirageInitializer.initialize(container);
}
