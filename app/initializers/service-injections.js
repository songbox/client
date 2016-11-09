export function initialize(application) {
  application.inject('controller', 'current', 'service:current');
}

export default {
  name: 'service-injections',
  initialize
};
