

// --------------------- Random walkers --------------------------

// line walker

let cell = 1;
let walkers = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  background(0,0,0);

  // Create un first walker serie in the center when app is open

  // for (let i = 0; i < 30; i++) {
  //   walkers.push(new Walker(width/2, height/2));
  //   walkers.forEach((walker)=> (walker.draw()));;
  // }
}

function draw(){
// console.log((color(150,100, 100, 52).levels));

  walkers.forEach(walker => {
    if (!walker.isOut()) {
      walker.velocity();
      walker.move();
      walker.draw();
      // console.log(walker)
      // console.log (walker.color.levels)
      console.log (uiWeight)
    }
    
  });
}

class Walker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.px = x;
    this.py = y;
    this.velocityX = random(-5, 5);
    this.velocityY = random(-5, 5);
    this.color = color(random(uiColor.getValue(), (uiColor.getValue() + 200)), uiSaturation.getValue(), uiBrightness.getValue(), uiOpacity.getValue());
    this.draw();
  }
  velocity () {
    this.velocityX += map(noise(this.x * 0.005, this.y * 0.005, millis() * 0.001), 0, 1, -1, 1);
    this.velocityY += map(noise(this.y * 0.005, this.x * 0.005, millis() * 0.001), 0, 1, -1, 1);
  }
  isOut () {
    return(this.x < 0 || this.x > width || this.y < 0 || this.y > height);
  }
  move () {
    this.x += this.velocityX;
    this.y += this.velocityY;
  }
  draw () {
    line(this.x, this.y, this.px, this.py);
    this.px = this.x;
    this.py = this.y;
    noFill();
    stroke(this.color.levels);
    // stroke(0, 0, 50, 20);
    strokeCap(SQUARE);
    blendMode(SCREEN);
    // smooth();
    strokeWeight(uiWeight.getValue());
  }
  
}
function mouseClicked () {
  // walkers = [];   -> uncomment to set only one walker for one click and erase the others
  noiseSeed(random(50));
  for (let i = 0; i < 30; i++){
    walkers.push(new Walker(mouseX, mouseY));
  
  }
  
}
function reset () {
  resizeCanvas(windowWidth, windowHeight);
  walkers = [];
  clear();
  background(0,0,0);
}

// GUI interface : 

let walkersProps = {
  'Color' : 110,
  'Saturation' : 70,
  'Brightness' : 100,
  'Opacity' : 100,
  'Weight' : 1,
  'Amount' : window.innerWidth < 600 ? 400 : 1000,
  'Random' : 0.2
};

let props = walkersProps;
let gui = new dat.GUI();
let walkersFolder = gui.addFolder("Walkers");
let uiColor = walkersFolder.add(props, 'Color', 0, 360, 10);
let uiSaturation = walkersFolder.add(props, 'Saturation', 0, 100, 5);
let uiBrightness = walkersFolder.add(props, 'Brightness', 0, 100, 5);
let uiOpacity = walkersFolder.add(props, 'Opacity', 0, 1, 0.01);
let uiWeight = walkersFolder.add(props, 'Weight', 0, 10, 0.5);
// gui.addColor(props, "Color");
uiColor.onChange(reset);
uiSaturation.onChange(reset);
uiBrightness.onChange(reset);
uiOpacity.onChange(reset);
uiWeight.onChange(reset);


// function drawGrid() {
//   // Hack to avoid blurry lines
//   translate(0.5, 0.5);
  
//   // Define the stroke color
//   stroke(80);
//   // Draw the rows
//   for (let y = cell; y < height; y += cell) {
//     line(0, y, width, y);
//   }
  
//   // Draw the columns
//   for (let x = cell; x < width; x += cell) {
//     line(x, 0, x, height);
//   }
  
//   resetMatrix();
// }


// ------ Basic walker ------


// let cell = 10;
// let walkers = [];

// function setup() {
//   createCanvas(400, 400);
//   walkers.push(new Walker());
//   drawGrid();
//   draw();
// }

// function draw(){
//   drawGrid();

//   walkers.forEach(walker => {
//     if (!walker.isOut()) {
//       walker.move();
//       walker.draw();
//       console.log(walker)
//     }
//   });
  
//   ;
// }

// class Walker {
//   constructor(x, y) {
//     this.x = x || floor((width / cell) / 2) * cell;
//     this.y = y || floor((height / cell) / 2) * cell;
   
//   }
//   isOut () {
//     return(this.x < 0 || this.x > width || this.y < 0 || this.y > height);
//   }
//   move () {
//     const direction = random();
//     if (direction < 0.25) {
//       // Go up
//       this.y -= cell;
//     } else if (direction < 0.5) {
//       // Go down
//       this.y += cell;
//     } else if (direction < 0.75) {
//       // Go left
//       this.x -= cell;
//     } else if (direction < 1) {
//       // Go right
//       this.x += cell;
//     }
//   }
//   draw () {
//     fill('rgba(0, 0, 0, 0.3)');
//     noStroke();
//     rect(this.x, this.y, cell, cell);
//   }
// }
// function mouseClicked () {
//   const x = mouseX - (mouseX % cell);
//   const y = mouseY - (mouseY % cell);
//   walkers = [];
//   walkers.push(new Walker(x, y));
//   clear();
//   drawGrid();
// }

// function drawGrid() {
//   // Hack to avoid blurry lines
//   translate(0.5, 0.5);
  
//   // Define the stroke color
//   stroke(80);
//   // Draw the rows
//   for (let y = cell; y < height; y += cell) {
//     line(0, y, width, y);
//   }
  
//   // Draw the columns
//   for (let x = cell; x < width; x += cell) {
//     line(x, 0, x, height);
//   }
  
//   resetMatrix();
// }



// --------------------- Recreating the Noise Orbit (Stevan Dedovic) --------------------------
// const numSteps = 10;

// function setup() {
//   createCanvas(400, 400);

//   colorMode(HSB, 360, 100, 100, 1.0);
// }

// function draw() {
//   background(0, 0, 100);
//   noFill(); 
//   stroke(0, 0, 0); 
//   strokeWeight(w(0.001));

//   for (let radius = 0.05; radius < 0.4; radius += 0.005) {
//     let circle = makeCircle(numSteps, radius);
//     let distortedCircle = distortPolygon(circle);
//     let smoothCircle = chaikin(distortedCircle, 4); // To make circle from a polygon (angle -> curve)

//     beginShape();
//     smoothCircle.forEach(point => {
//       vertex(w(point[0]), h(point[1]));
//     });
//     endShape(CLOSE); // CLOSE because the last point is not the first point
//   }
// }

// function distortPolygon(polygon) {
//   const z = frameCount / 500;
//   const z2 = frameCount / 100;

//   return polygon.map(point => {
//     const x = point[0];
//     const y = point[1];
//     const distance = dist(0.5, 0.5, x, y);
    
//     const noiseFn = (x, y) => {
//       const noiseX = (x + 0.31) * distance * 2 + z2;
//       const noiseY = (y - 1.73) * distance * 2 + z2;
//       return noise(noiseX, noiseY, z);
//     };
//     console.log(frameCount);
//     const theta = noiseFn(x, y) * Math.PI * 3;
    
//     const amountToNudge = 0.08 - (Math.cos(z) * 0.08);
//     const newX = x + (amountToNudge * Math.cos(theta));
//     const newY = y + (amountToNudge * Math.sin(theta));
    
//     return [newX, newY];
//   });
// }


// function makeCircle(numSides, radius) {
//   const points = [];
//   const radiansPerStep = (Math.PI * 2) / numSides;
//   for (let theta = 0; theta < Math.PI * 2; theta += radiansPerStep) {
//     const x = 0.5 + radius * Math.cos(theta);
//     const y = 0.5 + radius * Math.sin(theta);
    
//     points.push([x, y]);
//   }
//   return points;
// }

// //Chaikin algorythm : find on https://observablehq.com/@pamacha/chaikins-algorithm

// function chaikin(arr, num) {
//   if (num === 0) return arr;
//   const l = arr.length;
//   const smooth = arr.map((c,i) => {
//     return [[0.75*c[0] + 0.25*arr[(i + 1)%l][0],
//              0.75*c[1] + 0.25*arr[(i + 1)%l][1]],
//             [0.25*c[0] + 0.75*arr[(i + 1)%l][0],
//             0.25*c[1] + 0.75*arr[(i + 1)%l][1]]];
//     }).flat();
//   return num === 1 ? smooth : chaikin(smooth, num - 1)
// }

// // to set pixel range of the width between 0 and 1

// function w(val) {
//   if (val == null) return width;
//   return width * val;
// }

// function h(val) {
//   if (val == null) return height;
//   return height * val;
// }





// --------------------- Lines in space --------------------------

// let particles = 0 ;
// let pointDiameter = 3;
// let density = 5;
// let points = [];
// let lines = [];

// function setup() {
//   createCanvas(400, 400);
//   frameRate(30);
//   if (points.length < 1) {
//     for (let row = 0; row < density; row++) {
//       for (let col = 0; col < density; col++) {
//           points.push(new Point(col * width / density, row * height / density));
      
//       }
//     }
//     if (points.length === density * density) {
//       for (let i = 0; i < points.length - 1; i += floor(random(1,density))) {
//         lines.push(new Line(points[floor(random(1,points.length))], points[floor(random(1, density))]));
//       }
//     }
//   }
// }

// function draw() {
//   background(255);
 

//   for (let i = 0; i < points.length; i++) {
//     // points[i].show();
//     points[i].update(); // Mettre à jour la position de chaque point
//   }
//   console.log(points.length )
//   for (let i = 0; i < lines.length; i++) {
//     lines[i].show();
//   }
// }

// class Point{
//   constructor(x, y){
//     this.posX= x;
//     this.posY=y;
//     this.incrementX = random(-1, 1);
//     this.incrementY = random(-1, 1);
//     this.maxX = width - pointDiameter;
//     this.minX = pointDiameter;
//     this.maxY = height - pointDiameter;
//     this.minY = pointDiameter;
//   }
  
//   update() {
//     this.posX += this.incrementX;
//     this.posY += this.incrementY;
//     if (this.posX > this.maxX) this.incrementX = -1;
//     if (this.posX < this.minX) this.incrementX = 1;
//     if (this.posY > this.maxY) this.incrementY = -1;
//     if (this.posY < this.minY) this.incrementY = 1;
//   }
  
//   show(){
//     noStroke
//     fill(0);
//     ellipse(this.posX,this.posY,pointDiameter, pointDiameter)
//    }
// }

// class Line{
//   constructor(p1, p2){
//     this.point1 = p1;
//     this.point2 = p2;
//   }
  
//   show(){
//     stroke(0);
//     strokeWeight(3);
//     line(this.point1.posX, this.point1.posY, this.point2.posX, this.point2.posY);
//   }
// }

// ---- Lines left et up

// if (points.length < 1) {
//   for (let row = 0; row < density; row++) {
//     for (let col = 0; col < density; col++) {
//         points.push(new Point(col * width / density, row * height / density));
    
//     }
//   }
//   if (points.length === density * density) {
//     for (let i = 0; i < points.length - 1; i += density) {
//       lines.push(new Line(points[i], points[floor(random(1, density))]));
//     }
//   }
// }



// ---------------------  Dots in space--------------------------

// let density = 5;
// let pointDiameter = 3;
// let increment = 0;
// let points = [];
// let particles = 102 ;

// function setup() {
//   createCanvas(400, 400);
//   frameRate(60);
// }

// function draw() {
//     background(255);
//     if (points.length < particles) {
//       for (let row = 1; row < density; row++) {
//         for (let col = 1; col < density; col++) {
//             points.push(new Point(col * width / density, row * width / density));
        
//         }
//     }
//     }
   
//     for (let i = 0; i < points.length; i++) {
//         points[i].update();
//         points[i].show();
//       }
// }
// class Point{
//     constructor(x, y){
//       this.posX= x;
//       this.posY=y;
//       this.incrementX = random(-1, 1);
//       this.incrementY = random(-1, 1);
//       this.maxX = width - pointDiameter;
//       this.minX = pointDiameter;
//       this.maxY = height - pointDiameter;
//       this.minY = pointDiameter;
//     }
    
//     update() {
//       this.posX += this.incrementX;
//       this.posY += this.incrementY;
//       if (this.posX > this.maxX) this.incrementX = -1;
//       if (this.posX < this.minX) this.incrementX = 1;
//       if (this.posY > this.maxY) this.incrementY = -1;
//       if (this.posY < this.minY) this.incrementY = 1;
//     }
    
//     show(){
//       noStroke();
//       fill(0);
//       ellipse(this.posX,this.posY,pointDiameter, pointDiameter)
//      }
     
//   }

// ----------------------- -------------------------------

// function drawDots(){
   
//     increment ++;
//     if (increment == 400){
//         increment=-400;
//     }
//     for (let row = 0; row < density; row++) {
//         for (let col = 0; col < density; col++) {
//           let x = col * width / density ;
//           let y = row * height / density;
//           noStroke();
//           fill(0);
//           ellipse(x + increment, y, pointDiameter, pointDiameter);
          
//         }
//       }
//     console.log(increment)
// }


// let density = 15;
// let pointDiameter = 5;
// let increment = 0;
// function setup() {
//   createCanvas(400, 400);
//   frameRate(60);
// }

// function draw() {
//     background(255);
//     drawDots();

// }

// function drawDots(){
   
//     increment ++;
//     if (increment == 400){
//         increment=-400;
//     }
//     for (let row = 0; row < density; row++) {
//         for (let col = 0; col < density; col++) {
//           let x = col * width / density ;
//           let y = row * height / density;
//           noStroke();
//           fill(0);
//           ellipse(x + increment, y, pointDiameter, pointDiameter);
          
//         }
//       }
//     console.log(increment)
// }



// --------------- Labyrinth pattern -----------------//

// Press escape to stop the animation
// Press CTRL to change the line colors

// let density = 15;
// let randColor = 0 ;
// function setup() {
//   createCanvas(500, 500);
//   frameRate(2);
//   colorMode(HSB) ;
// }

// function draw() {
//   if (!keyIsDown(ESCAPE)) {
//     background(255);
//     for (row= 0 ; row < density ; row++){
//       for (let col = 0; col < density; col++) {
//         drawLine(row, col)
//       }
//     }
//   }
//   if (keyIsDown(CONTROL)){
//     randColor = floor(random(361));
//   }

// }

// function drawLine(row, col){
//   let lowerLeft = {
//     x: (col * width / density),
//     y: (row * height / density) 
//   }
//   let upperRight = {
//     x: ((col + 1) * width / density),
//     y: ((row + 1) * height / density)
//   }
//   let lowerRight = {
//     x: (col + 1) * width / density,
//     y: (row * height / density)
//   }
//   let upperLeft = {
//     x: col  * width / density,
//     y: (row + 1) * height / density
//   }

//   let randomInt = floor(random(2));
//   strokeWeight(5);
//   if (randomInt == 0){
//     let colors = [color(randColor, 100, 100), color(randColor+70, 100, 100)]; // Create a gradient on 70 HSB range from a random color 

//     stroke(lerpColor(colors[0], colors[1], col / (density - 1)));
//     line(upperLeft.x, upperLeft.y, lowerRight.x, lowerRight.y);
//   } else {
//     let colors = [color(randColor, 100, 100), color(randColor+70, 100, 100)]; 

//     stroke(lerpColor(colors[0], colors[1], row / (density - 1)));
//     line(lowerLeft.x, lowerLeft.y, upperRight.x, upperRight.y);
//   }  

// }



// // --------------- Labyrinth pattern -----------------//

// // Press escape to stop the animation
// // Press CTRL to change the line colors

// let density = 10;
// let randColor = 0 ;
// function setup() {
//   createCanvas(500, 500);
//   frameRate(3);
//   colorMode(HSB) ;
// }

// function draw() {
//   if (!keyIsDown(ESCAPE)) {
//     background(255);
//     for (row= 0 ; row < density ; row++){
//       for (let col = 0; col < density; col++) {
//         drawLine(row, col)
//       }
//     }
//   }
//   if (keyIsDown(CONTROL)){
//     randColor = floor(random(361));
//   }

// }

// function drawLine(row, col){
//   let lowerLeft = {
//     x: (col * width / density),
//     y: (row * height / density) 
//   }
//   let upperRight = {
//     x: ((col + 1) * width / density),
//     y: ((row + 1) * height / density)
//   }
//   let lowerRight = {
//     x: (col + 1) * width / density,
//     y: (row * height / density)
//   }
//   let upperLeft = {
//     x: col  * width / density,
//     y: (row + 1) * height / density
//   }

//   let randomInt = floor(random(2));
//   strokeWeight(5);
//   if (randomInt == 0){
//     let colors = [color(randColor, 100, 100), color(randColor+70, 100, 100)]; // Create a gradient on 70 HSB range from a random color 

//     stroke(lerpColor(colors[0], colors[1], col / (density - 1)));
//     line(upperLeft.x, upperLeft.y, lowerRight.x, lowerRight.y);
//   } else {
//     let colors = [color(randColor, 100, 100), color(randColor+70, 100, 100)]; 

//     stroke(lerpColor(colors[0], colors[1], row / (density - 1)));
//     line(lowerLeft.x, lowerLeft.y, upperRight.x, upperRight.y);
//   }
//   fill(0);
  

// }




// --------------- pendulum -----------------//

// let pendulums = [];
// let pendulumCount = 40;

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   for(let i = 0; i < pendulumCount; i++){
//     pendulums[i] = new Pendulum(i);
//   }
// }

// function draw() {
	
//   background(255 );
//   translate(width / 2, height / 2);
//   for(let i = 0; i < pendulumCount; i++){
//     pendulums[i].display();
//     pendulums[i].update();
//   }
// }

// class Pendulum {
//   constructor(n){
//     this.angle = 0;
//     this.angleSpeed = 0.01 + n * 0.0008; 
//     this.radius = 30 + n * 6; 
//   }
  
//   update() {
//     this.angle += this.angleSpeed;
//   }
  
//   display(){
//     let x = this.radius * cos(this.angle);
//     let y = this.radius * sin(this.angle);
//     stroke(0,100);
//     line(0, 0, x, y);
//     fill(0);
//     ellipse(x, y, 5, 5);
    
//     // line(x/2, y/2, random(x), random(y));
//   }
// }