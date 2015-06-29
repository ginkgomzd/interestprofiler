import onet from "onet";

export default function updateUtil() {
  return {
    //This function is for calling update in the middle of a
    //route load when we can't find the proper id
    findOnetModel: function(store, modelName, params) {
      /*
      var functionName = "update" + modelName.charAt(0).toUpperCase() + modelName.slice(1);
      if (typeof this[functionName] === 'function') {
        store.findAll(modelName).then(function(data) {
          console.log(data.get("length"));
          if(data.get("length") === 0) {
            this[functionName](store);
          }
        });
      }
      */
    },
    updateQuestions: function(store) {

      return new Promise(function (resolve, reject) {
        Ember.RSVP.hash({questions: store.find("question"), answers: store.find("questionOption")}).then(function(results) {
          onet.interestProfiler.questions().then(function (data) {
            //update the answers
            data.questionOptions.forEach(function (item) {
              var r = store.getById('questionOption', item.id);
              if (r === null) {
                r = store.createRecord('questionOption', item);
              }
              r.set("value", item.value);
              r.set("label", item.text);
              r.save();
            });

            //update the questions
            data.questions.forEach(function (item) {
              var r = store.getById('question', item.id);
              if (r === null) {
                r = store.createRecord('question', item);
              }
              r.set("area", item.area);
              r.set("text", item.text);
              r.save();
            });
            resolve(store.find("question"));
          });
        });
      });
    },
    updateCluster: function(store) {},
    updatePathway: function(store) {},
    updateOccupation: function(store) {},
    updateAlumni: function(store) {},
    updateUserPrefs: function(store) {}
  };
}
