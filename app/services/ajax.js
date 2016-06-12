import AjaxService from 'ember-ajax/services/ajax';
import ENV from 'code-corps-ember/config/environment';

export default AjaxService.extend({
  host: ENV.API_BASE_URL
});
