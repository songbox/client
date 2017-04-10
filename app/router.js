import Ember from 'ember';
import config from './config/environment';

const {
  get,
  inject: { service },
  run: { scheduleOnce }
} = Ember;

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  metrics: service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    scheduleOnce('afterRender', this, () => {
      const page = this.get('url');
      const title = this.getWithDefault('currentRouteName', 'unknown');
      get(this, 'metrics').trackPage({ page, title });
    });
  }
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

        this.route('item', {
          path: ':position'
        }, function () {
        });
      });
    });

  });
});

export default Router;
