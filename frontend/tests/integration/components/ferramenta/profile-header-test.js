import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ferramenta/profile-header', 'Integration | Component | ferramenta/profile header', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ferramenta/profile-header}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ferramenta/profile-header}}
      template block text
    {{/ferramenta/profile-header}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
