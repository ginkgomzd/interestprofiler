import Ember from 'ember';
import ajax from 'ic-ajax';
import X2JS from 'x2js';

export default Ember.Route.extend({
    model: function() {
      //var router = this;
      var store = this.store;

      //todo: we should create an initilizer that creates a settings controller
      //It will register itself on all views, controllers and routes.
      //That controller should loop through all the settings in the database and
      //make them properties
      //it should also have a getter and setter for getting and setting
      //settings, that will then be observed and stored in the database.

      var AnswerKeys = this.get("CalculatedAnswers");
      var scores = store.all('profileScore');

      if (scores.get("length") === 0
        || !AnswerKeys
        || answerList(store) != AnswerKeys) {
        store.unloadAll('profileScore');
        return getProfileScore(this).then(function (data) {
          data.forEach(function (item, index, en) {
            if (Ember.$.isNumeric(item.id)) {
              store.find('profileScore', item.id).then(function (r) {
                if (r.get("length") === 0) {
                  r = store.createRecord('profileScore', item);
                } else {
                  r.set("area", item.area);
                  r.set("score", item.score);
                  r.set("desc", item.desc);
                }
                r.save();
              });

            }
          });
          return store.find("profileScore");
        });
      }
      return scores;
    }
});

function answerList(store) {
  var answerKey = "";
  store.all('answer').forEach(function(item, index, e) {
    answerKey += item.get('selection');
  });
  return String(answerKey + "333333333333333333333333333333333333333333333333333333333333").slice(0, 60);
}

function getProfileScore(router) {
  var store = router.store;
  /*
  var AnswerKeys = store.find("setting", {name: "CalculatedAnswers"});
  if (AnswerKeys.get("length") === 0) {
    AnswerKeys = store.createRecord("setting", {name: "CalculatedAnswers", value: ''});
  }
  AnswerKeys.set("value", answerList(store));
  AnswerKeys.save();
  */

  var AnswerKeys = answerList(store);
  router.set("CalculatedAnswers", AnswerKeys);

  return new Promise(function(resolve, reject) {

    var baseurl = 'http://beaker.ginkgostreet.com/api_proxy';
    ajax(baseurl + '/ws/mnm/interestprofiler/results?answers=' + AnswerKeys).then(function(result) {
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

    /*
    resolve([
      {
        "id": 1,
        "area": "Realistic",
        "score": Math.floor((Math.random() * 39) + 1),
        "desc": "People with Realistic interests like work that includes practical, hands-on problems and answers. Often people with Realistic interests do not like careers that involve paperwork or working closely with others. They like working with plants and animals; real-world materials like wood, tools, and machinery; and outside work."
      },
      {
        "id": 2,
        "area": "Investigative",
        "score": Math.floor((Math.random() * 39) + 1),
        "desc": "People with Investigative interests like work that has to do with ideas and thinking rather than physical activity or leading people. They like searching for facts and figuring out problems."
      },
      {
        "id": 3,
        "area": "Artistic",
        "score": Math.floor((Math.random() * 39) + 1),
        "desc": "People with Artistic interests like work that deals with the artistic side of things, such as acting, music, art, and design. They like creativity in their work and work that can be done without following a set of rules."
      },
      {
        "id": 4,
        "area": "Social",
        "score": Math.floor((Math.random() * 39) + 1),
        "desc": "People with Social interests like working with others to help them learn and grow. They like working with people more than working with objects, machines, or information. They like teaching, giving advice, and helping and being of service to people."
      },
      {
        "id": 5,
        "area": "Enterprising",
        "score": Math.floor((Math.random() * 39) + 1),
        "desc": "People with Enterprising interests like work that has to do with starting up and carrying out business projects. These people like taking action rather than thinking about things. They like persuading and leading people, making decisions, and taking risks for profits."
      },
      {
        "id": 6,
        "area": "Conventional",
        "score": Math.floor((Math.random() * 39) + 1),
        "desc": "People with Conventional interests like work that follows set procedures and routines. They prefer working with information and paying attention to details rather than working with ideas. They like working with clear rules and following a strong leader."
      }
    ]);
    */
  });
}
