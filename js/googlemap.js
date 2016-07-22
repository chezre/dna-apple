function GoogleMap(){
 
this.initialize = function(){
var map = showMap();
}
 
 var showMap = function(){
var mapOptions = {
zoom: 4,
center: new google.maps.LatLng(-33, 151),
mapTypeId: google.maps.MapTypeId.ROADMAP
}
 
var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
 
return map;
}
}
/*src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.5297539230523!2d18.487144605795205!3d-34.05593181058398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0000000000000000%3A0x6c1810665cc222e3!2sHis+People+Church!5e0!3m2!1sen!2sza!4v1455715135534"*/