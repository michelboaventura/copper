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

      let table = document.getElementById(self.get("_id"));
      let switching = true;
      let shouldSwitch = null;
      let i = null;

      let sort_state = self.get("_sort_state");

      while (switching) {
        //start by saying: no switching is done:
        let rows = table.getElementsByTagName("TR");
        switching = false;
        /*Loop through all table rows (except the
          first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
          //start by saying there should be no switching:
          shouldSwitch = false;
          /*Get the two elements you want to compare,
            one from current row and one from the next:*/
          let x = rows[i].getElementsByTagName("TD")[header_index];
          let y = rows[i + 1].getElementsByTagName("TD")[header_index];

          if(header_index == 0) { // sort by name
            if(sort_state["name"] == "asc") {
              if ($(x).attr("data-value").toLowerCase() > $(y).attr("data-value").toLowerCase()) {
                shouldSwitch= true;
                break;
              }
            }
            else {
              if ($(x).attr("data-value").toLowerCase() < $(y).attr("data-value").toLowerCase()) {
                shouldSwitch= true;
                break;
              }
            }
          }

          else { // sort by value
            if(sort_state["value"] == "asc") {
              if (parseFloat($(x).attr("data-value")) > parseFloat($(y).attr("data-value"))) {
                shouldSwitch= true;
                break;
              }
            }
            else {
              if (parseFloat($(x).attr("data-value")) < parseFloat($(y).attr("data-value"))) {
                shouldSwitch= true;
                break;
              }
            }
          }
        }

        if (shouldSwitch) {
          /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
        }
      }

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
    let dataUrl = self.get('dataUrl');

    let headers = JSON.parse(self.get("headers"));
    this.set("headers", headers);
    let type = self.get("type");

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

          // color scale
          let colors = { scale: gViz.helpers.colors.linear([0, 1], ["red", "lightgray", "blue"]) };

          let parse = function(attr) {

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

              d["avg"] = ((d["sum"]/d["total_num"]) * 100).toFixed(2);

              // Gets only numerical values of RGB colours
              var colours = colors.scale(d["avg"]/100);
              var coloursOnly = colours.substring(colours.indexOf('(') + 1, colours.lastIndexOf(')')).split(",");

              // Adds opacity to RGB colour
              var colourString = `rgba(${coloursOnly[0]},${coloursOnly[1]},${coloursOnly[2]}, 0.6)`;
              /*
              d["width"] = d["avg"];
              d["height"] = "10px";
              d["bg-colour"] = colourString;
              */

              // Sets width and colour of progress bar
              d["style"] = `
                width:${d["avg"]}%;
                background-color:${colourString};
                height: 10px
              `;
            });

            // First ordenation is by alphabetically order
            data[attr].sort(function(a, b) { return d3.ascending(a.name, b.name); });
          };

          switch(type.toLowerCase()) {
            case "users":
              parse("rows");
              self.set('_data', data.rows);
              break;
            case "papers":
              parse("columns");
              self.set('_data', data.columns);
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
