import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    return this.store.findRecord('job', params.id);
  },
  setupController(controller, model) {
    var resultsTypes = [
      { id: 'search-tool', text: 'Search Tool', image: 'search' },
      { id: 'wordtree-diagram', text: 'Word Tree', image: 'tree' },
      { id: 'graph-canvas', text: 'Co-occurence', image: 'occurence' },
      { id: 'graph-canvas-full', text: 'Co-occurence Full Data', image: 'occurence' },
      { id: 'part-item', text: 'Participants - Itens', image: 'participants' },
      { id: 'sentiment-analysis', text: 'Sentiment Analysis', image: 'sentiment'},
      { id: 'correlation-matrix', text: 'Correlation Matrix', image: 'correlation'},
      { id: 'topicos-vis', text: 'Tópicos', image: 'topics' },
    ];

    controller.set('resultsTypes', resultsTypes);
    this._super(controller, model);
  },
});
