//Creates Map from Esri api
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



// This is the ajax request for the jobs data
$.ajax({
    type: 'GET',
    url: "http://ec2-54-172-145-108.compute-1.amazonaws.com:8888/jobs",
    timeout: 8000,
    crossDomain: true,
    dataType: 'json',
    data: {},
    headers: {
        "VMUser": "hmoreno"
    },
    //Renders data to view
    success: function (data) {
      console.log(data);

        // console.log(data.length);
        data.forEach(function (value) {
            var jobName = value.name;
            var createdBy = value.createdby;
            var latitude = value.latitude;
            var longitude = value.longitude;
            var id = value.jobid;
            var status = value.status;
            var provider = value.provider;

            var marker = L.marker([value.latitude, value.longitude]).addTo(map);
            marker.bindPopup("<b>Job Name: "+jobName+"</b><br>Created By: "+createdBy+"<br>Latitude: "+latitude+"<br>Longitude: "+longitude+"<br>Status: "+status+"<br>Provider: "+provider+".");
            marker.on('mouseover', function (e) {
            this.openPopup();
            });
            marker.on('mouseout', function (e) {
            this.closePopup();
          });
            var circle = L.circle([value.latitude, value.longitude], 500, {
             color: 'red',
             fillColor: '#f03',
             fillOpacity: 1.5 }).addTo(map);
       });

  },

});

// Fetch the file
$.getJSON('../javascripts/grid.json', function (data) {
    // Assign the results to the geojsonData variable
  console.log(data);

});
