export function initialize(application) {
  application.inject('component', 'i18n', 'service:i18n');
}

export default {
  name: 'ember-form-for-i18n',
  initialize
};
