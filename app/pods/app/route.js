import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import UserValidation from 'songbox/validations/user';

const {
  computed,
  inject: { service },
  RSVP
} = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  pubsub: service(),
  session: service(),
  current: service(),

  authenticationRoute: computed(function() {
    return 'auth.login';
  }),

  model() {
    return this.get('current').load().then((user) => {
      let channel = null;
      if (! this.get('_isFastBoot')) {
        this.get('pubsub').connectUser();
        const channelName = `room:${user.get('room.uid')}`;
        channel = this.get('pubsub').joinChannel(channelName);
      }
      return RSVP.hash({ user, channel });
    }).catch((/*err*/) => {
      return this.get('session').invalidate();
    });
  },

  // copied from 'AuthenticatedRouteMixin'
  afterModel(model, transition) {
    if (! this.get('session.isAuthenticated')) {
      if (! this.get('_isFastBoot')) {
        this.set('session.attemptedTransition', transition);
      }
      let authenticationRoute = this.get('authenticationRoute');
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
      return this.get('session').invalidate();
    }
  }
});
