import appAdapter from './application';
import Ember from 'ember';

export default appAdapter.extend({
  namespace: EmberENV.modelPaths.program.emberDataNamespace,
  //Cachine program data adds 2500ms of overhead per request
  caching: 'none'
});
