import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {

  this.route('app', function () {

    this.route('songs', {
      resetNamespace: true
    }, function () {
      this.route('add');

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
