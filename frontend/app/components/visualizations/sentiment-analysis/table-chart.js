import Component from '@ember/component';

export default Component.extend({
  init() {
    this._super(...arguments);
  },
 // Attributes bingins
  _id:      function(){ return this.get('_id'); }.property('_id'),

  // Chart var
  _var: null,
  _data:null,

  // Conta as ocorrencias de cada participante/artigo nos comentarios,
  // e calcula a media do score de cada comentario
  parse(data, attr) {
    data[attr].forEach(function(d) {
      d["sum"] = 0;
      d["total_num"] = 0;
    });

    data.links.forEach(function(link){
      var element = $.grep(data[attr], function(d) {
        return d.id === link[attr.slice(0, -1)];
      });

      element = element[0];

      element["sum"] += link["value"];
      element["total_num"] += 1;
    });

    data[attr].forEach(function(d) {
      d["avg"] = parseFloat(((d["sum"]/d["total_num"]) * 100)).toFixed(2);
    });

    // First ordenation is by alphabetically order
    data[attr].sort(function(a, b) { return d3.ascending(a.name, b.name); });

    return data;
  },

  sortTable(rows, attr, type) {
    rows.sort(function(a, b) { return d3[type](a[attr], b[attr]); });
  },

  draw(self, data, attr) {
    let colors = gViz.helpers.colors.linear([0, 1], ["red", "lightgray", "blue"]);

    let headers = JSON.parse(self.get("headers"));

    let table = d3.select(`#${self.get("_id")}`);
    let thead = table.append("thead").append("tr");
    let tbody = table.append("tbody");

    // Armezena o estado do sort para cada item da tabela. Como os itens
    // 2 e 3 são os mesmos, esse vetor tem apenas tamanho 2
    // 0 = nome, 1 = media
    let sortState = ["descending", "ascending"];

    // Linha ou Coluna
    data = data[attr];

    // Adiciona Headers
    thead.selectAll("th")
      .data(headers).enter()
      .append("th")
      .attr("title", (d) => { return d; })
      .attr("data-index", (d, i) => { return i; })
      .text((d) => { return d; })
      .on("click", function(d, i) {
        let attr = i == 0 ? "name" : "avg";
        let idx = i == 0 ? 0 : 1;

        self.get("sortTable")(rows, attr, sortState[idx]);
        sortState[idx] = sortState[idx] == "ascending"? "descending" : "ascending";
      });

    // Adiciona Linhas
    let rows = tbody.selectAll("tr")
      .data(data).enter()
      .append("tr");

    // Adiciona Celulas
    rows.selectAll("td")
      .data((row) => { return [row["name"], row["avg"], row["avg"]]; })
      .enter()
      .append("td")
      .attr("width", (d,i) => {
        switch(i) {
          case 0:
            return "50%";
          case 1:
            return "10%";
          case 2:
            return "40%";
        }
      })
      .each(function(d, i) {
        // Append Texto
        if(i != 2) { $(this).append(d); }
        // Append barra de progresso
        else {
          let rgb = colors(d/100);
          let style = `
          width:${d}%;
          background-color:${rgb};
          height: 10px
          `
          let progress = `<div class="progress-bar"><div style='${style}'></div></div>`;
          $(this).append(progress);
        }
      });
  },

  // Draw Chart
  didInsertElement: function(){
    let self = this;
    let type = self.get("type");
    let dataUrl = self.get('dataUrl');

    // Get data from API
    $.ajax({
      url: dataUrl,
      type: "GET",
      beforeSend() { gViz.helpers.loading.show(); },
      contentType: "application/json",
      //data: JSON.stringify({}),
      success(data) {
        if (data.length > 0) {
          data = data[0];

          switch(type.toLowerCase()) {
            case "users":
              data = self.get("parse")(data, "rows");
              self.get("draw")(self, data, "rows");
              break;
            case "papers":
              data = self.get("parse")(data, "columns");
              self.get("draw")(self, data, "columns");
              break;

            default: console.log("Unkown Data Type");
          }
        }
        else { self.set("empty", true); }
      },

      // Hide loading div and render error
      error() {
        gViz.helpers.loading.hide();
        console.log("Error");
      },

      // Hide loading div and render complete
      complete() {
        gViz.helpers.loading.hide();
        // console.log("complete");
      }
    });
  }
});
