import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('question', {path: '/question/:index'});
  this.route('results');
  this.route('alumni', {path: '/alumni/:alumni_id'});
  this.route('select-clusters');
});

export default Router;
