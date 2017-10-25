import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
  },

  // Attributes bingins
  width:  function(){ return this.get('width'); }.property('width'),
  height: function(){ return this.get('height'); }.property('height'),
  _id:    function(){ return this.get('_id'); }.property('_id'),
  style:  function(){ return "width:"+this.get('width')+"; height:"+this.get('height')+";"; }.property('style'),

  // Chart var
  _var: null,

  didInsertElement: function(){
    let self = this;
    let title = "Reforma do Ensino Médio";
    let description = "Medida Provisória n 746 de 2016."
    let articles = "197";
    let participations = "21.763";
    let min_participations = "150";

    self.set("title", title);
    self.set("description", description);
    self.set("articles", articles);
    self.set("participations", participations);
    self.set("min_participations", min_participations);

  }
});
