import {
  attribute,
  clickable,
  collection,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.site-footer',

  clickAboutLink: clickable('ul > li:eq(0) li:eq(0) a'),
  clickTeamLink: clickable('ul > li:eq(0) li:eq(1) a'),

  columns: collection('ul.footer-columns > li', {
    header: text('h4'),
    rows: collection('ul.footer-links > li', {
      link: { scope: 'a', href: attribute('href') },
      text: text()
    })
  }),

  rows: collection('ul.footer-links > li', {
    link: { scope: 'a', href: attribute('href') },
    text: text()
  })
};
