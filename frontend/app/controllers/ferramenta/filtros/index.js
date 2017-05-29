import Ember from 'ember';

export default Ember.Controller.extend({
  filterText: '',

  init() {
    this._super(...arguments);
    this.addObserver('filterText', this, 'filterDidChange');
  },

  filterDidChange(sender, key) {
    var filter = this.get('filterText').toString().toLowerCase();
    var jobsCompleted = this.get('model.jobsCompleted');
    var jobsRunning = this.get('model.jobsRunning');
    var filterFunc = function(item){
      return item.get('name').toString().toLowerCase().indexOf(filter) !== -1;
    }

    var filteredJobs = {
      jobsCompleted: jobsCompleted.filter(filterFunc),
      jobsRunning: jobsRunning.filter(filterFunc)
    }
    this.set('jobs', filteredJobs);
  },
});
