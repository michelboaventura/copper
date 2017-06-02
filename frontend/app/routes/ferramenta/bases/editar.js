import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
model(params){
  return RSVP.hash({
    datasource: this.store.findRecord('datasource', params.id),
  });
},
actions: {
  salvar(){
    var datasource = this.currentModel.datasource;
    datasource.save();
    console.log();
  }
}
});
