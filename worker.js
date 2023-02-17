// get user's location using Geolocation API
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(sendLocation, error);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

// send location data to ThingSpeak using AJAX request
function sendLocation(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const writeKey = "EF2FUH19N5P8VP3I";
  const url = `https://api.thingspeak.com/update?api_key=${writeKey}&field1=${latitude}&field2=${longitude}`;

  // send AJAX request
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, true);
  xhttp.send();
}

// handle geolocation errors
function error(error) {
  console.log(`Error: ${error.message}`);
}

// start tracking location
getLocation();
