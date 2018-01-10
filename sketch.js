//http://api.openweathermap.org
window.onload = function() {round3();randomizer();cssSort();getCity();};

let apiKey = "738d7e097f954932b23172144172912";
let weather = [];
let marine = [];
let timeRound;
let tidePer=0.8;
var x=0;
var y=0;
var tideH;
var randCountx = [];
var randCounty = [];
var loc = [];
var loc2 = [];
let ParticleArray = [];
let particleAmount = 1000;
let calTempR;
let calTempB;
var entryCity = [];
entryCity = getCity();
var calcRoundDir;
var degRounded = [];

function preload() {
  let marineurl = "http://api.worldweatheronline.com/premium/v1/marine.ashx?key="+apiKey+"&q="+entryCity[1]+","+entryCity[2]+"&format=json";
  marine = loadJSON(marineurl);

  //img = loadImage("content/icon/113.png");
}

function setup() {

  console.log(entryCity);
  console.log(weather);
  console.log(marine);
  console.log(timeRound);

  document.getElementById("cityText").innerHTML = entryCity[0];
  document.getElementById("longlatText").innerHTML = entryCity[1]+"°N, "+entryCity[2]+"°E ";
  var desc = marine.data.weather["0"].hourly[timeRound].weatherDesc["0"].value;
  document.getElementById("descText").innerHTML = desc;
  console.log(desc);
  //console.log(lat2);
  var canvas = createCanvas(w, tideH);
  canvas.parent('sketch-holder');
  textSize(18);
  background(240,255,255);
  noStroke();
  frameRate();
  setVaribles();
  calculateValues();
  for (let i=0; i<particleAmount; i++){
    ParticleArray[i] = new Particle(random(width), random(height), degRounded[0]*calcSpeed, degRounded[1]*calcSpeed, 25);
  }
}

function draw() {
  background(calcCloud,255,255);
  if (x>w){x=0;y=0}
  else if (y>tideH){x=0;y=0};
  if (x<0){x=0;y=0}
  else if (y<0){x=0;y=0};
  x=x+calcSpeed;
  y=y+calcSpeed;

  push();
  for (let i=0; i<100; i++){
    ParticleArray[i].moveFunction();
    ParticleArray[i].displayParticle();
  }
  pop();

}

function round3() {
  var hourCount;
  var d = new Date(); // for now
  hourCount=d.getHours(); // => 9
  var n = hourCount;
  n = Math.ceil(n/3) * 3;
  if (n>21) {n =0;}
  timeRound = n/3;
}

function round45(x) {
  var degCount;
  degCount=x; // => 9
  var m = degCount;
  m = Math.round(m/45) * 45;
  degRound = m;
  if (degRound > 315) {degRound = 0}
  return degRound;
}

function randomizer() {
  tideH= (h*tidePer)+80;
  for (var i=0;i<1600;i++){
    randCountx[i] = random(-2000,w);
  }
  for (var j=0;j<1600;j++){
    randCounty[j] = random(-1500,tideH)
  }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getCity() {
  loc = window.location.search.split('?')[1]; //extract everything after "?" from the url
  loc2 = loc.split('+'); //extract everything as elements of an array seperated by "+"
  loc2[0] = capitalizeFirstLetter(loc2[0]); // capitalizes the first letter
  loc2[0] = loc2[0].replace(/%20/g, " "); //here I am using regex to replace html code %20 with a space
  loc2[0] = loc2[0].replace(/\,.*/g, " ") //using regex to remove everthing after the comma in case they also enter a country
  return(loc2); //returns the three different values in the array loc2
}

function setVaribles() {
  valTime = marine.data.weather["0"].hourly[timeRound].time; //assigns value of "time"
  valTemp = marine.data.weather["0"].hourly[timeRound].waterTemp_C;
  valCloud = marine.data.weather["0"].hourly[timeRound].cloudcover;
  valSpeed = marine.data.weather["0"].hourly[timeRound].windspeedMiles;
  valDirection = marine.data.weather["0"].hourly[timeRound].winddirDegree;
  valSwell = marine.data.weather["0"].hourly[timeRound].swellHeight_m;
  valCode = marine.data.weather["0"].hourly[timeRound].weatherCode;
}

function calculateValues() {
  //temperature
  var subTemper = valTemp-10;
  calTempR = subTemper*21.25;
  calTempB = 255-calTempR;
  //wind direction
  console.log(valDirection);
  calcRoundDir = round45(valDirection);
  console.log(calcRoundDir);
  switch (calcRoundDir) {
    case 0: degRounded = [0,-1]; break;
    case 45: degRounded = [1,-1]; break;
    case 90: degRounded = [1,0]; break;
    case 135: degRounded = [1,1]; break;
    case 180: degRounded = [0,1]; break;
    case 225: degRounded = [-1,1]; break;
    case 270: degRounded = [-1,0];break;
    case 315:degRounded = [-1,-1];break;
  }
  console.log(degRounded);
  //windspeedMiles
  calcSpeed = valSpeed/4;
  //cloud cover
  calcCloud = parseInt(valCloud)+150;
  //swell height
  calcSwell = valSwell*10;
  if (calcSwell>80) {calcSwell=80};
  finalcalcSwell = 80-calcSwell;
  var tideHgap = (h-(tideH+60))+finalcalcSwell;
  document.getElementById("everything").style.marginTop =tideHgap+"px";
  document.getElementById("waves").style.marginTop = tideHgap-25+"px";
  //image code
  document.getElementById('codeImg').src = "content/icons/"+valCode+".png";
}

function cssSort() {
  if (w>2000) {document.getElementById("waves").style.width = w+"px";}
  else {document.getElementById("waves").style.width = 2000+"px";};
  //document.getElementById("everything").style.marginLeft = (pw/2)-(w/2)+"px";
}


class Particle{
  constructor(x, y, speedX, speedY, size){
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.size = size;

    this.rd = calTempR;
    this.grn = 0;
    this.bl = calTempB;
    this.a = 200;
  }

  moveFunction(){
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;

    if (this.x > width){
      this.x = 0;
    }
    if (this.y > (height)){
      this.y = 0;
    }
    if (this.x<0){
      this.x = width;
    }
    if (this.y<0){
      this.y = height;
    }
  }

  displayParticle(){
    noStroke();
    this.fillcol = color(this.rd, this.grn, this.bl, this.a)
    fill(this.fillcol);
    ellipse(this.x, this.y, this.size, this.size);
    //image(img,this.x, this.y, this.size, this.size);
    /*rectMode(RADIUS);
    fill(this.rd,this.grn,this.bl,100);
    ellipse(this.x, this.y, this.size+20, this.size+20);*/
  }
}
