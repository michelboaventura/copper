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

  filters: {
    sentiments: ["negative", "positive", "neutral"],
    text: ""
  },

  // Chart var
  _var: [],

  didInsertElement() {
    let self = this;

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

  didRender() {
    // Avoids hook from being called twice
    if(this.get("first")) { this.toggleProperty("first"); }

    else {
      this.get("updateBindings")(this);
      this.get("draw")(this);
    }
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

  updateBindings(self) {
    $(".expand-article").unbind();

    // Expands article when arrow is clicked
    $(".expand-article").on("click", function() {
      let idx = $(this).attr("data-id");

      if($(this).hasClass("active")) {
        // Sets max height for div
        // Returns svg to the right position
        // Deactivates arrow
        $(`.article[data-id='${idx}']`).addClass("has-max-height");
        let height = $(`svg.chart-vis-sentiment-bars-${idx}`).height();
        d3.select(`svg.chart-vis-sentiment-bars-${idx}`).attr("transform", `translate(0, -${height})`);
        $(this).removeClass("active")
      }
      else {
        $(`.article[data-id='${idx}']`).removeClass("has-max-height");
        d3.select(`svg.chart-vis-sentiment-bars-${idx}`).attr("transform", `translate(0, 0)`);

        $(this).addClass("active")
      }
    });
  },

  resetFilters(self) {
    $("#search-articles").val("");
    $(".filter-emoticons").each(function() {
      if(!$(this).hasClass("active")) { $(this).addClass("active"); }
    });

    self.set("filtered-articles", self.get("articles"));
  },

  runFilters(self) {
    let articles = self.get("articles");
    let filters = self.get("filters");

    let filteredArticles = articles.filter(function(d) {
      let found = false;

      for(let count = 0; count < d["paragraphs"].length; count++) {
        let paragraph = d["paragraphs"][count];
        let regex = new RegExp(filters.text, "i");

        if(paragraph["text"].search(regex) !== -1) {
          found = true;
          break;
        }
      }

      return found;
    })
    .filter(function(d) { return filters.sentiments.indexOf(d["score"]) !== -1;  });

    d3.selectAll("svg").remove();
    self.get("updateBindings")(self);
    self.set("filtered-articles", filteredArticles);
  },

  actions: {
    filterText() {
      this.get("filters").text = $("#search-articles").val();
      this.get("runFilters")(this);
    },

    filterSentiment() {
      let self = this;
      let filters = this.get("filters");

      // Emoticons
      $(".filter-emoticon").on("click", function() {
        if($(this).hasClass("active")) { $(this).removeClass("active") }
        else { $(this).addClass("active") }

        let actives = $(".filter-emoticon")
          .filter(function() { return $(this).hasClass("active"); })
          .map(function() { return $(this).attr("data-value"); });

        actives = $.makeArray(actives);
        filters.sentiments = actives;
      });

      this.get("runFilters")(this);
    }
  }
});
