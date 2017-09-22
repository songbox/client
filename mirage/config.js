import ENV from '../config/environment';

export default function() {
  this.passthrough('/write-coverage');
  this.post('https://sentry.io/**', () => {
  });

  this.urlPrefix = ENV.api.host;
  this.namespace = ENV.api.namespace;

  this.post('/token', () => {
    return {
      "access_token": "dummy.token1234"
    };
  });

  this.get('/songs');
  this.get('/songs/:id');
  this.del('/songs/:id');
  this.patch('/songs/:id');
  this.post('/songs');

  this.get('/lists');
  this.get('/lists/:id');
  this.del('/lists/:id');
  this.post('/lists');

  this.post('/list-items');
  this.get('/list-items/:id');
  this.del('/list-items/:id');
  this.patch('/list-items/:id');

  this.get('/rooms/:id');

  this.get('/users/current', (schema) => {
    let currentUser = schema.users.find(1) || {};
    return currentUser;
  });
  this.patch('/users/current', (schema, request) => {
    let currentUser = schema.users.find(1) || {};
    let attrs = JSON.parse(request.requestBody)['data']['attributes'];
    return currentUser.update(attrs);
  });
}
