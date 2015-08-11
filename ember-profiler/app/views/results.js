import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'div',
  templateName: 'results',
  classNames: ["full"],
  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, function(){
      this.get("controller").send("updateWidths");
    });

    // wire up show/hide
    Ember.$('dd, dt').on("tap", function () {
      var clickedArea = Ember.$(this).attr('class');
      var selector = 'dd.' + clickedArea + ' .desc';
      Ember.$(selector).slideToggle();
    });
  }
});
