// Listen for messages from the main thread
onmessage = function(e) {
  const interval = e.data.interval;
  
  setInterval(function() {
    console.log('Refreshing page...');
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", location.href, true);
    xhttp.send();
  }, interval);
  
  postMessage('Page refresh worker started');
};
