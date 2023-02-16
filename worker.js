// Import the ThingSpeak API library
importScripts('https://cdn.rawgit.com/mathworks/thingspeakwebpageplugin/v0.2.0/matlab/thingspeakclient.js');

// Set the ThingSpeak API key and channel ID
var WRITE_API_KEY = 'EF2FUH19N5P8VP3I';
var CHANNEL_ID = '2013276';

// Listen for messages from the main thread
self.addEventListener('message', function(event) {
  // If the message is to start tracking location
  if (event.data.type === 'start') {
    if ('geolocation' in navigator) {
      // Start tracking location
      var watchId = navigator.geolocation.watchPosition(function(position) {
        // Get the location coordinates
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        // Update the ThingSpeak channel with the location coordinates
        var ts = new ThingSpeak({key: WRITE_API_KEY});
        ts.updateChannel(CHANNEL_ID, {field1: latitude, field2: longitude}, function(data) {
          // Send a message back to the main thread with the update status
          self.postMessage({type: 'update', success: true, latitude: latitude, longitude: longitude});
        }, function(error) {
          // Send a message back to the main thread with the error message
          self.postMessage({type: 'error', message: error});
        });
      }, function(error) {
        // Send a message back to the main thread with the error message
        self.postMessage({type: 'error', message: error});
      });
    } else {
      // Geolocation API is not supported
      self.postMessage({type: 'error', message: 'Geolocation API is not supported'});
    }
  }
});
