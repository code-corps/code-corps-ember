import Application from '../app';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import './helpers/flash-message';
import loadEmberExam from 'ember-exam/test-support/load';
import { run } from '@ember/runloop';

loadEmberExam();

run.later = run.next;

setApplication(Application.create({ autoboot: false }));

start();
