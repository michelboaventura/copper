import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('public/card-vis', 'Integration | Component | public/card vis', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{public/card-vis}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#public/card-vis}}
      template block text
    {{/public/card-vis}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
