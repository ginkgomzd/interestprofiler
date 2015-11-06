import LFAdapter from 'ember-localforage-adapter/adapters/localforage';

export default LFAdapter.extend({
  namespace: 'H2CMain',
  persistData: function(type, data) {
    var modelNamespace = this.modelNamespace(type);
    this.setNamespace(modelNamespace);
    return this._super(type, data);
  },
  _namespaceForType: function (type) {
    var modelNamespace = this.modelNamespace(type);
    this.setNamespace(modelNamespace);
    return this._super(type);
  },
  setNamespace: function(type) {
    var namespace = (EmberENV.modelPaths.hasOwnProperty(type)) ? EmberENV.modelPaths[type].namespace : "H2C" + type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
    this.set("namespace", namespace);
  }
});
