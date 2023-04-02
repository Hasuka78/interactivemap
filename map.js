const southWest = L.latLng(-2000, -2000); // Replace these coordinates with your own
const northEast = L.latLng(2000, 2000); // Replace these coordinates with your own
const mapBounds = L.latLngBounds(southWest, northEast);

var hoverSound = new Audio('hover-sound.mp3');
var clickSound = new Audio('click-sound.mp3');

// Set the volume of the hoverSound and clickSound
hoverSound.volume = 0.2;
clickSound.volume = 0.2;


var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -2,
    maxZoom: 3,
    maxBounds: mapBounds
}).setView([0, 0], 0);

// Set up the custom JPEG background
var imageUrl = 'map.jpg';
var imageBounds = [[-1080, -1440], [1080, 1440]]; // Set appropriate bounds for your image
var backgroundLayer = L.imageOverlay(imageUrl, imageBounds);

const factionsLayer = L.layerGroup();

function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 5,
        color: 'white',
        dashArray: '',
        fillOpacity: 0.7
    });
    layer._path.classList.add("pulsating-effect"); // Add the custom class for pulsating effect
}

function resetHighlight(e) {
    var layer = e.target;
    layer.setStyle({
        color: layer.options.defaultColor, // Use the defaultColor property
        weight: 2,
        fillOpacity: 0.5
    });
    layer._path.classList.remove("pulsating-effect"); // Remove the custom class for pulsating effect
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Create sample zone polygon
var zone = L.polygon([
    [-296.60, -991.43],
    [-276.60, -879.90],
    [-249.10, -831.88],
    [-226.10, -801.37],
    [-207.10, -789.87],
    [-156.10, -790.37],
    [-96.10, -803.37],
    [-64.60, -816.38],
    [-26.60, -926.91],
    [-54.60, -1015.43],
    [-85.60, -1042.94],
    [-126.10, -1057.44],
    [-169.60, -1066.95],
    [-208.60, -1056.94],
    [-211.60, -1036.94],
    [-264.10, -999.93],
    [-286.60, -1000.93]
], {
    color: 'lightblue',
    defaultColor: 'lightblue'
}).addTo(factionsLayer);

var zonePopupContent = `
  <h3>Westfall</h3>
  <p>Under control of <strong>Khaganate</strong></p>
  <p>🌽 - Daily Food Production: <strong>0</strong></p>
  <p>⚙️ - Daily Iron Production: <strong>10</strong></p>
  <p>🚪 - Daily Lumber Production: <strong>20</strong></p>
    <img src="khans.png" alt="Khans" width="300" />
`;

// Bind popup to zone
zone.bindPopup(zonePopupContent);

// Add event listeners for hover and click sounds
zone.on('mouseover', function (e) {
    highlightFeature(e);
    hoverSound.play();
});

zone.on('mouseout', function (e) {
    resetHighlight(e);
});

zone.on('click', function (e) {
    clickSound.play();
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Create sample zone polygon for factionsLayer
var zone3 = L.polygon([
    [-331.20, -1039.92],
    [-291.20, -959.90],
    [-280.20, -878.88],
    [-252.20, -820.86],
    [-214.20, -787.85],
    [-159.20, -785.85],
    [-149.30, -786.71],
    [-94.55, -694.19],
    [6.90, -702.91],
    [7.40, -641.89],
    [34.90, -585.88],
    [87.40, -562.87],
    [80.90, -544.36],
    [43.90, -518.36],
    [10.40, -479.35],
    [-1.20, -443.86],
    [-47.20, -419.85],
    [-90.20, -392.84],
    [-125.20, -377.84],
    [-184.20, -367.83],
    [-232.20, -355.83],
    [-204.20, -420.85],
    [-191.20, -463.86],
    [-186.20, -501.87],
    [-185.20, -540.88],
    [-161.20, -584.89],
    [-134.20, -598.90],
    [-144.20, -639.91],
    [-135.20, -669.92],
    [-107.20, -670.92],
    [-171.05, -764.98],
    [-256.10, -772.93],
    [-302.10, -750.42],
    [-325.10, -715.41],
    [-345.10, -681.90],
    [-404.60, -671.90],
    [-445.60, -664.90],
    [-450.10, -699.93],
    [-499.60, -696.93],
    [-524.60, -690.43],
    [-549.20, -761.77],
    [-556.20, -824.78],
    [-550.20, -887.80],
    [-551.20, -967.82],
    [-548.20, -1006.83],
    [-502.20, -1031.84],
    [-457.20, -1029.84],
    [-447.20, -990.83],
    [-426.20, -970.82],
    [-394.20, -986.83],
    [-362.55, -991.96],
    [-355.55, -1013.71],
    [-344.30, -1026.22]
], {
    color: 'gray',
    defaultColor: 'gray'
}).addTo(factionsLayer); // Add the zone3 polygon to factionsLayer instead of the main map

var zone3PopupContent = `
      <h3>Farmlands</h3>
  <p>Under control of <strong>NO ONE.</strong></p>
  <p>🌽 - Daily Food Production: <strong>0</strong></p>
  <p>⚙️ - Daily Iron Production: <strong>10</strong></p>
  <p>🚪 - Daily Lumber Production: <strong>20</strong></p>
`;

//<img src="slhp.png" alt="SLHP" width="300" />

// Bind popup to zone
zone3.bindPopup(zone3PopupContent);

// Add event listeners for hover and click sounds
zone3.on('mouseover', function (e) {
    highlightFeature(e);
    hoverSound.play();
});

zone3.on('mouseout', function (e) {
    resetHighlight(e);
});

zone3.on('click', function (e) {
    clickSound.play();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

let lastPlayed = 0;
const delay = 100; // Minimum delay in milliseconds

function playSound(sound) {
  const currentTime = new Date().getTime();
  if (currentTime - lastPlayed > delay) {
    sound.play();
    lastPlayed = currentTime;
  }
}

function addSoundsToLayer(layer) {
  layer.on('mouseover', function() {
    playSound(hoverSound);
  });

  layer.on('click', function() {
    playSound(clickSound);
  });
}

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


document.getElementById('export-edits').addEventListener('click', function () {
  var output = '';
  var layerIndex = 0; // Starting from poi10
  
  editableLayers.eachLayer(function (layer) {
    if (layer instanceof L.Polygon) {
      output += '- Zone Name (poi' + layerIndex + ')\n';
      output += 'var zone' + layerIndex + ' = L.polygon([\n';
      
      var latlngs = layer.getLatLngs()[0];
      
      for (var i = 0; i < latlngs.length; i++) {
        output += '    [' + latlngs[i].lat.toFixed(2) + ', ' + latlngs[i].lng.toFixed(2) + ']';
        if (i < latlngs.length - 1) {
          output += ',\n';
        } else {
          output += '\n';
        }
      }
      
      output += '], {\n';
      output += '    // Additional options, like color, can be added here\n';
      output += '});\n\n';
      
      layerIndex++;
    }
  });
  
  // You can output the result to the console, or present it in a more user-friendly manner
  console.log(output);
});