let pw = window.innerWidth;       //find the width of the window
let ph = window.innerHeight;      //find the height of the window
let w = 1280;                     //define w as 1280
let h = 720;                      //define h as 720
var valPlaceName = [];            //defined as array
let locate = [];                  //defined as array
var lat;                          //defined as int
var long;                         //defined as int
let googKey = "AIzaSyBLoxdO0e5DvrIWP-DBxpECB00k3ndUNUs"; //api key from google which is used to take place names and return them as latlong coordinates defined as string
var locationData;                 //defined as string

function preload() {}

function setup() {
  lat = locate.results["0"].geometry.location.lat; //lat equals latidute data extracted from api
  long = locate.results["0"].geometry.location.lng; //long equals latidute data extracted from api
  locationData = locater();       //locatonData equals city entered
  console.log(locationData);      //log city name
  window.location.href="weather.html?"+locationData+"+"+lat+"+"+long; //redirect to new page with city name, longitude and latitude in the url
}

function draw() {}

window.onload = function() {cssSort()}; //run function on page load

function cssSort() {
  document.getElementById("container").style.marginTop = ph/2-60+"px"; //place text box central in the page vertically
  document.getElementById("container").style.marginLeft = pw/2-100+"px"; //place text box central in the page horizontally
}

function formChanged() {
valPlaceName = document.getElementsByName("search")[0].value; //when a key is lifted up the character is added to this string (it is called from the html form)
}

function locater() {              // function is ran when button is pressed
  var entryCitytemp = valPlaceName; //entryCitytemp equals all keys entered to this point
  let locateurl = "https://maps.googleapis.com/maps/api/geocode/json?address="+entryCitytemp+"&key="+googKey; //url for the json file using api key and entered city
  locate = loadJSON(locateurl);   //load api key into array "locate" using p5 function loadJSON
  console.log(locate);            //log api array
  return entryCitytemp;           //return value of the city entered
}
