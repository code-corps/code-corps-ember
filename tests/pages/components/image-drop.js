import {
  findElement,
  hasClass
} from 'ember-cli-page-object';

import dragZone from 'code-corps-ember/tests/pages/components/drag-zone';
import fillInFileInput from 'code-corps-ember/tests/helpers/fill-in-file-input';
import removeDoubleQuotes from 'code-corps-ember/tests/helpers/remove-double-quotes';

export default {
  dragZone,

  dropZone: {
    scope: '.image-drop',

    backgroundImageData() {
      let $el = findElement(this);
      let backgroundImageData = $el.css('background-image');
      return removeDoubleQuotes(backgroundImageData);
    },

    backgroundImageUrl() {
      let url = this.backgroundImageData();
      return url.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
    },

    dropFile(content) {
      fillInFileInput(`${this.scope} input[type=file]`, { name: 'file.png', content });
    },

    isActive: hasClass('image-drop--active'),
    isCircle: hasClass('image-drop--circle'),
    isDragging: hasClass('image-drop--drag')
  }
};
