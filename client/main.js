const SERVER_URL = "http://localhost:3000/";
const SUCCESS = 100;

var map = null,
	marker = null;

var LOCATION_DATA = null;

function showMap(ev) {
	var idx = $(ev.target).data("idx");
	var locData = LOCATION_DATA[idx];
	if (locData) {
		var latAndLng = {
			lat: (locData.lat) ? parseFloat(locData.lat) : DEFAULT_LAT,
			lng: (locData.lng) ? parseFloat(locData.lng) : DEFAULT_LNG,
			alt: 0
		};

		// show map view.
		$("#map-canvas").attr("class", "");
		redrawMap(latAndLng);

		// Show details.
		$("#map-canvas .details .zipcode").text(locData.zipcode ? locData.zipcode : "-NA-");
		$("#map-canvas .details .address").text(locData.address ? locData.address : "-NA-");
		$("#map-canvas .details .lat").text(locData.lat ? locData.lat : "-NA-");
		$("#map-canvas .details .lng").text(locData.lng ? locData.lng : "-NA-");
	}
}
function initMap() {
	var uluru = {lat: -25.363, lng: 131.044};
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 8,
		center: uluru
	});
	marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
}
function redrawMap(data) {
	map.setCenter(data);
	marker.setPosition(data);
}
function closeMapCanvas(ev) {
	// hide map view.
	$("#map-canvas").attr("class", "hide");
}
function showLocations() {
	var domNode = $("#info table tbody"),
		eachData = null,
		rows = [],
		eachRow = [];

	// Clear error msg.
	$("#info .errormsg").text("");

	for(var i = 0; i < LOCATION_DATA.length; i++) {
		eachData = LOCATION_DATA[i];
		eachRow = [];

		eachRow.push(
			$("<td>" + (i + 1) + "</td>"),
			$("<td>" + (eachData.zipcode) + "</td>"),
			$("<td>" + (eachData.address) + "</td>"),
			$("<td>" + (eachData.lat) + "</td>"),
			$("<td>" + (eachData.lng) + "</td>"),
			$("<td></td>").append($("<button onclick='showMap(event)'>View</button>").attr("data-idx", i))
		);
		rows.push($("<tr></tr>").append(eachRow));
	}
	// Attach new dom nodes.
	if (rows.length) {
		// remove empty table msg.
		$("#info table tbody tr.empty").remove();

		domNode.append(rows);
	}
}
function showErrorMsg(dom, msg) {
	dom.text(msg);
}
function onSubmit(ev) {
	ev.preventDefault();

	// Get pincode from input element.
	var zipcode = document.getElementById("zipcode").value;

	if (zipcode) {
		// Start loader.
		$("#info .loader").attr("class", "loader");

		$.get(SERVER_URL + zipcode)
			.done(function(data) {
				// Stop loader
				$("#info .loader").attr("class", "loader hide");

				var errorDom = $("#info .errormsg");
				if (data) {
					if (data.status_code === SUCCESS) {
						LOCATION_DATA = data.results;
						showLocations();
					} else {
						LOCATION_DATA = (data.results) ? data.results : [];
						showErrorMsg(errorDom, data.status_message);

						// remove old table data.
						$("#info table tbody tr:not(.empty)").remove();

						var emptyClass = $("#info table tbody tr.empty");
						if (emptyClass.length <= 0) {
							emptyClass = $("<tr></tr>").attr("class", "empty").append($("<td>--Table is empty--</td>").attr("colspan", 6));
							$("#info table tbody").append(emptyClass);
						}
					}
				} else {
					var errorDom = $("#api-errormsg");
					errorDom.toggleClass("hide", "");
				}
			})
			.fail(function(error) {
				// Stop loader
				$("#info .loader").attr("class", "loader hide");

				var errorDom = $("#api-errormsg");
				errorDom.toggleClass("hide", "");
			});
	} else {
		$("#inputform .errormsg").text("Please enter zipcode to continue");
	}

	return false;
}

