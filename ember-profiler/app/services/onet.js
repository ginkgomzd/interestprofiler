import Ember from 'ember';
import X2JS from 'x2js';

var profilerDataUtils = Ember.Service.extend({
  store: Ember.inject.service('store'),
  baseUrl: EmberENV.onetUrl,

  interestProfilerQuestions: function() {alert(this.get("baseUrl"));},
  interestProfilerResults: function(answerString) {
    var that = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax(that.get("baseUrl") + '/ws/mnm/interestprofiler/results?answers=' + answerString).then(function(result) {
        if(typeof(result) === "object") {
          result = new XMLSerializer().serializeToString(result);
        }
        var x2js = new X2JS();
        var jsObj = x2js.xml_str2json(result);
        for(var i in jsObj.results.result) {
          jsObj.results.result[i].id = parseInt(i) + 1;
          jsObj.results.result[i].desc = jsObj.results.result[i].description;
          delete jsObj.results.result[i].description;
          jsObj.results.result[i].score = parseInt(jsObj.results.result[i].score);
        }
        resolve(jsObj.results.result);
      }, function(error) {
        reject(error);
      });
    });
  },
  interestProfilerJobZones: function() {},
  /**
   * Fetch Career match scores from the interest profiler API
   * See: https://services.onetcenter.org/reference/mnm#ip_careers
   *
   * @param answerString
   * @returns {Promise} - resolves to json obj
   */
  interestProfilerCareers: function(answerString) {
    var that = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      //https://services.onetcenter.org/ws/mnm/interestprofiler/careers
      Ember.$.ajax(that.get("baseUrl") + '/ws/mnm/interestprofiler/careers?start=1&end=1000&answers=' + answerString).then(function(result) {
        if(typeof(result) === "object") {
          result = new XMLSerializer().serializeToString(result);
        }
        var x2js = new X2JS();
        var jsObj = x2js.xml_str2json(result);
        resolve(jsObj.careers.career);
      }, function(error) {
        reject(error);
      });
    });
  },


  //Career functions
  allCareers: function() {},
  careerOverview: function(code) {},
  brightOutlookCareers: function() {},
  greenCareers: function() {},
  careersApprenticeships: function() {}
});

export default profilerDataUtils;