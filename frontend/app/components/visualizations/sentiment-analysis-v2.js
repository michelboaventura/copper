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
    $(".filter-emoticon").on("click", function() {
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
          // Sets max height for div
          $(`.article[data-id='${idx}']`).addClass("has-max-height");
          // Returns svg to the right position
          let height = $(`svg.chart-vis-sentiment-bars-${idx}`).height();
          d3.select(`svg.chart-vis-sentiment-bars-${idx}`).attr("transform", `translate(0, -${height})`);
          // Deactivates class
          $(this).removeClass("active")
        }
        else {
          $(`.article[data-id='${idx}']`).removeClass("has-max-height");

          let newHeight = $(`.article-content[data-id='${idx}']`).height();
          // $(`.gViz-wrapper-outer[data-id='wrapper-${idx}']`).height(newHeight);

          // Returns svg to the right position
          d3.select(`svg.chart-vis-sentiment-bars-${idx}`).attr("transform", `translate(0, 0)`);

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
    let margin = {top: 10, left: 10, right: 10, bottom: 10};
    let colours = d3.scaleOrdinal(["#f09f9f", "#e4bb3e", "#8fb3a9"]);

    self.get("filtered-articles").forEach((article, idx) => {
      gViz.vis.sentimentBars()
        ._class("sentiment-bars")
        .container(".gViz-wrapper-outer[data-id='wrapper-"+idx+"']")
        .margin(margin)
        .colors(colours)
        ._id(`vis-sentiment-bars-${idx}`)
        .data(article)
        .build();
    });
  },
});
