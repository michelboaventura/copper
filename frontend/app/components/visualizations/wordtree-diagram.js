import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
  },

  // Attributes bingins
  dataUrl: function(){ return this.get('dataUrl'); }.property('dataUrl'),
  _id:      function(){ return this.get('_id'); }.property('_id'),

  cWidth: Ember.computed("width", function() {
    return `${this.$(".wordtree-diagram").parent().outerWidth() - 50}px`;
  }),
  cHeight: Ember.computed("height", function() {
    var offsetTop = this.$(".wordtree-diagram").length > 0 ? this.$(".wordtree-diagram").offset().top : 0;
    var footer = $(".footer").length > 0 ? $(".footer").outerHeight() : 0;
    var wHeight = $(window).outerHeight();
    return `${wHeight - offsetTop - footer - 10}px`;
  }),

  // Chart var
  _var: null,

  // Draw Chart
  draw: function(){

    // Initialize variables
    let component = this;
    let dataUrl = this.get('dataUrl');

    // Get data from API
    $.ajax({
      url: dataUrl,
      type: "GET",
      beforeSend() { gViz.helpers.loading.show(); },
      contentType: "application/json",
      success(data) {

        if(data.children.length > 0) {

          // Draw visualization
          component._var = gViz.vis.wordtree()
            ._var(component._var)
            .container(".gViz-wrapper[data-id='"+component.get('_id')+"']")
            .data(data)
            .build();
        }

        else { component.set("empty", true); }

      },

      // Hide loading div and render error
      error() { gViz.helpers.loading.hide(); console.log("Error"); },

      // Hide loading div and render complete
      complete() { gViz.helpers.loading.hide(); }
    });

  },

  didRender: function(){
    this.$(".wordtree-diagram").css("height", this.get('cHeight')).css("width", this.get('cWidth'));
  },

  didInsertElement: function(){
   this.draw();
  }

});
