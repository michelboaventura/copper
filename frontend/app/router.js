import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('workflow', function() {
    this.route('new');
    this.route('edit', {path: ':id/edit'});
    this.route('tasks');
    this.route('draw', {path: ':id/draw'});
    this.route('params', {path: ':id/params'});
  });
  this.route('datasource', function() {
    this.route('new');
    this.route('edit', {path: ':id/edit'});
  });
  this.route('job', function() {
    this.route('show', {path: ':id/show'});
    this.route('result', {path: ':id/result'});
    this.route('visualization', {path: ':id/visualization/:which'});
    this.route('new');
  });
  this.route('policy');
  this.route('password', {path:'users/password'}, function() {
    this.route('request');
    this.route('edit');
  });
  this.route('home', function() {
    this.route('workflows');
    this.route('datasources');
    this.route('configurations');
    this.route('jobs');
    this.route('visualizations');
  });
  this.route('landing-page', function() {
    this.route('index');
    this.route('contato');
    this.route('cadastro');
    this.route('sobre');
    this.route('login');
    this.route('filtros');
  });
  this.route('user', {path: 'user/:id'});
  this.route('group', {path: 'group/:id'});
  this.route('visualizations', function() {
    this.route('correlation-matrix');
    this.route('graph-canvas');
    this.route('bar-chart');
    this.route('wordtree-diagram');
    this.route('topicos-vis');
    this.route('line-chart');
    this.route('pie-chart');
    this.route('search-tool');
    this.route('sentiment-analysis');
  });
  this.route('results');

  this.route('public', function() {
    this.route('result', {path: ':id/result'});
    this.route('visualization', {path: ':id/visualization/:which'});
    this.route('visualizations', function() {
      this.route('correlation-matrix');
      this.route('graph-canvas');
      this.route('bar-chart');
      this.route('wordtree-diagram');
      this.route('topicos-vis');
      this.route('line-chart');
      this.route('pie-chart');
      this.route('search-tool');
      this.route('sentiment-analysis');
    });
  });
  this.route('datasources');
  this.route('databases');
  this.route('consults');

  this.route('ferramenta', function() {
    this.route('index');
    this.route('perfil');
    this.route('bases');

    this.route('filtros', function() {
      this.route('adicionar');
    });
    this.route('sobre');
  });
});

export default Router;
