import Ember from 'ember';

export default Ember.Controller.extend(Ember.SortableMixin, {
  sortProperties: ['score'],
  sortAscending: false
});