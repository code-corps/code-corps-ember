import {
  clickable
} from 'ember-cli-page-object';

export default {
  scope: '.site-footer',
  clickAboutLink: clickable('ul > li:eq(0) li:eq(0) a'),
  clickTeamLink: clickable('ul > li:eq(0) li:eq(1) a')
};
