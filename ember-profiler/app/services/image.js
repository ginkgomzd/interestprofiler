import Ember from 'ember';

var imageService = Ember.Service.extend({
  cacheAndDisplay: function(image) {
    var that = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var url = image.get("remotePath");

      if (!window.cordova) {
        return resolve(url);
      }

      var localFilename = that.makeLocalFilename(image);
      try {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
            // Parameters passed to getFile create a new file or return the file if it already exists.
            fs.root.getFile(localFilename, {create: false, exclusive: false}, function (fileEntry) {
                //console.log("Resolved with existing Local File", fileEntry);
                resolve(fileEntry.toURL());
              },
              //File Does not already exist.
              function (error) {
                //var localPath = fs.root.fullPath + localFilename;
                var localPath = fs.root.nativeURL + localFilename;
                that.fetchImage(url, localPath).then(
                  function (imgUrl) {
                    //console.log("Resolved with Local File", imgUrl);
                    resolve(imgUrl);
                  },
                  function (error) {
                    //console.log("Error: ", error);
                    resolve(url);
                  }
                );
              }
            );

          },
          //Load the FileSystem Error Callback
          function (error) {
            //console.log("Error:", error);
            //Fall back on remote load
            resolve(url);
          }
        );
      } catch(e) {
        //Fall back on remote load
        //console.log("try/catch", e);
        resolve(url);
      }


    });
  },
  makeLocalFilename: function(image) {
    var ext = image.get("mimeType").replace("image/", "");
    return image.get("id") + "." + ext;
  },
  fetchImage: function(url, localPath) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var fileTransfer = new FileTransfer();
      var uri = encodeURI(url);
      fileTransfer.download(
        uri,
        localPath,
        function(entry) { resolve(entry.toURL()); },
        function(error) { reject(error);},
        false, {}
      );
    });
  }
});

export default imageService;
