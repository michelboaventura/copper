import Component from '@ember/component';

export default Component.extend({
  init() {
    this._super(...arguments);
  },

  didInsertElement: function() {
    $("[data-toggle=tooltip]").tooltip().click(function() {
      $("[data-toggle=tooltip]").tooltip("close"); // closes tooltip on click
    });
  },
});
