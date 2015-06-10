import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
      // stuff dummy data into the store
      this.store.pushMany('profileScore', getProfileScore());

      return this.store.all('profileScore');
    }
});

function getProfileScore() {
  return [
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
  ];
}
