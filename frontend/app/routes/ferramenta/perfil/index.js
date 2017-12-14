import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
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
