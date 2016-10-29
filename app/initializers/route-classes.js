import Ember from 'ember';

// https://dockyard.com/blog/ember/2013/03/27/body-class-tags-in-ember
export function initialize(/* container, application */) {
  Ember.Route.reopen({
    activate() {
      var cssClass = this.toCssClass();
      // you probably don't need the application class
      // to be added to the body
      if (cssClass !== 'application') {
        Ember.$('body').addClass(cssClass);
      }
    },
    deactivate() {
      Ember.$('body').removeClass(this.toCssClass());
    },
    toCssClass() {
      return this.routeName.replace(/\./g, '-').dasherize();
    }
  });
}

export default {
  name: 'route-classes',
  initialize
};
