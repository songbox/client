export function initialize(application) {
  application.inject('component', 'i18n', 'service:intl');
}

export default {
  name: 'ember-form-for-i18n',
  initialize
};
