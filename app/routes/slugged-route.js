import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { hash } from 'rsvp';
export default Route.extend({

  async model({ slugged_route_slug: slug }) {
    let sluggedRoute = await get(this, 'store').queryRecord('slugged-route', { slug });
    return hash({
      organization: get(sluggedRoute, 'organization'),
      user: get(sluggedRoute, 'user')
    });
  }
});
