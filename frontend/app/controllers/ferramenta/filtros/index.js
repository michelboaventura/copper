import Ember from 'ember';

export default Ember.Controller.extend({
  filterText: '',

  init() {
    this._super(...arguments);
    this.addObserver('filterText', this, 'filterDidChange');
  },

  filterDidChange() {
    this.send('search');
  },
});
