import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  session: service(),
  sessionAccount: service(),

  model() {
    return this.get('store').findRecord('user', this.get('sessionAccount.id'))
  },

  actions: {
    save(){
      this.get('currentModel').save().then(()=>{
        this.transitionTo('ferramenta.filtros');
      }).catch((reason)=>{
        console.log(reason);
      });
    }
  }
});
