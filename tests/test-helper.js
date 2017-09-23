import resolver from './helpers/resolver';
import './helpers/flash-message';

import { registerWaiter } from 'ember-raf-test-waiter';
registerWaiter();

import {
  setResolver
} from 'ember-qunit';
import { start } from 'ember-cli-qunit';

setResolver(resolver);
start();
