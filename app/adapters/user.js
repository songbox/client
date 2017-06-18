import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  urlForCreateRecord(/*modelName, snapshot*/) {
    return this._super(...arguments).replace('users', 'register');
  },
  urlForUpdateRecord(/*modelName, snapshot*/) {
    return this._super(...arguments).replace(/[0-9]+$/, 'current')
  }
});
