import Component from '@ember/component';

export default Component.extend({
  tagName: 'tr',

  actions: {
    selectAll(){
      this.get('selectAll')(event.currentTarget.checked);
    }
  },
});
