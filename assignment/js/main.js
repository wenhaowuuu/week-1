var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 12
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);
+ L.marker([39.961880, -75.198591]).addTo(map).bindPopup("my home!");
+ L.marker([39.952223, -75.192646]).addTo(map).bindPopup("my School!");
+ L.marker([39.955689, -75.156781]).addTo(map).bindPopup("my favorite restaurant!");

// var makeMarkers = function(array){
//   return _.map(array,function(item){
//     return L.marker([item[0],item[1]]).addTo(map);
//   })
// };

// $(document).ready(function(){
//     console.log("ready1");
//     // makeMarkers(restdata);
//     console.log("function run");
//   });


//////canvas/////////
var circles = [],
    canvas = document.getElementById("canvas1"),
    context = canvas.getContext("2d"),

    // SETTINGS
    opacity = 0.6,                                      // the opacity of the circles 0 to 1
    colors = ['rgba(34, 49, 63,' + opacity + ')',       // an array of rgb colors for the circles
              'rgba(189, 195, 199,' + opacity + ')',
              'rgba(241, 196, 15,' + opacity + ')',
              'rgba(231, 76, 60,' + opacity + ')',
              'rgba(231, 76, 60,' + opacity + ')'
             ],
    minSize = 1,                                        // the minimum size of the circles in px
    maxSize = 10,                                       // the maximum size of the circles in px
    numCircles = 300,                                   // the number of circles
    minSpeed = -2,                                     // the minimum speed, recommended: -maxspeed
    maxSpeed = 2,                                    // the maximum speed of the circles
    expandState = true;                                      // the direction of expansion

function buildArray() {
    'use strict';

    for (var i =0; i < numCircles ; i++){
        var color = Math.floor(Math.random() * (colors.length - 1 + 1)) + 1,
            left = Math.floor(Math.random() * (canvas.width - 0 + 1)) + 0,
            top = Math.floor(Math.random() * (canvas.height - 0 + 1)) + 0,
            size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize,
            leftSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed)/10,
            topSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed)/10,
            expandState = expandState;

            while(leftSpeed == 0 || topSpeed == 0){
                leftSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed)/10,
                topSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed)/10;
            }
        var circle = {color:color, left:left, top:top, size:size, leftSpeed:leftSpeed, topSpeed:topSpeed, expandState:expandState };
        circles.push(circle);
    }
}

function build(){
    'use strict';

    for(var h = 0; h < circles.length; h++){
        var curCircle = circles[h];
        context.fillStyle = colors[curCircle.color-1];
        context.beginPath();
        if(curCircle.left > canvas.width+curCircle.size){
            curCircle.left = 0-curCircle.size;
            context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
        }else if(curCircle.left < 0-curCircle.size){
            curCircle.left = canvas.width+curCircle.size;
            context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
        }else{
            curCircle.left = curCircle.left+curCircle.leftSpeed;
            context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
        }

        if(curCircle.top > canvas.height+curCircle.size){
            curCircle.top = 0-curCircle.size;
            context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);

        }else if(curCircle.top < 0-curCircle.size){
            curCircle.top = canvas.height+curCircle.size;
            context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
        }else{
            curCircle.top = curCircle.top+curCircle.topSpeed;
            if(curCircle.size != maxSize && curCircle.size != minSize && curCircle.expandState == false){
              curCircle.size = curCircle.size-0.1;
            }
            else if(curCircle.size != maxSize && curCircle.size != minSize && curCircle.expandState == true){
              curCircle.size = curCircle.size+0.1;
            }
            else if(curCircle.size == maxSize && curCircle.expandState == true){
              curCircle.expandState = false;
              curCircle.size = curCircle.size-0.1;
            }
            else if(curCircle.size == minSize && curCircle.expandState == false){
              curCircle.expandState = true;
              curCircle.size = curCircle.size+0.1;
            }
            context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
        }

        context.closePath();
        context.fill();
        context.ellipse;
    }
}


var xVal = 0;

window.requestAnimFrame = (function (callback) {
    'use strict';
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000/60);
    };
})();

function animate() {
    'use strict';
    var canvas = document.getElementById("canvas1"),
        context = canvas.getContext("2d");

    // clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);


    // draw the next frame
    xVal++;
    build();

    //console.log("Prep: animate ==> requestAnimFrame");
    // request a new frame
    requestAnimFrame(function () {
        animate();
    });
}
window.onload = function () {
    'use strict';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    buildArray();
    animate();
};


window.onresize = function () {
    'use strict';
    console.log("resize");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //buildArray();
    animate();
};

//below are controlling the moving of the map by the four direction keys//
// setInterval(movePlane, 20);
// var keys = {}
//
// $(document).keydown(function(e) {
//   keys[e.keyCode] = true;
// });
//
// $(document).keyup(function(e) {
//   delete keys[e.keyCode];
// });
//
// function movePlane() {
//   for (var direction in keys) {
//     if (!keys.hasOwnProperty(direction)) continue;
//     if (direction == 37) {
//         $("#icon").animate({left: "-=5"}, 0);
//       }
//       if (direction == 38) {
//         $("#icon").animate({top: "-=5"}, 0);
//       }
//       if (direction == 39) {
//         $("#icon").animate({left: "+=5"}, 0);
//       }
//       if (direction == 40) {
//         $("#icon").animate({top: "+=5"}, 0);
//       }
//     }
//   }

//more restaurant data
  var restdata = [[39.956284, -75.154180,'Ocean City'],[39.9415, -75.1493,'PhillyCheasteak'],[39.9599, -75.1906,'Sabrina']];
  console.log("11");

  var j = 0;
  for (i=0;i<5;i++){
  L.circleMarker([restdata[i][0],restdata[i][1]]).bindPopup(restdata[i][2]).addTo(map);
  }

//slideshow data//

var state = {
  slideNumber: 0,
  slideData: [
    {
      "name": "Explore Cambridge's Outdoor Art",
      "content": "Cambridge has a long history of outdoor sculpture art. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mattis urna ac dolor scelerisque condimentum.",
    },
    {
      "name": "Art in 1960",
      "content": "Look at the small number of sculptures in 1960.",
      "filter": {
        "key": "Year",
        "comparison": "lessThan",
        "value": 1960
      }
    },
    {
      "name": "Art in 2000",
      "content": "By 2000, we can see the sculpture industry is booming.",
      "filter": {
        "key": "Year",
        "comparison": "lessThan",
        "value": 2000,
      }
    },
    {
      "name": "Art in 2010",
      "content": "By 2010, we can see the sculpture industry is booming.",
      "filter": {
        "key": "Year",
        "comparison": "lessThan",
        "value": 2010,
      },
    },
    {
      "name": "Bronze scultures are most popular",
      "content": "Everyone seems to love the bronze scultures in Cambridge. Including me, the creator of this story map. Can't get enough of that.",
      "filter": {
        "key": "Materials",
        "comparison": "equals",
        "value": "Bronze",
      }
    },

    {
      "name": "Okay, no filter on the last slide",
      "content": "Let's look at all of those points again. Cool points."
    }
  ],
  drawnOnMap: undefined,
  dataSource: undefined
}


//download data and process it//
$.ajax(url).done(function(data){
  // Save parsed data to state to make it globally accessible.
  // Any function that runs after this data has downloaded can access it.
  state.dataSource = JSON.parse(data);
  // Add the first slide
  addSlide(state.slideData[0]);
});



/* -----------------
Application functions
----------------- */

// Increase state counter by one
var next = function() {
  state.slideNumber++;
};

// Increase decrease state counter by one
var previous = function() {
  state.slideNumber--;
};
