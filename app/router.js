import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {

  this.route('auth', function() {
    this.route('login');
    this.route('register');
  });

  this.route('app', {
    path: 'a'
  }, function () {

    this.route('songs', {
      resetNamespace: true
    }, function () {
      this.route('new');

      this.route('song', {
        path: ':song_id',
        resetNamespace: true
      }, function () {
      });
    });

    this.route('lists', {
      resetNamespace: true
    }, function () {
      this.route('add');
    });
  });

});

export default Router;
