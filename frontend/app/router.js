import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('landing-page', function() {
    this.route('contato');
    this.route('cadastro');
    this.route('sobre');
    this.route('login');
    this.route('filtros', function() {
      this.route('aberto',{path: ':id/aberto'});
      this.route('resultado', {path: ':id/resultado/:which'}, function() {});
    });
    this.route('bases', function() {
      this.route('aberta',{path: ':id/aberta'});
    });
  });

  this.route('ferramenta', function() {
    this.route('perfil', function() {
      this.route('senha');
    });
    this.route('bases', function() {
      this.route('adicionar');
      this.route('editar', {path: ':id/editar'});
    });
    this.route('filtros', function() {
      this.route('adicionar');
      this.route('resultado', {path: ':id/resultado/:which'});
      this.route('aberto', {path: ':id/aberto'});
    });
    this.route('sobre');
  });
});

export default Router;
