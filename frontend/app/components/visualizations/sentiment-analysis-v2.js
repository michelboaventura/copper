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

    // Activate icon when clicked
    $(".emoticon").on("click", function() {
      if($(this).hasClass("active")) { $(this).removeClass("active") }
      else { $(this).addClass("active") }
    });

    $(".expand-article").on("click", function() {
      if($(this).hasClass("active")) {
        $(".article-text").addClass("has-max-height");
        $(this).removeClass("active")
      }
      else {
        $(".article-text").removeClass("has-max-height");
        $(this).addClass("active")
      }
    });

    $.ajax({
      url: "/assets/data/sentiment-analysis-v2.json",
      type: "GET",
      beforeSend() { gViz.helpers.loading.show(); },
      success(response) {
        self.set("title", response["title"]);
        self.set("description", response["description"]);
        self.set("participations-total", response["participations-total"]);
        self.set("participations-min", response["participations-minmax"][0]);
        self.set("participations-max", response["participations-minmax"][1]);
        self.set("articles-total", response["articles-total"]);
        self.set("articles", response["articles"]);
      },
      error() { gViz.helpers.loading.hide(); },
      complete() {  gViz.helpers.loading.hide(); }
    });
  },

  /*
  didRender() {
    let self = this;
    let i = 0;

    let articles_texts = document.getElementsByClassName("article-text");

    for(i = 0; i < articles_texts.length; i++) {
      let article = articles_texts[i];
      $clamp(article, { clamp: 'auto' });
    }
  }
  */
});
