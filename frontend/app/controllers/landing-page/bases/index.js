import Ember from 'ember';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Ember.Controller.extend({
  queryParams: ["page", "perPage"],
  page: 1,
  perPage: 8,
  pagedContent: pagedArray('content', {
    page: Ember.computed.alias("parent.page"),
    perPage: Ember.computed.alias("parent.perPage")
  }),
  totalPages: Ember.computed.oneWay("pagedContent.totalPages")
});
