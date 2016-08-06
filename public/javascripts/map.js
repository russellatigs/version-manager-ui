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


//This section creates the grid for the map

L.Grid = L.LayerGroup.extend({
	options: {
		xticks: 8,
		yticks: 5,

		// 'decimal' or one of the templates below
		coordStyle: 'MinDec',
		coordTemplates: {
			'MinDec': '{degAbs}&deg;&nbsp;{minDec}\'{dir}',
			'DMS': '{degAbs}{dir}{min}\'{sec}"'
		},

		// Path style for the grid lines
		lineStyle: {
			stroke: true,
			color: '#111',
			opacity: 0.6,
			weight: 1
		},

		// Redraw on move or moveend
		redraw: 'move'
	},

	initialize: function (options) {
		L.LayerGroup.prototype.initialize.call(this);
		L.Util.setOptions(this, options);

	},

	onAdd: function (map) {
		this._map = map;

		var grid = this.redraw();
		this._map.on('viewreset '+ this.options.redraw, function () {
			grid.redraw();
		});

		this.eachLayer(map.addLayer, map);
	},

	onRemove: function (map) {
		// remove layer listeners and elements
		map.off('viewreset '+ this.options.redraw, this.map);
		this.eachLayer(this.removeLayer, this);
	},

	redraw: function () {
		// pad the bounds to make sure we draw the lines a little longer
		this._bounds = this._map.getBounds().pad(0.5);

		var grid = [];
		var i;

		var latLines = this._latLines();
		for (i in latLines) {
			if (Math.abs(latLines[i]) > 90) {
				continue;
			}
			grid.push(this._horizontalLine(latLines[i]));
			grid.push(this._label('lat', latLines[i]));
		}

		var lngLines = this._lngLines();
		for (i in lngLines) {
			grid.push(this._verticalLine(lngLines[i]));
			grid.push(this._label('lng', lngLines[i]));
		}

		this.eachLayer(this.removeLayer, this);

		for (i in grid) {
			this.addLayer(grid[i]);
		}
		return this;
	},

	_latLines: function () {
		return this._lines(
			this._bounds.getSouth(),
			this._bounds.getNorth(),
			this.options.yticks * 2,
			this._containsEquator()
		);
	},
	_lngLines: function () {
		return this._lines(
			this._bounds.getWest(),
			this._bounds.getEast(),
			this.options.xticks * 2,
			this._containsIRM()
		);
	},

	_lines: function (low, high, ticks, containsZero) {
		var delta = low - high,
			tick = this._round(delta / ticks, delta);

		if (containsZero) {
			low = Math.floor(low / tick) * tick;
		} else {
			low = this._snap(low, tick);
		}

		var lines = [];
		for (var i = -1; i <= ticks; i++) {
			lines.push(low - (i * tick));
		}
		return lines;
	},

	_containsEquator: function () {
		var bounds = this._map.getBounds();
		return bounds.getSouth() < 0 && bounds.getNorth() > 0;
	},

	_containsIRM: function () {
		var bounds = this._map.getBounds();
		return bounds.getWest() < 0 && bounds.getEast() > 0;
	},

	_verticalLine: function (lng) {
		return new L.Polyline([
			[this._bounds.getNorth(), lng],
			[this._bounds.getSouth(), lng]
		], this.options.lineStyle);
	},
	_horizontalLine: function (lat) {
		return new L.Polyline([
			[lat, this._bounds.getWest()],
			[lat, this._bounds.getEast()]
		], this.options.lineStyle);
	},

	_snap: function (num, gridSize) {
		return Math.floor(num / gridSize) * gridSize;
	},

	_round: function (num, delta) {
		var ret;

		delta = Math.abs(delta);
		if (delta >= 1) {
			if (Math.abs(num) > 1) {
				ret = Math.round(num);
			} else {
				ret = (num < 0) ? Math.floor(num) : Math.ceil(num);
			}
		} else {
			var dms = this._dec2dms(delta);
			if (dms.min >= 1) {
				ret = Math.ceil(dms.min) * 60;
			} else {
				ret = Math.ceil(dms.minDec * 60);
			}
		}

		return ret;
	},

	_label: function (axis, num) {
		var latlng;
		var bounds = this._map.getBounds().pad(-0.005);

		if (axis == 'lng') {
			latlng = L.latLng(bounds.getNorth(), num);
		} else {
			latlng = L.latLng(num, bounds.getWest());
		}

		return L.marker(latlng, {
			icon: L.divIcon({
				iconSize: [0, 0],
				className: 'leaflet-grid-label',
				html: '<div class="' + axis + '">' + this.formatCoord(num, axis) + '</div>'
			})
		});
	},

	_dec2dms: function (num) {
		var deg = Math.floor(num);
		var min = ((num - deg) * 60);
		var sec = Math.floor((min - Math.floor(min)) * 60);
		return {
			deg: deg,
			degAbs: Math.abs(deg),
			min: Math.floor(min),
			minDec: min,
			sec: sec
		};
	},

	formatCoord: function (num, axis, style) {
		if (!style) {
			style = this.options.coordStyle;
		}
		if (style == 'decimal') {
			var digits;
			if (num >= 10) {
				digits = 2;
			} else if (num >= 1) {
				digits = 3;
			} else {
				digits = 4;
			}
			return num.toFixed(digits);
		} else {
			// Calculate some values to allow flexible templating
			var dms = this._dec2dms(num);

			var dir;
			if (dms.deg === 0) {
				dir = '&nbsp;';
			} else {
				if (axis == 'lat') {
					dir = (dms.deg > 0 ? 'N' : 'S');
				} else {
					dir = (dms.deg > 0 ? 'E' : 'W');
				}
			}

			return L.Util.template(
				this.options.coordTemplates[style],
				L.Util.extend(dms, {
					dir: dir,
					minDec: Math.round(dms.minDec, 2)
				})
			);
		}
	}

});

L.grid = function (options) {
	return new L.Grid(options);
};

L.grid().addTo(map);
//This is the ajax request for the jobs data
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

map.on('click', onMapClick);
