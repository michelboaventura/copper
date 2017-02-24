import Ember from 'ember';

export default Ember.Component.extend({

  visualizations: [
    {
      name:   "Search Tool",
      icon:   "fa-search",
      image:  "icon-search",
      vis:    "search-tool",
      tooltip: "Exploratory Tool which can be used to search the filtered comments.",
    },
    {
      name:   "Word Tree",
      icon:   "icon-flow-tree",
      image:  "icon-flow-split",
      vis:    "wordtree-diagram",
      tooltip: "Wordtree Analysis visualization of all of the filtered comments.",
    },
    {
      name:   "Co-ocurrence",
      icon:   "icon-flow-tree",
      image:  "icon-comment-1",
      vis:    "graph-canvas",
      tooltip: "Co-ocurrence visualization of words within filtered comments.",
    },
    {
      name:   "Co-ocurrence - Full Data",
      icon:   "icon-flow-tree",
      image:  "icon-chat-2",
      vis:    "graph-canvas-full",
      tooltip: "Co-ocurrence visualization of words within filtered comments.",
    },
    {
      name:   "Participants - Itens",
      icon:   "icon-flow-tree",
      image:  "icon-users",
      vis:    "part-item",
      tooltip: "Graph showing relationship between participants and commentables.",
    },
    {
      name:   "Sentiment Analysis",
      icon:   "fa-list",
      image:  "icon-emo-thumbsup",
      vis:    "sentiment-analysis",
      tooltip: "Sentiment Analysis metrics of comments in law articles.",
    },
    {
      name:   "Correlation Matrix",
      icon:   "fa-list",
      image:  "icon-th-outline",
      vis:    "correlation-matrix",
      tooltip: "Correlation Metrics comments Authors x Law Articles.",
    },
    {
      name:   "Topicos",
      icon:   "fa-bar-chart",
      image:  "icon-newspaper",
      vis:     "topicos-vis",
      tooltip: "This visualization shows a table between topics and axis.",
    },
  ],
});
