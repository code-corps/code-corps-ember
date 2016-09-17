import {
  clickable
} from 'ember-cli-page-object';

export default {
  scope: '.site-footer',
  clickLogo: clickable('.footer-logo'),
  clickTeamLink: clickable('ul > li:eq(1) li:eq(1) a'),
  clickAboutLink: clickable('ul > li:eq(1) li:eq(0) a')
};