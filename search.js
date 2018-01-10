//http://api.openweathermap.org
let w = window.innerWidth;
let h = window.innerHeight;
let pw = 1280;
let ph = 720;
var mushroom = [];
let locate = [];
var lat;
var long;
let googKey = "AIzaSyBLoxdO0e5DvrIWP-DBxpECB00k3ndUNUs";
var locationData;

function preload() {

}
function setup() {
  lat = locate.results["0"].geometry.location.lat;
  long =locate.results["0"].geometry.location.lng;
  locationData = locater();
  console.log(locationData);
  window.location.href="weather.html?"+locationData+"+"+lat+"+"+long;

}
function draw() {}

window.onload = function() {cssSort()};
function cssSort() {
  document.getElementById("container").style.marginTop = h/2-60+"px";
  document.getElementById("container").style.marginLeft = w/2-100+"px";
  longlat = [lat,long];
}

function formChanged() {
mushroom = document.getElementsByName("search")[0].value;

}

function locater() {
  console.log(mushroom);
  var entryCitytemp = mushroom;
  let locateurl = "https://maps.googleapis.com/maps/api/geocode/json?address="+entryCitytemp+"&key="+googKey;
  locate = loadJSON(locateurl);
  console.log(locate);
  console.log("entrycity = "+entryCitytemp);
  return entryCitytemp;
}
