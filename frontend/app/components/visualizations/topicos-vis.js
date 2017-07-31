import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ["topicos-vis"],
  sessionAccount: Ember.inject.service(),

  // Attributes bingins
  json: Ember.A(),
  tableData: Ember.A(),
  header: ["Tópicos","Eixos","# Comentários","Termos Mais Descritivos"],
  colorsEixos:  d3.scaleOrdinal(d3.schemeCategory20),

  // Chart var
  _var: null,

  // Draw Chart
  drawTable: function(){

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

        if(data.length > 0 && data.filter(function(d) { return d.contagem_comentarios; }).length > 0) {
          // Set json
          component.set('json', data);

          // Initialize variables
          let topicos = [];
          let legends = {};

          // Parse data
          data.filter(function(d) { return d.contagem_comentarios; }).forEach( d => {
            // Set scales
            let scaleTopPalavras = d3.scaleLinear().domain(d3.extent(d.top_palavras, t => t[1])).range([12,25]);
            let scaleFrequenciaEixos = d3.scaleLinear().domain(d3.extent(d.frequencia_eixos, t => t[1])).range([12,30]);

            // Store legends
            d.frequencia_eixos.forEach( e => legends[e[0]] = component.get('colorsEixos')(e[0]) );

            // Add topics
            topicos.push({
              element: d,
              eixos: d.frequencia_eixos.map(function(f) {
                return {
                  id: f[0],
                  height: scaleFrequenciaEixos(f[1]),
                  mTop: 35 - scaleFrequenciaEixos(f[1]),
                  bg_color: component.get('colorsEixos')(f[0]),
                  url: component.get('generateUrl')(`Eixo ${f[0]}`),
                };
              }).sort(function(a,b) { return d3.descending(a.height, b.height); }),
              top_palavras: d.top_palavras.map(function(p) {
                return {
                  id: d.topico_id,
                  name: p[0],
                  value: scaleTopPalavras(p[1]),
                  url: component.get('generateUrl')(p[0]),
                };
              }).sort(function(a,b) { return d3.descending(a.value, b.value); }),
            });
          });

          // Set data
          component.set('tableData', topicos);
          component.set('legends', legends);
        }

        else{ component.set("empty", true); }
      },

      // Hide loading div and render error
      error() { gViz.helpers.loading.hide(); console.log("Error"); },

      // Hide loading div and render complete
      complete() { gViz.helpers.loading.hide(); }
    });
  },

  didInsertElement: function(){
    let logged = this.get('sessionAccount.session.isAuthenticated');
    let jobId = this.get('jobId');

    this.set('generateUrl', function(query) {
      let where = logged ? 'ferramenta' : 'landing-page';
      return `/${where}/filtros/${jobId}/resultado/search-tool?search=${query}`;
    });

    this.drawTable();
  }
});
