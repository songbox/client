import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import { inject as service } from '@ember/service';

const Router = EmberRouter.extend({
  location: config.locationType,

  metrics: service(),
  router: service(),

  init() {
    this._super(...arguments);

    this.on('routeDidChange', () => {
      const page = this.router.currentURL;
      const title = this.router.currentRouteName || 'unknown';

      this.metrics.trackPage({ page, title });
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

        this.route('item', {
          path: ':position'
        }, function () {
        });
      });
    });

  });
});

export default Router;
