import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

var App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

/** This is to allow custom data attributes on links
 * It is being used to pass enoughinformation to the
 * primary nav links that they auto-close the menu
 * when they are clicked.
 */
Ember.LinkView.reopen({
    attributeBindings: ['data-toggle', 'data-target']
});

loadInitializers(App, config.modulePrefix);

export default App;
