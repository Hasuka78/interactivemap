// Initialize the map and set the initial view
var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -2,
    maxZoom: 3
}).setView([0, 0], 0);

// Set up the custom JPEG background
var imageUrl = 'map.jpg';
var imageBounds = [[-1080, -1440], [1080, 1440]]; // Set appropriate bounds for your image
var backgroundLayer = L.imageOverlay(imageUrl, imageBounds).addTo(map);

// Create sample zone polygon
var zone = L.polygon([
    [-10, -1052],
    [-500, -1073],
    [-797, -804],
    [-822, -664],
    [-342, -675],
    [17, -952]
], {
    color: 'red'
}).addTo(map);

// Function to change zone color
function changeZoneColor(newColor) {
    zone.setStyle({color: newColor});
}

// Function to change point of interest color
function changePOIColor(newColor) {
    var newIcon = new L.Icon.Default();
    newIcon.options.iconUrl = `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${newColor}.png`;
    poi.setIcon(newIcon);
}

// Example usage of the functions to change colors
// changeZoneColor('blue');
// changePOIColor('blue');

// Zone popup content
var zonePopupContent = `
    <h2>Westfall Zone of Influence</h2>
    <p>The Westfall Zone of Influence is an area that showcases the power of good and low threats. As the capital of the human kingdom and central hub for trade with other good-aligned races, Westfall has worked hard to create a peaceful and prosperous environment for its citizens. The zone of influence is an extension of this, offering visitors a glimpse into the safety and security of the land. With well-trained guards and patrols, travelers can rest assured that they are in good hands.</p>
    <img src="path/to/zone-image.jpg" alt="Zone image" width="200" />
`;

// Bind popup to zone
zone.bindPopup(zonePopupContent);

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
    <p>The Westfall Bridge is a remarkable feat of engineering that connects the mainland to the isle of Westfall. This stunning structure spans a great distance and offers travelers a breathtaking view of the surrounding landscape. It has become a popular attraction in its own right, with many visitors taking the time to admire its design and take pictures. For those looking to explore the isle of Westfall, the bridge is the perfect starting point.</p>
    <img src="path/to/poi2-image.jpg" alt="Second Point of Interest image" width="200" />
`;

// Bind popup to the second point of interest
poi2.bindPopup(poi2PopupContent);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create a new AwesomeMarker with a custom color
var poi3Icon = L.AwesomeMarkers.icon({
  icon: 'info-sign', // Changed this to a different icon
    markerColor: 'blue', // Change this to any color you'd like
    prefix: 'glyphicon' // Changed this to 'glyphicon' instead of 'fa'
});

// New POI marker with custom color
var poi3 = L.marker([-117, -918], {icon: poi3Icon}).addTo(map);

// Second Point of Interest popup content
var poi3PopupContent = `
    <h2>Westfall</h2>
    <p>Westfall is situated at the south-western coast of the Shattered Realms, and it serves as the capital of the human kingdom but it also acts as the central hub for trade with the other good aligned races in the land. From its grand port on the western coast, ships set sail to Eryndor, the elven kingdom in the East, bearing goods and helping  improve the development of the bright side factions and cities.
</p>
`;

// Bind popup to the second point of interest
poi3.bindPopup(poi3PopupContent);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create a new AwesomeMarker with a custom color
var poi4Icon = L.AwesomeMarkers.icon({
  icon: 'info-sign', // Changed this to a different icon
    markerColor: 'blue', // Change this to any color you'd like
    prefix: 'glyphicon' // Changed this to 'glyphicon' instead of 'fa'
});

// New POI marker with custom color
var poi4 = L.marker([-475, -836], {icon: poi4Icon}).addTo(map);

// Second Point of Interest popup content
var poi4PopupContent = `
    <h2>Farmlands</h2>
    <p>The Farmlands of Westfall are an essential component of the region, as they provide a constant supply of food to feed the population. The fertile soil and mild climate make it an ideal location for farming, and the locals take great pride in their agricultural heritage. Visitors to the Farmlands can take a stroll through the fields and see firsthand the hard work that goes into producing the crops that sustain the kingdom. The lush greenery and fresh air make it a relaxing and enjoyable experience.
</p>
`;

// Bind popup to the second point of interest
poi4.bindPopup(poi4PopupContent);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
