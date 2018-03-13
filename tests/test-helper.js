import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import { run } from '@ember/runloop';
import { useNativeEvents } from 'ember-cli-page-object/extend';
import loadEmberExam from 'ember-exam/test-support/load';
import './helpers/flash-message';

loadEmberExam();
useNativeEvents();
run.later = run.next;
setApplication(Application.create(config.APP));
start();
