// Initialize the map and set the initial view
var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -2,
    maxZoom: 3
}).setView([0, 0], 0);

// Set up the custom JPEG background
var imageUrl = 'map.jpg';
var imageBounds = [[-1080, -1440], [1080, 1440]]; // Set appropriate bounds for your image
var backgroundLayer = L.imageOverlay(imageUrl, imageBounds);

const factionsLayer = L.layerGroup();


// Create sample zone polygon
var zone = L.polygon([
    [-54, -1032],
    [-219, -1025],
    [-193, -821],
    [-61, -833]
], {
    color: 'lightblue'
}).addTo(factionsLayer);

var zonePopupContent = `
    <h2>Westfall</h2>
    <p>Gives a 10 iron and 20 lumber production daily. Currently under the control of the Khaganate.</p>
    <img src="khans.png" alt="Khans" width="300" />
`;

// Bind popup to zone
zone.bindPopup(zonePopupContent);


// Create sample zone polygon for factionsLayer
var zone3 = L.polygon([
    [-344, -972],
    [-522, -952],
    [-513, -750],
    [-61, -516],
    [-3, -696],
    [-280, -796],
], {
    color: 'black'
}).addTo(factionsLayer); // Add the zone3 polygon to factionsLayer instead of the main map

var zone3PopupContent = `
    <h2>Farmlands</h2>
    <p> Gives a 20 wheat production daily. Currently under the control of SHLP.</p>
    <img src="slhp.png" alt="SLHP" width="300" />
`;

// Bind popup to zone
zone3.bindPopup(zone3PopupContent);




factionsLayer.addTo(map);

const baseLayers = {
  "Background": backgroundLayer
};

const overlayLayers = {
  "Factions Zones": factionsLayer
};

// Add the backgroundLayer as the default base layer
backgroundLayer.addTo(map);

L.control.layers(baseLayers, overlayLayers).addTo(map);

// Display coordinates on mousemove
function showCoordinates(e) {
    var x = e.latlng.lat.toFixed(2);
    var y = e.latlng.lng.toFixed(2);
    document.getElementById('coordinates').innerHTML = `x: ${x}, y: ${y}`;
}

map.on('mousemove', showCoordinates);

// Initialize the FeatureGroup to store editable layers
var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

// Configure the drawing tools
var drawPluginOptions = {
  position: 'bottomright',
  draw: {
    polygon: {
      allowIntersection: false,
      showArea: true,
      drawError: {
        color: '#e1e100',
        message: 'Oh snap! You can\'t draw that!'
      },
      shapeOptions: {
        color: '#97009c'
      }
    },
    polyline: {
      shapeOptions: {
        color: '#f357a1',
        weight: 4
      }
    },
    circle: {
      shapeOptions: {
        color: '#662d91'
      }
    },
    rectangle: {
      shapeOptions: {
        color: '#f06eaa'
      }
    },
    marker: true,
  },
  edit: {
    featureGroup: editableLayers,
    remove: true
  }
};

// Add the drawing tools to the map
var drawControl = new L.Control.Draw(drawPluginOptions);
map.addControl(drawControl);

// Handle the creation of new shapes
map.on('draw:created', function (e) {
  var type = e.layerType,
      layer = e.layer;

  if (type === 'marker') {
    layer.bindPopup('A popup!');
  }

  editableLayers.addLayer(layer);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 'blue', 'white', 'red','darkred', 'lightred', 'orange', 'beige', 'green', 'darkgreen', 'lightgreen', 'blue', 'darkblue', 'lightblue', 'purple', 'darkpurple', 'pink', 'cadetblue', 'white', 'gray', 'lightgray', 'black' 
// Create a new AwesomeMarker with a custom color
var poi2Icon = L.AwesomeMarkers.icon({
  icon: 'info-sign', // Changed this to a different icon
    markerColor: 'cadetblue', // Change this to any color you'd like
    prefix: 'glyphicon' // Changed this to 'glyphicon' instead of 'fa'
});

// New POI marker with custom color
var poi2 = L.marker([-153, -731], {icon: poi2Icon}).addTo(map);

// Second Point of Interest popup content
var poi2PopupContent = `
    <h2>Westfall Bridge</h2>
    <p>The Westfall Bridge is an impressive and sturdy structure that spans the waters east of Westfall, connecting the island capital to the mainland. With its fortified ramparts and watchtowers, the bridge is not only a vital artery for trade and communication but also a formidable defensive bulwark against any potential invasion.</p>
`;

// Bind popup to the second point of interest
poi2.bindPopup(poi2PopupContent);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create a new AwesomeMarker with a custom color
var poi3Icon = L.AwesomeMarkers.icon({
  icon: 'info-sign', // Changed this to a different icon
    markerColor: 'cadetblue', // Change this to any color you'd like
    prefix: 'glyphicon' // Changed this to 'glyphicon' instead of 'fa'
});

// New POI marker with custom color
var poi3 = L.marker([-117, -918], {icon: poi3Icon}).addTo(map);

// Second Point of Interest popup content
var poi3PopupContent = `
    <h2>Westfall</h2>
    <p>Westfall is the bustling human capital located on a southwestern isle in the Shattered Realms. Surrounded by natural defenses, the city stands as a beacon of hope and prosperity. The city's strategic location on an island fortifies its defenses, with a grand bridge connecting it to the mainland, ensuring easy access for trade and travel.
</p>
<img src="westfall.jpg" alt="Westfall" width="300" />
`;

// Bind popup to the second point of interest
poi3.bindPopup(poi3PopupContent);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create a new AwesomeMarker with a custom color
var poi4Icon = L.AwesomeMarkers.icon({
  icon: 'info-sign', // Changed this to a different icon
    markerColor: 'cadetblue', // Change this to any color you'd like
    prefix: 'glyphicon' // Changed this to 'glyphicon' instead of 'fa'
});

// New POI marker with custom color
var poi4 = L.marker([-475, -836], {icon: poi4Icon}).addTo(map);

// Second Point of Interest popup content
var poi4PopupContent = `
    <h2>Farmlands</h2>
    <p>Located just south of Westfall's gates, the Farmlands are the breadbasket of the island capital. The fertile soil and mild climate allow for a bountiful harvest of various crops, ensuring a steady supply of food for the city's inhabitants. The Farmlands are also home to numerous farmers and their families, who work tirelessly to cultivate and maintain the land, contributing to the prosperity of Westfall.
</p>
`;

// Bind popup to the second point of interest
poi4.bindPopup(poi4PopupContent);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
