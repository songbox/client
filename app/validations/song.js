import {
  validatePresence as presence,
} from 'ember-changeset-validations/validators';

export default {
  title: presence(true),
  format: presence(true)
};
