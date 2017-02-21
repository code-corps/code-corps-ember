import {
  hasClass
} from 'ember-cli-page-object';
import dragZone from 'code-corps-ember/tests/pages/components/drag-zone';

export default {
  dragZone,

  dropZone: {
    scope: '.image-drop',

    isActive: hasClass('image-drop--active'),
    isCircle: hasClass('image-drop--circle'),
    isDragging: hasClass('image-drop--drag')
  }
};
