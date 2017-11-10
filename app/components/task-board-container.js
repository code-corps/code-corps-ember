import Component from '@ember/component';
import ShopifyDraggable from '@shopify/draggable';
import { set } from '@ember/object';

const { Sortable } = ShopifyDraggable;

export default Component.extend({
  classNames: ['task-board-container'],

  didRender() {
    this._super(...arguments);

    let draggable = new Sortable(document.querySelectorAll('.task-list-cards'), {
      draggable: '.task-card', // #defaults to .draggable-source
      droppable: '.task-list-cards'
    });
    set(this, 'draggable', draggable);
    draggable.on('drag:over:container',  () => console.log('drag:over-container'));
  }
});
