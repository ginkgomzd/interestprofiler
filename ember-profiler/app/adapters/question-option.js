import appAdapter from './application';

export default appAdapter.extend({
  namespace: EmberENV.modelPaths['question-option'].emberDataNamespace
});