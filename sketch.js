var database;
var dog,dogImage,dogImage2;
var foodStock,foodS;
function preload() {
  dogImage = loadImage("images/dogImg.png");
  dogImage2 = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500,500);
  dog = createSprite(350,300,20,50);
  dog.addImage(dogImage);
  dog.scale = 0.2;
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",function(d){
    foodS = d.val();
  })
  
}


function draw() {  
  background("skyblue");
  if(keyWentDown(UP_ARROW)){
    updateStock(foodS);
    
  }else if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImage);
  }
  
  drawSprites();
  textSize(20);
  stroke("gold");
  fill(255);
  text("Food Remaining: "+foodS,180,180);
  text("Press the up arrow to feed Max",130,40);
}
function updateStock(s){
  if(s<=0){
    s = 0;
    dog.addImage(dogImage);
  }else{
    s = s-1;
    dog.addImage(dogImage2);
  }
  database.ref('/').update({
    Food:s
  })
}


