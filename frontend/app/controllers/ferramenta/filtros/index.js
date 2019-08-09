import Controller from '@ember/controller';

export default Controller.extend({
  filterText: '',

  init() {
    this._super(...arguments);
    this.addObserver('filterText', this, 'filterDidChange');
  },

  filterDidChange() {
    this.send('search');
  },
});
