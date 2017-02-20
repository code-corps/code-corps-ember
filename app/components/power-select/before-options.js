import BeforeOptionsComponent from 'ember-power-select/components/power-select/before-options';

export default BeforeOptionsComponent.extend({
  actions: {
    close() {
      this.get('selectRemoteController').actions.close();
    }
  }
});
