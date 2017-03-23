// Initialize the visualization class
gViz.vis.graph.search = function () {
  "use strict";

  // Get attributes values

  var _var = undefined;
  var animation = 900;

  // Validate attributes
  var validate = function validate(step) {

    switch (step) {
      case 'run':
        return true;
      default:
        return false;
    }
  };

  // Main function
  var main = function main(step) {

    // Validate attributes if necessary
    if (validate(step)) {

      switch (step) {

        // Build entire visualizations
        case 'run':

          // Update selection searched for searched nodes
          var updateNodes = function(search) {

            // Cleaen selection
            _var.selection.searched = {};

            // Filter nodes
            if(search.length > 1) {
              _var.data.nodes.filter(function(d) { return d.name.latinize().toLowerCase().indexOf(search) !== -1; }).forEach(function(node) {

                // Set node
                _var.selection.searched[node.id] = node;

                // Set neighbours
                Object.keys(node.neighbours).forEach(function (nbours) { _var.selection.neighbours[nbours] = node.neighbours[nbours]; });

              });
            }

            // Set globalAlpha
            if(Object.keys(_var.selection.searched).length !== 0) { _var.selection.globalAlpha = .1; }
          }

          _var.search.d3.on('keyup', function() {
            var event = d3.event || window.event;
            if (event.keyCode === 13) {
              _var.search.value = _var.search.jq.val().latinize().toLowerCase();
              updateNodes(_var.search.value);
              _var.ticked();
            }
          });


          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var', 'animation'].forEach(function (key) {

    // Attach variables to validation function
    validate[key] = function (_) {
      if (!arguments.length) {
        eval('return ' + key);
      }
      eval(key + ' = _');
      return validate;
    };

    // Attach variables to main function
    return main[key] = function (_) {
      if (!arguments.length) {
        eval('return ' + key);
      }
      eval(key + ' = _');
      return main;
    };
  });

  // Executa a funcao chamando o parametro de step
  main.run = function (_) {
    return main('run');
  };

  return main;
};
