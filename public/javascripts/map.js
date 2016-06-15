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
    	.setContent("Coordinates: " + "Latitude " + e.latlng.lat + ", " + "Longitude " + e.latlng.lng.toString())
    	.openOn(map);
    }

  map.on('click', onMapClick);
