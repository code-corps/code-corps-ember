import {
  collection,
  create,
  text,
  visitable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/team'),

  company: {
    scope: '.company',

    header: text('h2'),
    items: collection({ scope: 'li' })
  },

  contributors: {
    scope: '.contributors',

    header: text('h2'),
    items: collection({ scope: 'li' })
  }
});
