import BaseModel from './base-model'

export default BaseModel.extend({
  title: DS.attr('string'),
  desc: DS.attr('string'),
  img: DS.attr('string'),

  getImgPath: function() {
    return 'img/alumni/' + this.get('img');
  }.property('img')
});
