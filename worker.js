// Listen for messages from the main thread
self.addEventListener('message', function(event) {
    // If the message is to start tracking location
    if (event.data.type === 'start') {
      // Start tracking location
      var watchId = navigator.geolocation.watchPosition(function(position) {
        // Send the location back to the main thread
        self.postMessage({lat: position.coords.latitude, lng: position.coords.longitude});
      });
    }
  });
  