import {
  triggerable
} from 'ember-cli-page-object';

export default {
  dragleave: triggerable('dragleave', '.drag-zone'),
  dragover: triggerable('dragover', '.drag-zone')
};
