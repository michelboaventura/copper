import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('datasources/table-item', 'Integration | Component | datasources/table item', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{datasources/table-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#datasources/table-item}}
      template block text
    {{/datasources/table-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
