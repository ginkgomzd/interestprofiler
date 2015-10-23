import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  desc: DS.attr('string'),
  img: DS.attr('string'),

  getImgPath: function() {
    if(this.get("img").search("http:") !== -1) {
      return this.get('img');
    } else {
      return 'img/alumni/' + this.get('img');
    }
  }.property('img')
});
