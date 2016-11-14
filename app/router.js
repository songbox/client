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

  this.route('viewer', {
    path: 'v'
  }, function () {
    this.route('not_found');
    this.route('room', {
      path: ':room_id',
    }, function () {
    });
  });

  this.route('app', {
    path: 'a'
  }, function () {

    this.route('songs', {
      resetNamespace: true
    }, function () {
      this.route('new');
      this.route('import');

      this.route('song', {
        path: ':song_id',
        resetNamespace: true
      }, function () {
        this.route('edit');
      });
    });

    this.route('lists', {
      resetNamespace: true
    }, function () {
      this.route('new');

      this.route('list', {
        path: ':list_id',
        resetNamespace: true
      }, function () {
        this.route('add');
        this.route('edit');

        this.route('song', {
          path: 'song/:song_id'
        }, function () {
        });
      });
    });

  });
});

export default Router;
