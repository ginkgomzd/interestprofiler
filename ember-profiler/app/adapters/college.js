import LFAdapter from 'ember-localforage-adapter/adapters/localforage';

export default LFAdapter.extend({
  namespace: 'H2CColleges',
  query: function (records, query) {
    if(typeof(query) === "object" && query.hasOwnProperty("proximity")) {
      var results = [], id, push, proximity;

      proximity = this.proximityBoundsFromRadius(query.proximity, query.location.lat, query.location.long);

      for (id in records) {
        push = true;

        if(records[id].lat > proximity.n ||
          records[id].lat < proximity.s ||
          records[id].long < proximity.w ||
          records[id].long > proximity.e) {
          push = false;
        }

        if (push) {
          //calculate the actual distance before pushing into results
          records[id].distance = this.calculateDistance(query.location, {lat: records[id].lat, long: records[id].long});
          results.push(records[id]);
        }

      }
      return results;
    } else {
      return this._super(records, query);
    }
  },
  //This uses the ‘haversine’ formula to calculate the great-circle distance between two
  //points – that is, the shortest distance over the earth’s surface – giving an ‘as-the-crow-flies’
  //distance between the points (ignoring any hills they fly over, of course!).
  //Borrowed from: http://www.movable-type.co.uk/scripts/latlong.html
  calculateDistance: function(start, end) {
    var R = 6371000; // metres
    var φ1 = this.toRadians(start.lat);
    var φ2 = this.toRadians(end.lat);
    var Δφ = this.toRadians(end.lat - start.lat);
    var Δλ = this.toRadians(end.long - start.long);

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return Math.round(((R * c) / 1609.34) * 100) / 100; //converting to miles;
  },
  proximityBoundsFromRadius: function(d, lat, long) {
    var proximity = {};


    //Earth’s radius, Meters
    var R = 6378137;

    //convert to meters
    d = d * 1609.34;

    //Coordinate offsets in radians
    var nLat = d/R;
    var eLong = d/(R*Math.cos(this.toRadians(lat)));

    proximity.n = lat + nLat * 180/Math.PI;
    proximity.e = long + eLong * 180/Math.PI;


    //Now the other direction
    d = -d;
    var sLat = d/R;
    var wLong = d/(R * Math.cos(this.toRadians(lat)));

    proximity.s = lat + sLat * 180/Math.PI;
    proximity.w = long + wLong * 180/Math.PI;

    return proximity;
  },
  toRadians: function(deg) {
    return deg * Math.PI / 180;
  }
});
