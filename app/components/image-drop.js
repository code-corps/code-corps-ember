import Ember from 'ember';

const {
  Component,
  String: { htmlSafe },
  computed,
  computed: { alias, notEmpty, or },
  get,
  inject: { service },
  run,
  set
} = Ember;

export default Component.extend({
  active: false,
  attributeBindings: ['style'],
  classNames: ['image-drop'],
  classNameBindings: [
    'active',
    'circle:is-circular',
    'isDraggingOnApp:is-dragging',
    'hasImage'
  ],
  droppedImage: null,
  helpText: 'Drop your image here.',
  originalImage: null,

  appDragState: service('dragState'),

  hasDroppedImage: notEmpty('droppedImage'),
  hasImage: or('hasDroppedImage', 'hasOriginalImage'),
  hasOriginalImage: notEmpty('originalImage'),
  isDraggingOnApp: alias('appDragState.isDragging'),

  style: computed('droppedImage', 'originalImage', function() {
    let backgroundStyle = '';

    if (get(this, 'droppedImage')) {
      backgroundStyle = `background-image: url(${get(this, 'droppedImage')});`;
    } else if (get(this, 'originalImage')) {
      backgroundStyle = `background-image: url(${get(this, 'originalImage')});`;
    }

    return htmlSafe(backgroundStyle);
  }),

  dragEnded() {
    this.dragLeave();
    get(this, 'appDragState').leaving();
  },

  dragLeave() {
    set(this, 'active', false);
  },

  dragOver() {
    set(this, 'active', true);
  },

  drop(event) {
    event.preventDefault();

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      return this._handleFileDrop(event.dataTransfer.files[0]);
    }

    let imageUrl = event.dataTransfer.getData('URL');
    if (!imageUrl) {
      return;
    }

    this._convertImgToBase64URL(imageUrl, (base64) => {
      set(this, 'droppedImage', base64);
    });
  },

  fileInputChange(files) {
    this._handleFileDrop(files[0]);
  },

  _convertImgToBase64URL(url, callback, outputFormat) {
    let img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      let canvas = document.createElement('CANVAS');
      let ctx = canvas.getContext('2d');
      let dataURL;
      canvas.height = this.height;
      canvas.width = this.width;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
      canvas = null;
    };
    img.src = url;
  },

  _handleFileDrop(file) {
    if (file == null) {
      return;
    }

    set(this, 'file', file);
    let reader = new FileReader();
    reader.onload = (e) => {
      let fileToUpload = e.target.result;
      run(() => {
        set(this, 'droppedImage', fileToUpload);
        this.dragEnded();
      });
    };

    reader.readAsDataURL(file);
  }
});
