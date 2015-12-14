import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from 'code-corps-ember/config/environment';

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: ENV.OAUTH_SERVER_TOKEN_ENDPOINT
});