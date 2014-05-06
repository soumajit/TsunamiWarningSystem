//// TWS
//// Sensor map
  var obj; 
  var map;
  var markers = [];
  var socket = io.connect('http://localhost:8080');
 
  /*socket.on('sensor-position', function (data) {
    	
    	obj = JSON.parse(data.data);
	
	});*/
  socket.on('active-buoy', function(data){
	obj = data.data;
	//console.log(obj);
	if (obj == "buoy1") {
		markers[0].setAnimation(google.maps.Animation.BOUNCE);
		markers[1].setAnimation(null);
		markers[2].setAnimation(null);
		markers[3].setAnimation(null);
	}
	else if (obj == "buoy2") {
		markers[1].setAnimation(google.maps.Animation.BOUNCE);
		markers[0].setAnimation(null);
		markers[2].setAnimation(null);
		markers[3].setAnimation(null);
	}
	else if (obj == "buoy3") {
		markers[2].setAnimation(google.maps.Animation.BOUNCE);
		markers[0].setAnimation(null);
		markers[1].setAnimation(null);
		markers[3].setAnimation(null);
	}
	else if (obj == "buoy4") {
		markers[3].setAnimation(google.maps.Animation.BOUNCE);
		markers[0].setAnimation(null);
		markers[1].setAnimation(null);
		markers[2].setAnimation(null);
	}
  	});
  


var map;
function initialize() {
	var mapOptions = {
	zoom: 4,
	center: new google.maps.LatLng(20.092732,80.494087)
	};
	map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
	var marker1 = new google.maps.Marker({                        
                position:  new google.maps.LatLng(10.092732, 74.494087), 
		icon: getCircle(),
		title: 'Sensor Buoy-1',
		animation: google.maps.Animation.DROP,                   
                map: map
        });
	var marker2 = new google.maps.Marker({                        
                position:  new google.maps.LatLng(14.092732, 85.494087), 
		icon: getCircle(),
		title: 'Sensor Buoy-2',
		animation: google.maps.Animation.DROP,                   
                map: map
        });
	var marker3 = new google.maps.Marker({                        
                position:  new google.maps.LatLng(7.092732, 76.494087), 
		icon: getCircle(),
		title: 'Sensor Buoy-3',
		 animation: google.maps.Animation.DROP,                   
                map: map
        });
	var marker4 = new google.maps.Marker({                        
                position:  new google.maps.LatLng(7.092732, 84.494087), 
		icon: getCircle(),
		title: 'Sensor Buoy-4',
		 animation: google.maps.Animation.DROP,                   
                map: map
        });
	markers.push(marker1);
	markers.push(marker2);
	markers.push(marker3);
	markers.push(marker4);
	
}


google.maps.event.addDomListener(window, 'load', initialize);

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

function getCircle() {
        var circle = {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: 'red',
		fillOpacity: 1,
		scale: 3,
		strokeColor: 'red',
		strokeWeight: 2,
		strokeOpacity: 0.6
	};
        return circle;
}
