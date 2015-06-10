import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  desc: DS.attr('string'),
  img: DS.attr('string'),

  getImgPath: function() {
    return 'img/alumni/' + this.get('img');
  }.property('img')
});
