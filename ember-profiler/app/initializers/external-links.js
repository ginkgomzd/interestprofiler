import Ember from 'ember';

export function initialize(registry, application) {

  function findParent(tagname,el){
    if ((el.nodeName || el.tagName).toLowerCase()===tagname.toLowerCase()){
      return el;
    }
    while (el = el.parentNode){
      if ((el.nodeName || el.tagName).toLowerCase()===tagname.toLowerCase()){
        return el;
      }
    }
    return null;
  }


  window.addEventListener('click', function(event) {
    var from = findParent('a', event.target || event.srcElement);
    if (from && from.href.substring(0, 4) === "http"  && from.href.indexOf("//localhost") === -1) {
      if (typeof(cordova) !== 'undefined' && cordova.InAppBrowser) {
        cordova.InAppBrowser.open(from.href, "_system");
      } else {
        window.open(from.href, "_blank");
      }
      return event.preventDefault();
    }
  }, false);

}

export default {
  name: 'external-links',
  initialize: initialize
};
