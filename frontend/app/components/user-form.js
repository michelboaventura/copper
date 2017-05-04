import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    save(){
      var component = this;
      component.get('currentUser').save()
        .then(function() { component.get('goToJobs')(); });
    },
  },
});
