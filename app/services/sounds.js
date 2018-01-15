import Ember from 'ember';
import { get } from '@ember/object';
import Service from '@ember/service';
import { task, timeout } from 'ember-concurrency';

const { testing } = Ember;

const POPUP_URL = 'https://d3pgew4wbk2vb1.cloudfront.net/sounds/pop-up.ogg';
const TIME_BETWEEN_SOUNDS = testing ? 0 : 10000;

export default Service.extend({
  popup() {
    return get(this, '_play').perform(POPUP_URL);
  },

  _play: task(function* (url) {
    let audio = get(this, 'audio') || new Audio(url);
    audio.play();
    yield timeout(TIME_BETWEEN_SOUNDS);
  }).drop()
});
