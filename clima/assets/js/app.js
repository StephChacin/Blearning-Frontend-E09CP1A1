//Key 672f16dfe7b612d7ec7b2324a0f42f5b
// Key AIzaSyB-svB6NV1SeLZ3pdzrdrClQN2Q-5mCNFI

const coordenadas = {

	santiago: {lat: -33.4375545, lng: -70.65048960000001},
	arica: {lat: -18.4782534, lng: -70.31259879999999},
	pascua: {lat: -27.112723, lng: -109.34968650000002}
}


/*const weather = {
  'partly-cloudy-night': 'wi-night-partly-cloudy',
	'clear-night': 'wi-night-clear'
}*/

var image = {
    'clear-day':'https://icons.wxug.com/i/c/v4/clear.svg',
    'clear-night':'https://icons.wxug.com/i/c/v4/nt_clear.svg',
    'partly-cloudy-day':'https://icons.wxug.com/i/c/v4/partlycloudy.svg',
    'partly-cloudy-night':'https://icons.wxug.com/i/c/v4/nt_hazy.svg',
    'cloudy':'https://icons.wxug.com/i/c/v4/cloudy.svg',
    'rain':'https://icons.wxug.com/i/c/v4/rain.svg'
  }


var map, marker; 
function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		center: { lat: coordenadas.santiago.lat, lng: coordenadas.santiago.lng },
		zoom:8
	});

	marker = new google.maps.Marker({
		position: coordenadas.santiago,
		map: map
	});
} 


function setMap(location) {

  var cors = 'https://cors-anywhere.herokuapp.com/';
  var api_key = 'cfc3cbbf50d657838c62bfc7017c91fb';
  var params = ['exclude=[minutely,hourly,daily,alerts,flags]', 'lang=es', 'units=auto']

$.ajax({
	
	url: cors + 'https://api.darksky.net/forecast/'+ api_key +'/' + location.lat + ',' + location.lng + '?' + params[0] + '&' + params[1] + '&' + params[2],
	method:'GET',
	//.done
	}).done(function(data){
		console.log(data);
		
		map = new google.maps.Map(document.getElementById("map"),{
			center: location,
			zoom:8
		});

		marker = new google.maps.Marker({
		position: location,
		map: map
	});

    $('h3.resume').text(data.currently.temperature + 'º ' + data.currently.summary);
	$(".icon img").attr("src", image[data.currently.icon])
	
	});
	//$('.img-responsive').attr('src',image[data.currently.icon]);
}

$(function(){

	$("#locations").on("change", function(event){
		setMap(coordenadas[$(this).val()])

	});
});