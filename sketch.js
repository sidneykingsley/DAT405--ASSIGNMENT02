window.onload = function() {round3();cssSort();getCity();}; //this command makes sure these functions run on page refresh/load

let apiKey = "738d7e097f954932b23172144172912"; //this is my key aquired from www.worldweatheronline.com
let weather = [];                               //varible set as array
let marine = [];                                //varible set as array
let timeRound;                                  //varible set as int
let tidePer=0.8;                                //varible set as real
var x=0;                                        //varible set as int
var y=0;                                        //varible set as int
var tideH = (h*tidePer)+80;                     //varible set as int value
var loc = [];                                   //varible set as array
var loc2 = [];                                  //varible set as array
let ParticleArray = [];                         //varible set as array
let particleAmount = 1000;                      //varible set as int
let calTempR;                                   //varible set as int
let calTempB;                                   //varible set as int
var entryCity = [];                             //varible set as array
entryCity = getCity();                          //entryCity equals array returned from function
var calcRoundDir;                               //varible set as int
var degRounded = [];                            //varible set as array

function preload() {                            //preloading function
  let marineurl = "http://api.worldweatheronline.com/premium/v1/marine.ashx?key="+apiKey+"&q="+entryCity[1]+","+entryCity[2]+"&format=json"; //constructing my url from my api key and coordinates strored in the array "entryCity"
  marine = loadJSON(marineurl);                 //using p5 libraries to load the json file into an array
}

function setup() {
  console.log(entryCity);                       //log city name and lat+long coordinates extracted from the href url of the page using function getCity();
  console.log(marine);                          //log array of data extracted from json file
  console.log(timeRound);                       //log the time rounded to the nearest third hour and then numbered from 0 to 7
  document.getElementById("cityText").innerHTML = entryCity[0]; //change the html text tag with the id of cityText to the first string in the array
  document.getElementById("longlatText").innerHTML = entryCity[1]+"°N, "+entryCity[2]+"°E "; //change the html text tag with the id of longlatText to the second and third strings of the array
  var desc = marine.data.weather["0"].hourly[timeRound].weatherDesc["0"].value; //set the value of desc to "weather description" taken out of json file with regard to correct date and time (using timeRound)
  document.getElementById("descText").innerHTML = desc; //change the html text tag with the id of descText to the value of desc
  var canvas = createCanvas(w, tideH);          //create the canvas with the preset width of 1280px and the height variable upon how large the swell is
  canvas.parent('sketch-holder');               //this means that I can use the canvas as a html element
  textSize(18);
  background(240,255,255);
  noStroke();
  frameRate();
  setVaribles();                                //this calls the function which extracts relevant information from the json file and assigns it to different varibles
  calculateValues();                            //this calls the function which turns all of that information into useful directly proportional formats to manipulate elements such as color values or persentages etc..
  for (let i=0; i<particleAmount; i++){
    ParticleArray[i] = new Particle(random(width), random(height), degRounded[0]*calcSpeed, degRounded[1]*calcSpeed, 25); //calling the object function and giving it values to create my particles
  }
  img = loadImage("content/icons/"+valCode+".png"); //assigning the value of the icons floating inside my particles dependant on which weather code is currently extracted from the json file (json file will be written from now on simply as API)
}

function draw() {
  background(calcCloud,255,255);                //background is assigned a value dependant upon the cloud cover value extracted from the api and then asjusted to the range of 0 to 255 by the function calculateValues
  for (let i=0; i<100; i++){                    //for loop repeats 100 times
    ParticleArray[i].moveFunction();            //calls function which moves objects
    ParticleArray[i].displayParticle();         //calls function which displays objects
  }
}

function round3() {                             //this function turns current hour of the day into an integer between 0-7 e.g. 1700(5pm) would be rounded up to 18 and then divided by 3 to become 6
  var hourCount;
  var d = new Date();                           //sets d as current date and time from computer
  hourCount=d.getHours();                       //sets hourCount to the extracted hour from d
  var n = hourCount;                            //n equals hourCount
  n = Math.ceil(n/3) * 3;                       //rounds n up to nearst multiple of three using math.ceil (math.round would round up or down but I only wanted it to round upwards)
  if (n>21) {n =0;}                             //if n is greater than 21 (after 9pm) set to 0
  timeRound = n/3;                              //change from everythird hour to a value between 0-7 e.g. 6am would become 3
}

function round45(x) {                           //this function rounds a value between 0-360 up or down to the nearest 45 e.g. turns degrees into compass directions
  var degCount=x;                               //deg equals value used when function is called
  var m = degCount;                             //m equals degCount
  m = Math.round(m/45) * 45;                    //m is rounded up or down to the nearest multiple of 45
  degRound = m;                                 //degRound = m
  if (degRound > 315) {degRound = 0};           //if degRound is more than 315 (north west) then it is set to 0 (north)
  return degRound;                              //return value degRound
}

function capitalizeFirstLetter(string) {        //capitalizes the first letter of a string
    return string.charAt(0).toUpperCase() + string.slice(1); //takes character 0 of a string and capitalizes it and then adds the rest of the string back to it
}

function getCity() {
  loc = window.location.search.split('?')[1];   //extract everything after "?" from the url
  loc2 = loc.split('+');                        //extract everything as elements of an array seperated by "+"
  loc2[0] = capitalizeFirstLetter(loc2[0]);     //capitalizes the first letter
  loc2[0] = loc2[0].replace(/%20/g, " ");       //here I am using regex to replace html code %20 with a space
  loc2[0] = loc2[0].replace(/\,.*/g, " ")       //using regex to remove everthing after the comma in case they also enter a country
  var s = loc2[0];                                                                      // capitalizes second word by finding the charcter after the space ⏎
  var modified = s.replace(/\s(.?)/g, function(match) {return match.toUpperCase();});   // with regex and capitalising it using a built the javascript ⏎
  loc2[0] = modified;                                                                   // function "toUpperCase"
  return(loc2);                                 //returns the three different values in the array loc2
}

function setVaribles() {
  valTime = marine.data.weather["0"].hourly[timeRound].time;                //assigns value of "time" from api to variable dependant upon current hour
  valTemp = marine.data.weather["0"].hourly[timeRound].waterTemp_C;         //assigns value of "waterTemp_C" from api to variable dependant upon current hour
  valCloud = marine.data.weather["0"].hourly[timeRound].cloudcover;         //assigns value of "cloudcover" from api to variable dependant upon current hour
  valSpeed = marine.data.weather["0"].hourly[timeRound].windspeedMiles;     //assigns value of "windspeedMiles" from api to variable dependant upon current hour
  valDirection = marine.data.weather["0"].hourly[timeRound].winddirDegree;  //assigns value of "winddirDegree" from api to variable dependant upon current hour
  valSwell = marine.data.weather["0"].hourly[timeRound].swellHeight_m;      //assigns value of "swellHeight_m" from api to variable dependant upon current hour
  valCode = marine.data.weather["0"].hourly[timeRound].weatherCode;         //assigns value of "weatherCode" from api to variable dependant upon current hour
}

function calculateValues() {
  //temperature
  var subTemper = valTemp-10;                   //set variable to extracted temperature value minus 10 as I am not interested in representing temperatures bellow 10 degreesC as they are not common
  calTempR = subTemper*21.25;                   //multiply by 21.25 to get a value between 0-255 which will increase as temperature increases
  calTempB = 255-calTempR;                      //255 minus value between 0-255 so that blue will decrease as temperature increases
  //wind direction
  calcRoundDir = round45(valDirection);         //set varible as wind direction extracted from api rounded to nearest compass point
  switch (calcRoundDir) {
    case 0: degRounded = [0,-1]; break;         //if calcRoundDir = 0 then the array degRounded equals [0,-1]
    case 45: degRounded = [1,-1]; break;        //if calcRoundDir = 45 then the array degRounded equals [1,-1]
    case 90: degRounded = [1,0]; break;         //etc..
    case 135: degRounded = [1,1]; break;
    case 180: degRounded = [0,1]; break;
    case 225: degRounded = [-1,1]; break;
    case 270: degRounded = [-1,0];break;
    case 315:degRounded = [-1,-1];break;        //the array degRounded will be used to set the direction the particles move
  }
  //windspeedMiles
  calcSpeed = valSpeed/4;                       //varible equals wind speed extracted divided by 4 (this will be used to ajust speed of particles)
  //cloud cover
  calcCloud = parseInt(valCloud)+150;           //sets varible as cloudcover value + 150 (this means the blue can't get too intense as that would hide the particles)
  //swell height
  calcSwell = valSwell*10;                      //sets varible as swell height multiplied by 10
  if (calcSwell>80) {calcSwell=80};             //if the swell is greater than 80 (the amount of extra canvas size applied at "var tideH") then calcSwell = 80
  finalcalcSwell = 80-calcSwell;                //finalcalcSwell equals 80 minus calcSwell
  var tideHgap = (h-(tideH+60))+finalcalcSwell; //this sets how far down the canvas is from the top using the swell data
  document.getElementById("sketchstyle").style.marginTop =tideHgap+"px"; //this actually sets the distance in the html using css
  document.getElementById("waves").style.marginTop = tideHgap-25+"px";  //this sets the distance for the wave image which overlays the top of the canvas
  //image code
  document.getElementById('codeImg').src = "content/icons/"+valCode+".png"; //this sets the value of the image displayed next to the text as one of my hand made vectors depending on the weatherCode provided
}

function cssSort() {
  document.getElementById("waves").style.width = w+"px"; //sets the width of waves image to the canvas
  document.getElementById("everything").style.marginLeft = (pw/2)-(w/2)+"px"; //centers all the elements using css
  document.getElementById("everything").style.height = ph+"px"; //makes div the size of the page
}


class Particle{
  constructor(x, y, speedX, speedY, size){      //brings in values set in setup
    this.x = x;                                 //set Particle.x to x coordinate defined in set up
    this.y = y;                                 //set to value defined in set up
    this.speedX = speedX;                       //etc..
    this.speedY = speedY;                       //etc..
    this.size = size;                           //etc..

    this.rd = calTempR;                         //set red to value set in calculateValues
    this.grn = 0;                               //set green to 0
    this.bl = calTempB;                         //set blue to value set in calculateValues
    this.a = 200;                               //set alpha to 200
  }

  moveFunction(){
    this.x = this.x + this.speedX;              //increment x location (gives impression of movement)
    this.y = this.y + this.speedY;              //increment y location

    if (this.x > width){
      this.x = 0;                               //if x greater than width x = 0
    }
    if (this.y > tideH){
      this.y = 0;                               //if y greater than height y = 0
    }
    if (this.x<0){
      this.x = width;                           //if x less than width x = width
    }
    if (this.y<0){
      this.y = tideH;                          //if y less than width y = height
    }
  }

  displayParticle(){
    noStroke();
    fill(this.rd,this.grn,this.bl,80);         //set color of ellipses (dependant upon water temperature)
    ellipseMode(CORNER);                       //change the ellipse from translating from the center to the top left corner (so that it lines up behind the icons)
    image(img,this.x, this.y, this.size, this.size); //setting image using values set in class Particle
    translate(-5,-5)                           //translates the ellipse to center of icon
    ellipse(this.x, this.y, this.size+10, this.size+10); //sets ellipsewith the same values as the image but slightly bigger
  }
}
