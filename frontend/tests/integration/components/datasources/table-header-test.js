import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('datasources/table-header', 'Integration | Component | datasources/table header', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{datasources/table-header}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#datasources/table-header}}
      template block text
    {{/datasources/table-header}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
