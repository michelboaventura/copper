import Ember from 'ember';

export default Ember.Component.extend({
  actions:{
    deleteCheckeds(){
      this.get('deleteCheckeds')();
    },
  },
});
