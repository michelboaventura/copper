import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ferramenta/options-navbar', 'Integration | Component | ferramenta/options navbar', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ferramenta/options-navbar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ferramenta/options-navbar}}
      template block text
    {{/ferramenta/options-navbar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
