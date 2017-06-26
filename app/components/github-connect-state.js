import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

/**
  The github-connect-state component is used to display a button if not
  connected, or a user's GitHub avatar and username if connected.

  ## default usage

  ```handlebars
    {{github-connect-state
      githubAvatarUrl=user.githubAvatarUrl
      githubId=user.githubId
      githubUsername=user.githubUsername
    }}
  ```

  @module Component
  @class github-connect
  @extends Ember.Component
  @public
 */

export default Component.extend({
  classNames: ['github-connect-state'],

  redirectUri: null,

  githubAvatarUrlResized: computed('githubAvatarUrl', function() {
    return `${get(this, 'githubAvatarUrl')}&size=100`;
  })
});
