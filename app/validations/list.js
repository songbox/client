import {
  validatePresence as presence,
} from 'ember-changeset-validations/validators';

export default {
  name: presence(true)
};
