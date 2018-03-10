import Route from '@ember/routing/route';

export default Route.extend({
 actions: {
    error(error/*, transition*/) {
      let isNotFoundError = error.errors.mapBy('status').includes("404");
      if (isNotFoundError) {
        this.transitionTo('songs');
      } else {
        // Let the route above this handle the error.
        return true;
      }
    }
  }
});
