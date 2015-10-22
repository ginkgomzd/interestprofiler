import BaseModel from './base-model';
import DS from 'ember-data';

export default BaseModel.extend({
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
