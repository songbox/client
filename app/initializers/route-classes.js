import $ from 'jquery';
import Route from '@ember/routing/route';

// https://dockyard.com/blog/ember/2013/03/27/body-class-tags-in-ember
export function initialize(/*owner*/) {
  Route.reopen({
    activate() {
      var cssClass = this.toCssClass();
      // you probably don't need the application class
      // to be added to the body
      if (cssClass === 'application') {
        return;
      }

      if (typeof(FastBoot) === "undefined") {
        $('body').addClass(cssClass);
      }
    },
    deactivate() {
      if (typeof(FastBoot) === "undefined") {
        $('body').removeClass(this.toCssClass());
      }
    },
    toCssClass() {
      return this.routeName.replace(/\./g, '-').dasherize();
    }
  });
}

export default {
  name: 'route-classes-browser',
  initialize
};

