import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
      console.log('HERE:select-clusters::route::model');
      return this.store.all('cluster')
        .filter(function(cluster){
          return !cluster.selected;
        });
    }
});
