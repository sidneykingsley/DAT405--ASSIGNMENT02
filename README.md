# DAT405--ASSIGNMENT02
This is for my second DAT405 assignment. Due in 12/01/2018

DEVELOPMENT:
First, I started by exploring things that I was interested and I presumed would have data stored about them. I ended up 
thinking about a sport I enjoy; sailing, and how dependant that is upon the sea. I started researching data sets about 
the sea and found some APIs that were a reliable source of marine weather. I then created a flow chart of what I wanted 
my data visualisation program to do. I found an API that provided all this information apart from tide height, I had to 
use swell height instead (still useful to sailing but not as critical). I then set about creating a form which could 
record an inputted city name and found a google API which would translate it into coordinates (as my marine weather API 
relied upon longitude and latitude). Once that was set into place I had to find a way of finding the current time and 
splitting it into 8 separate parts so I could use the dataset relevant for the current time. To do this is used math.ceil 
(to round up) and division. Once I had done this I created my particles and manipulated the rest of the data inputs so 
that it was always within the desired range and proportion for each different element that it controlled. E.g. changing 
wind direction into 45 degree points and then creating a case statement to give different speeds to my particle objects 
dependant on where the wind was coming from. I also made 50 different icons in Adobe Photoshop to represent every different 
weather code.

INSTRUCTIONS:
To find the information for the location enter your city, town etc. name and then press the search button. If the 
longitude/latitude or information looks incorrect it could be because there are two places with the same name e.g. 
Plymouth, UK and Plymouth, US. If this happens enter a comma after your city name with the name or initials of your country.
