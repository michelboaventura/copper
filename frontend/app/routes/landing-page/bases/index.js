import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.query('job', { public: true }).then((jobs) => {
      var datasources = {};
      var array = [];

      jobs.forEach(function(job){
        let db = job.get('datasource');
        if(!datasources[db.get('id')]){
          datasources[db.get('id')] = {datasource: db, jobsCount: 0}
        }
        datasources[db.get('id')].jobsCount = datasources[db.get('id')].jobsCount + 1;
      });

      for( var el in datasources){
        array.push(datasources[el]);
      }

      return array;
    });
  },
});
