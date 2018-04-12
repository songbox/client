import Route from '@ember/routing/route';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import UserValidation from 'songbox/validations/user';

export default Route.extend(AuthenticatedRouteMixin, {
  pubsub: service(),
  session: service(),
  current: service(),

  authenticationRoute: computed(function() {
    return 'auth.login';
  }),

  model() {
    return this.current.load().then((user) => {
      let channel = null;
      if (! this._isFastBoot) {
        this.pubsub.connectUser();
        const channelName = `room:${user.get('room.uid')}`;
        channel = this.pubsub.joinChannel(channelName);
      }
      return RSVP.hash({ user, channel });
    }).catch((/*err*/) => {
      return this.session.invalidate();
    });
  },

  // copied from 'AuthenticatedRouteMixin'
  afterModel(model, transition) {
    if (! this.get('session.isAuthenticated')) {
      if (! this._isFastBoot) {
        this.set('session.attemptedTransition', transition);
      }
      let authenticationRoute = this.authenticationRoute;
      return this.transitionTo(authenticationRoute);
    } else {
      return this._super(...arguments);
    }
  },

  setupController(controller, model) {
    this._super(...arguments);
    const validator = UserValidation;
    const changeset = new Changeset(model.user, lookupValidator(validator), validator);
    controller.set('changeset', changeset);
  },

  actions: {
    editUser(/*user*/) {
      this.transitionTo({ queryParams: { editUser: true }});
    },
    saveUser(changeset) {
      return changeset.validate().then(() => {
        if (changeset.get('isValid')) {
          changeset.save().then(() => {
            changeset.rollback();
            this.transitionTo({ queryParams: { editUser: false }});
          });
        }
      });
    },
    cancelUser(changeset) {
      changeset.rollback();
      this.transitionTo({ queryParams: { editUser: false }});
    },
    logout() {
      return this.session.invalidate();
    }
  }
});
