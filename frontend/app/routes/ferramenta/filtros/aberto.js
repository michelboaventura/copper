import Route from '@ember/routing/route';

export default Route.extend({
  model(params){
    return this.store.findRecord('job', params.id);
  },
  setupController(controller, model) {
    var resultsTypes = [
      { id: 'search-tool', text: 'Busca de Comentários', image: 'search' },
      { id: 'text-search-tool', text: 'Busca de Texto', image: 'search' },
      { id: 'wordtree-diagram', text: 'Árvore de Palavras', image: 'tree' },
      { id: 'graph-canvas', text: 'Grafo de Co-ocorrência', image: 'occurence' },
      { id: 'graph-canvas-full', text: 'Grafo de Co-ocorrência Completo', image: 'occurence' },
      { id: 'part-item', text: 'Grafo de Participantes / Itens', image: 'participants' },
      { id: 'sentiment-analysis', text: 'Análise de Sentimentos', image: 'sentiment'},
      { id: 'correlation-matrix', text: 'Matriz de Correlação', image: 'correlation'},
      { id: 'topicos-vis', text: 'Visualização de Tópicos', image: 'topics' },
    ];

    controller.set('resultsTypes', resultsTypes);
    this._super(controller, model);
  },
});
