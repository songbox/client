import ENV from '../config/environment';

export default function() {
  this.urlPrefix = ENV.api.host;
  this.namespace = ENV.api.namespace;

  this.post('/token', function () {
    return {
      "access_token": "dummy.token1234"
    };
  });

  this.get('/songs');
  this.get('/songs/:id');
  this.post('/songs');

  this.get('/lists');

  this.get('/rooms/:id');

  this.get('/user/current', function (schema) {
    let currentUser = schema.users.find(1) || {};
    return this.serialize(currentUser);
  });
}
