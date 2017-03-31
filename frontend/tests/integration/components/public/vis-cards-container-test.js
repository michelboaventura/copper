import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('public/vis-cards-container', 'Integration | Component | public/vis cards container', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{public/vis-cards-container}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#public/vis-cards-container}}
      template block text
    {{/public/vis-cards-container}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
