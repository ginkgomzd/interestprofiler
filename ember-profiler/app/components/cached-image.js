import Ember from 'ember';

export default Ember.Component.extend({
  imageService: Ember.inject.service('image'),
  tagName: 'img',
  classNames: ["cached-image"],
  classNameBindings: ["class", "loading:loading"],
  attributeBindings: ["src"],
  loading: true,
  useFadeIn: true,
  //This is the DataURL of an animated SVG.
  //Generated via http://loading.io/
  loadingSpinner: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHdpZHRoPScxOThweCcgaGVpZ2h0PScxOThweCcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiIGNsYXNzPSJ1aWwtc3F1YXJlcyI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9Im5vbmUiIGNsYXNzPSJiayI+PC9yZWN0PjxyZWN0IHg9IjE1IiB5PSIxNSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjMTUzNjcyIiBjbGFzcz0ic3EiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImZpbGwiIGZyb209IiMxNTM2NzIiIHRvPSIjMDA3YWZmIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYmVnaW49IjAuMHMiIHZhbHVlcz0iIzAwN2FmZjsjMDA3YWZmOyMxNTM2NzI7IzE1MzY3MiIga2V5VGltZXM9IjA7MC4xOzAuMjsxIj48L2FuaW1hdGU+PC9yZWN0PjxyZWN0IHg9IjQwIiB5PSIxNSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjMTUzNjcyIiBjbGFzcz0ic3EiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImZpbGwiIGZyb209IiMxNTM2NzIiIHRvPSIjMDA3YWZmIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYmVnaW49IjAuMTI1cyIgdmFsdWVzPSIjMDA3YWZmOyMwMDdhZmY7IzE1MzY3MjsjMTUzNjcyIiBrZXlUaW1lcz0iMDswLjE7MC4yOzEiPjwvYW5pbWF0ZT48L3JlY3Q+PHJlY3QgeD0iNjUiIHk9IjE1IiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiMxNTM2NzIiIGNsYXNzPSJzcSI+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iZmlsbCIgZnJvbT0iIzE1MzY3MiIgdG89IiMwMDdhZmYiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjFzIiBiZWdpbj0iMC4yNXMiIHZhbHVlcz0iIzAwN2FmZjsjMDA3YWZmOyMxNTM2NzI7IzE1MzY3MiIga2V5VGltZXM9IjA7MC4xOzAuMjsxIj48L2FuaW1hdGU+PC9yZWN0PjxyZWN0IHg9IjE1IiB5PSI0MCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjMTUzNjcyIiBjbGFzcz0ic3EiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImZpbGwiIGZyb209IiMxNTM2NzIiIHRvPSIjMDA3YWZmIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYmVnaW49IjAuODc1cyIgdmFsdWVzPSIjMDA3YWZmOyMwMDdhZmY7IzE1MzY3MjsjMTUzNjcyIiBrZXlUaW1lcz0iMDswLjE7MC4yOzEiPjwvYW5pbWF0ZT48L3JlY3Q+PHJlY3QgeD0iNjUiIHk9IjQwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiMxNTM2NzIiIGNsYXNzPSJzcSI+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iZmlsbCIgZnJvbT0iIzE1MzY3MiIgdG89IiMwMDdhZmYiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjFzIiBiZWdpbj0iMC4zNzUiIHZhbHVlcz0iIzAwN2FmZjsjMDA3YWZmOyMxNTM2NzI7IzE1MzY3MiIga2V5VGltZXM9IjA7MC4xOzAuMjsxIj48L2FuaW1hdGU+PC9yZWN0PjxyZWN0IHg9IjE1IiB5PSI2NSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjMTUzNjcyIiBjbGFzcz0ic3EiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImZpbGwiIGZyb209IiMxNTM2NzIiIHRvPSIjMDA3YWZmIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYmVnaW49IjAuNzVzIiB2YWx1ZXM9IiMwMDdhZmY7IzAwN2FmZjsjMTUzNjcyOyMxNTM2NzIiIGtleVRpbWVzPSIwOzAuMTswLjI7MSI+PC9hbmltYXRlPjwvcmVjdD48cmVjdCB4PSI0MCIgeT0iNjUiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzE1MzY3MiIgY2xhc3M9InNxIj48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJmaWxsIiBmcm9tPSIjMTUzNjcyIiB0bz0iIzAwN2FmZiIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iMXMiIGJlZ2luPSIwLjYyNXMiIHZhbHVlcz0iIzAwN2FmZjsjMDA3YWZmOyMxNTM2NzI7IzE1MzY3MiIga2V5VGltZXM9IjA7MC4xOzAuMjsxIj48L2FuaW1hdGU+PC9yZWN0PjxyZWN0IHg9IjY1IiB5PSI2NSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjMTUzNjcyIiBjbGFzcz0ic3EiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImZpbGwiIGZyb209IiMxNTM2NzIiIHRvPSIjMDA3YWZmIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYmVnaW49IjAuNXMiIHZhbHVlcz0iIzAwN2FmZjsjMDA3YWZmOyMxNTM2NzI7IzE1MzY3MiIga2V5VGltZXM9IjA7MC4xOzAuMjsxIj48L2FuaW1hdGU+PC9yZWN0Pjwvc3ZnPg==",
  onInit: function() {
    this.getCachedImageSrc();
  }.on("init"),
  //This is triggered by the attribute binding.
  src: function() {
    return this.loadingSpinner;
  }.property(),

  fadeIn: function(src) {
    if (this.useFadeIn) {
      this.$().hide();
      this.set("loading", false);

      var that = this;
      var img = new Image();
      img.onload = function(event) {
        that.set("src", event.target.src);
        that.$().fadeIn();
      };
      img.src = src;

      if(img.complete) {
        this.set("src", src);
        this.$().fadeIn();
      }
    } else {
      this.set("loading", false);
      this.set("src", src);
    }
  },
  //This will run any time the remote source is updated.
  //It is also called from init, because there is no binding
  // of this attribute to cause an initial lookup.
  getCachedImageSrc: function() {
    if(this.$()) {
      this.$().hide();
      this.set("src", "");
    }
    if (this.image.get("remotePath")) {
      var that = this;
      this.get("imageService").cacheAndDisplay(this.image).then(function (imgPath) {
        that.fadeIn(imgPath);
      });
    }
  }.observes("image.remotePath")
});