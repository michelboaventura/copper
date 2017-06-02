import Ember from 'ember';

export default Ember.Controller.extend({
  filterText: '',

  init() {
    this._super(...arguments);
    this.addObserver('filterText', this, 'filterDidChange');
  },

  filterDidChange() {
    var filter = this.get('filterText').toString().toLowerCase();
    var datasources = this.get('model');
    var filterFunc = function(item){
      return item.get('name').toString().toLowerCase().indexOf(filter) !== -1;
    }

    var filteredDatasources = datasources.filter(filterFunc);

    this.set('datasources', filteredDatasources);
  },
});
