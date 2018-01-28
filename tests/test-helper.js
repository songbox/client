import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

import './helpers/flash-message';
import { registerWaiter } from 'ember-raf-test-waiter';
registerWaiter();

setApplication(Application.create(config.APP));

start();
