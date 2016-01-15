var map;

$( document ).ready(function() {
	initializeMap();
	addAllProjects();
});



function onRegisterBtnClicked() {
	$.post( 
		"/api/project", 
		$("#registerForm").serialize(), 
		function( data ) {
			console.log( data );
		}
	);
}

function addAllProjects(){
	$.get( 
		"/api/projects/autogestival", 
		function( data ) {
			console.log(data);
			data.forEach(function(project){
				if (project.latitutde){ 
					var marker = L.marker([project.latitutde, project.longitude]);
					marker.bindPopup('<a href="/project/'+project._id+'">'+project.name+'</a>', {
		            	showOnMouseOver: true
		        	});
					map.addLayer(marker);
				}
			})
		}
	);
	map.on('click', function (e) {
		var marker = L.marker([e.latlng.lat, e.latlng.lng]);
		marker.bindPopup($("input[name=name]")[0].value, {
		            	showOnMouseOver: true
		        	});
        map.addLayer(marker);
        $("#hdnInputLat").val(e.latlng.lat);
        $("#hdnInputLng").val(e.latlng.lng);
	});
}

function initializeMap(){
	map = L.map('map').setView([19.34, -99.15], 12);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18,
	    id: 'ralexrdz.nnh64i75',
	    accessToken: 'pk.eyJ1IjoicmFsZXhyZHoiLCJhIjoiY2lmdHB2aGo2MTZ4MnQ1bHkzeDJyaDMzNyJ9.UHhEm9gA1_uwAztXjb7iTQ'
	}).addTo(map);
}
