import Ember from 'ember';
import onet from 'onet';

export default Ember.Route.extend({
  model: function () {
    return this.get('store').find('cluster', {is_selected: true});
  }
});
