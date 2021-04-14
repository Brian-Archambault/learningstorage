// This array contains the coordinates for all bus stops between MIT and Harvard



// TODO: add your own access token
mapboxgl.accessToken = '';

// This is the map instance
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 14,
});

var markers = [];

async function getBusLocations(){
	var url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';	
	var response = await fetch(url);
	var json     = await response.json();
	return json.data;
}

async function addMarkers(){
	// get bus data
	var locations = await getBusLocations();

	// loop through data, add bus markers
	locations.forEach(function(bus){
		var marker = getMarker(bus.id);		
		if (marker){
			moveMarker(marker,bus);
		}
		else{
			addMarker(bus);			
		}
	});

	// timer
	setTimeout(addMarkers,15000);
}

function getMarker(id){
	var marker = markers.find(function(item){
		return item.id === id;
	});
	return marker;
}

function addMarker(bus) {

  var marker = new mapboxgl.Marker().setLngLat([bus.attributes.longitude,bus.attributes.latitude]);
  marker.id = bus.id;
  markers.push(marker);
  markers[markers.length - 1].addTo(map);

}

function moveMarker(markering, bus) {

  markering.setLngLat([bus.attributes.longitude,bus.attributes.latitude]);

}




// TODO: add a marker to the map at the first coordinates in the array busStops. The marker variable should be named "marker"
// counter here represents the index of the current bus stop
let counter = 0;
function move() {
  // TODO: move the marker on the map every 1000ms. Use the function marker.setLngLat() to update the marker coordinates
  // Use counter to access bus stops in the array busStops
  // Make sure you call move() after you increment the counter.
  addMarkers();
}

// Do not edit code past this point
if (typeof module !== 'undefined') {
  module.exports = { move };
}
