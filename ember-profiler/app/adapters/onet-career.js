import LFAdapter from 'ember-localforage-adapter/adapters/localforage';

export default LFAdapter.extend({
  namespace: EmberENV.modelPaths['onet-career'].emberDataNamespace
});