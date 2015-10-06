var jsonURL = "http://api.wunderground.com/api/618da5c049f5f728/conditions/q/NY/New%20York.json";

var loadWeather = function(response) {
	
	if(response.response.error){
		alert(response.response.error.description);
		return;
	};
	
	var humidity = response.current_observation.relative_humidity;

	var hue = map_range(parseFloat(humidity), 40, 80, 0, 360);

	if (hue > 360) { hue = 360; }
	else if (hue < 0) { hue = 0; }

	var myColor = 'hsl('+ hue +', 50%, 95%)';

	console.log(myColor);

	$('body').animate({ backgroundColor: myColor }, 1000 );;
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

var getWeather = function () {

	$.ajax({
		url : jsonURL,
		dataType : "jsonp",
		success : function(response){
			loadWeather(response);	
		}
	});

}

var init = function () {
	getWeather();
}

$( document ).ready(function(){
	
	init();
	
});