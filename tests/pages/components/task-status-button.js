import {
  clickable
} from 'ember-cli-page-object';

export default {
  clickClose: clickable('[name=close]'),
  clickOpen: clickable('[name=open]')
};
