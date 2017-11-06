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

  first: true,

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
        // Assigns variables and draw chart
        self.set("title", response["title"]);
        self.set("description", response["description"]);
        self.set("participations-total", response["participations-total"]);
        self.set("participations-min", response["participations-minmax"][0]);
        self.set("participations-max", response["participations-minmax"][1]);
        self.set("articles-total", response["articles-total"]);
        self.set("articles", response["articles"]);

        // In the first pass there are no filtered articles
        self.set("filtered-articles", response["articles"]);
      },
      error() { gViz.helpers.loading.hide(); },
      complete() {  gViz.helpers.loading.hide(); }
    });
  },

  filters() {

  },

  didRender() {
    // Avoids hook being called twice
    if(this.get("first")) { this.toggleProperty("first"); }

    else {
      // Expands article when arrow is clicked
      $(".expand-article").on("click", function() {
        let idx = $(this).attr("data-id");

        if($(this).hasClass("active")) {
          $(`.article[data-id='${idx}']`).addClass("has-max-height");
          $(this).removeClass("active")
        }
        else {
          $(`.article[data-id='${idx}']`).removeClass("has-max-height");

          let newHeight = $(`.article-content[data-id='${idx}']`).height();
          // $(`.gViz-wrapper-outer[data-id='wrapper-${idx}']`).height(newHeight);

          $(this).addClass("active")
        }
      });

      this.get("draw")(this);
    }
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

  draw(self) {
    let margin = {top: 100, left: 150, right: 20, bottom: 10};

    self.get("filtered-articles").forEach((article, idx) => {
      gViz.vis.sentimentBars()
        ._class("sentiment-bars")
        .container(".gViz-wrapper-outer[data-id='wrapper-"+idx+"']")
        .margin(margin)
        .data(article)
        .build();
    });
  },
});
