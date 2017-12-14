import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store
      .query('job', { public: true }).then((results) => {
        return results.sortBy('created_at').reverse();
      });
  }
});
