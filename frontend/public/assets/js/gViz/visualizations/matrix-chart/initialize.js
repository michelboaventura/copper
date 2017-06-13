'use strict';

// Initialize the visualization class
gViz.vis.matrix_chart.initialize = function () {
  "use strict";

  // Get attributes values

  var _id = 'vis-matrix-' + (Math.floor(Math.random() * (1000000000 - 5 + 1)) + 5);
  var _class = undefined;
  var _var = undefined;
  var container = undefined;
  var animation = 900;
  var data = [];
  var colors = { scale: gViz.helpers.colors.main  };
  var height = 100;
  var margin = { top: 50, right: 50, bottom: 50, left: 50 };
  var width = 100;
  var legend_width = 170;

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

          // Initialize variables
          if (!_var) {
            _var = {};
          }
          _var._id = _id;
          _var._class = _class;
          _var.animation = animation;

          _var.container = { selector: container, jq: $(container), d3: d3.select(container), el: d3.select(container).node() };

          // Get data
          _var._data = data;

          _var.colors = colors;

          _var.margin = margin;

          _var.max_cell_size = 15;

          _var.legend_width = legend_width;

          _var.matrix_height = _var.max_cell_size * _var._data.rows.length;
          _var.matrix_width = _var.max_cell_size * _var._data.columns.length;

          // Define height and width
          _var.height = height != null ? height : _var.container.jq.outerHeight();
          _var.width = width != null ? width : _var.container.jq.outerWidth() - 15;

          _var.min_width = _var.margin.left + _var.matrix_width + _var.legend_width + _var.margin.right + 40;
          _var.min_height = _var.margin.top + _var.matrix_height + _var.margin.bottom;

          _var.width = _var.min_width > _var.width ? _var.min_width : _var.width;
          _var.height = _var.min_height > _var.height ? _var.min_height : _var.height;

          // Set attribute _id to container
          _var.container.jq.attr('data-vis-id', _var._id);

          break;
      }
    }

    return _var;
  };

  // Expose global variables
  ['_id', '_class', '_var', 'animation', 'colors', 'container', 'data', 'height', 'margin', 'width', 'legend_width'].forEach(function (key) {

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

  // Execute the specific called function
  main.run = function (_) {
    return main('run');
  };

  return main;
};
