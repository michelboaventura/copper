import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
  },

 // Attributes bingins
  _id:      function(){ return this.get('_id'); }.property('_id'),

  // Chart var
  _var: null,
  _data:null,
  _sort_state: {name: "asc", value: "desc"},

  actions: {
    sortTable(header_index) {
      let self = this;
      let type = null;

      switch(header_index) {
        case 0:
          type = "name";
          break;
        default:
          type = "value";
      }

      if(sort_state[type] == "asc") {
        sort_state[type] = "desc";
        self.set("_sort_state", sort_state);
      }
      else {
        sort_state[type] = "asc";
        self.set("_sort_state", sort_state);
      }
    },
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
          let count = function(data, attr) {
            data[attr].forEach(function(d) {
              d["sum"] = 0;
              d["total_num"] = 0;
            });

            // Calculates avg sentiment score for each paper and user
            data.links.forEach(function(link){
              var element = $.grep(data[attr], function(d) {
                return d.id === link[attr.slice(0, -1)];
              });

              element = element[0];

              element["sum"] += link["value"];
              element["total_num"] += 1;
            });

            data[attr].forEach(function(d) {
              d["avg"] = parseFloat(((d["sum"]/d["total_num"]) * 100).toFixed(2));
            });

            // First ordenation is by alphabetically order
            data[attr].sort(function(a, b) { return d3.ascending(a.name, b.name); });

            return data;
          };

          let draw = function(data, attr) {
            let colors = gViz.helpers.colors.linear([0, 1], ["red", "lightgray", "blue"]);

            let headers = JSON.parse(self.get("headers"));

            let table = d3.select(`#${self.get("_id")}`);
            let thead = table.append("thead").append("tr");
            let tbody = table.append("tbody");

            data = data[attr];

            thead.selectAll("td")
              .data(headers).enter()
              .append("td")
              .text((d) => { return d; });

            let rows = tbody.selectAll("tr")
              .data(data).enter()
              .append("tr");

            let cells = rows.selectAll("td")
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
                if(i != 2) { $(this).append(d); }
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
          };

          data = data[0];

          switch(type.toLowerCase()) {
            case "users":
              data = count(data, "rows");
              draw(data, "rows");
              break;
            case "papers":
              data = count(data, "columns");
              draw(data, "columns");
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
