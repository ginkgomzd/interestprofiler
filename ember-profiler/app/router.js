import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('question', {path: '/question/:index'});
  this.route('results');
  this.route('alumni', {path: '/alumni/:index'});
  this.route('saved-alumni', {path: '/saved-alumni'});
  this.route('saved-alumni-detail', {path: '/saved-alumni/:index'});
  this.route('select-clusters');
  this.route('select-pathways');
  this.route('pathway', {path: '/pathway/:index'});
  this.route('cluster', {path: '/cluster/:index'});
  this.route('occupation', {path: '/occupation/:index'});
  this.route('resources');
  this.route('login');
  this.route('welcome');
  this.route('settings');
  this.route('proximity');
  this.route('college', {path: '/college/:index'});
  this.route('about');
});

export default Router;
