import { alias, oneWay } from '@ember/object/computed';
import Controller from '@ember/controller';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Controller.extend({
  queryParams: ["page", "perPage"],
  page: 1,
  perPage: 8,
  pagedContent: pagedArray('content', {
    page: alias("parent.page"),
    perPage: alias("parent.perPage")
  }),
  totalPages: oneWay("pagedContent.totalPages")
});
