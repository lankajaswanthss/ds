// Listen for messages from the main thread
self.addEventListener('message', function(event) {
  // If the message is to start tracking location
  if (event.data.type === 'start') {
    if ('geolocation' in navigator) {
      // Start tracking location
      var watchId = navigator.geolocation.watchPosition(function(position) {
        // Send the location back to the main thread
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        self.postMessage({type: 'location', latitude: latitude, longitude: longitude});
      }, function(error) {
        // Send the error message back to the main thread
        self.postMessage({type: 'error', message: error.message});
      });
    } else {
      // Geolocation API is not supported
      self.postMessage({type: 'error', message: 'Geolocation API is not supported'});
    }
  }
});
