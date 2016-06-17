var map = L.map("map").setView([35.46, -93.50], 3);

  var layer = L.esri.basemapLayer("Topographic", {
  	maxZoom: 19,
  	minZoom: 3,
  }).addTo(map);

  var layerLabels;

  function setBasemap(basemap) {
    if (layer) {
      map.removeLayer(layer);
    }

    layer = L.esri.basemapLayer(basemap);


    map.addLayer(layer);

    if (layerLabels) {
      map.removeLayer(layerLabels);
    }

    if (basemap === 'ShadedRelief'
     || basemap === 'Oceans'
     || basemap === 'Gray'
     || basemap === 'DarkGray'
     || basemap === 'Imagery'
     || basemap === 'Terrain'
   ) {
      layerLabels = L.esri.basemapLayer(basemap + 'Labels');
      map.addLayer(layerLabels);
    }
  }

  function changeBasemap(basemaps){
	  var basemap = basemaps.value;
	  setBasemap(basemap);
  }

  var popup = L.popup();


  function onMapClick(e) {
    popup
    	.setLatLng(e.latlng)
    	.setContent("Coordinates: " + "Latitude " + (e.latlng.lat).toFixed(4) + ", " + "Longitude " + (e.latlng.lng).toFixed(4).toString())
    	.openOn(map);

    }
var arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider();

var searchControl = L.esri.Geocoding.geosearch({
    providers: [
      arcgisOnline,
      L.esri.Geocoding.mapServiceProvider({
        label: 'States and Counties',
        url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer',
        layers: [2, 3],
        searchFields: ['NAME', 'STATE_NAME']
        })
      ]
    }).addTo(map);

  map.on('click', onMapClick);
