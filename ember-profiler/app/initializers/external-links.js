import Ember from 'ember';


/**
 *
 * This Initializer attaches an event handler to the window
 * and wathes for any-outgoing links (http* and not pointing to localhost)
 * and routes them to cordova.InAppBrowser so that they open in the native browser
 * application rather than hijacking our WebView.
 *
 */
export function initialize(App) {

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
