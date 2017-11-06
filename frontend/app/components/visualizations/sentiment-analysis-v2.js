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

  didInsertElement() {
    let self = this;

    // Activate icon when clicked
    $(".emoticon").on("click", function() {
      if($(this).hasClass("active")) { $(this).removeClass("active") }
      else { $(this).addClass("active") }
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

    self.get("draw")();
  },

  didRender() {
    // Expands article when arrow is clicked
    $(".expand-article").on("click", function() {
      let idx = $(this).attr("data-id");

      if($(this).hasClass("active")) {
        $(`.article-text[data-id='${idx}']`).addClass("has-max-height");
        $(this).removeClass("active")
      }
      else {
        $(`.article-text[data-id='${idx}']`).removeClass("has-max-height");
        $(this).addClass("active")
      }
    });

    /*
       let self = this;
       let i = 0;

       let articles_texts = document.getElementsByClassName("article-text");

       for(i = 0; i < articles_texts.length; i++) {
       let article = articles_texts[i];
       $clamp(article, { clamp: 'auto' });
       }
       */
  },

  draw() {
    let self = this;
    let margin = {top: 100, left: 150, right: 20, bottom: 10};

    self._var = gViz.sentiment_bars()
      ._class("sentiment-bars")
      .container(".gViz-wrapper[data-id='"+component.get('_id')+"']")
      .margin(margin)
      .data(self.get("articles"))
      .build();
  },
});
