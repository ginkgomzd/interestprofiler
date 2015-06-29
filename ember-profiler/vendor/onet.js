
define("onet",["ember", "ic-ajax", "x2js"], function(__dependency1__, __dependency2__, X2JS) {
  var Ember = __dependency1__["default"] || __dependency1__;
  var ajax = __dependency2__["default"] || __dependency2__;

  var onetBaseUrl = 'http://beaker.ginkgostreet.com/api_proxy';
  if (EmberENV.onetUrl) {
    onetBaseUrl = EmberENV.onetUrl;
  }

  return {
    baseUrl: onetBaseUrl,
    interestProfiler: {
      questions: function() {alert(onetBaseUrl);},
      results: function(answerString) {
        return new Promise(function(resolve, reject) {
          ajax(onetBaseUrl + '/ws/mnm/interestprofiler/results?answers=' + answerString).then(function(result) {
            var x2js = new X2JS();
            var jsObj = x2js.xml_str2json(result);
            for(var i in jsObj.results.result) {
              jsObj.results.result[i].id = parseInt(i) + 1;
              jsObj.results.result[i].desc = jsObj.results.result[i].description;
              delete jsObj.results.result[i].description;
              jsObj.results.result[i].score = parseInt(jsObj.results.result[i].score);
            }
            resolve(jsObj.results.result);
          });
        });
      },
      jobZones: function() {},
      careers: function() {}
    },
    careers: {
      all: function() {},
      overview: function(code) {},
      brightOutlook: function() {},
      green: function() {},
      apprenticeship: function() {}
    }
  };
});