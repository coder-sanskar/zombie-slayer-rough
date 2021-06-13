const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var soldier, soldierImg, backgroundImg, zombie;

var soldierAnimation, sol_standImg, soldier_dying;

var bullet, bulletImg, antidote, antidoteImg; 

var zombieAnimation; 

var health = 5, healthImg, hlth; 

var score = 0;

var gameOver, gameOverImg, restart;

var zomb2Animation;

var PLAY=1, END=0, gameState = PLAY;

function preload(){

  zombieAnimation = loadAnimation("Zombie1.png","Zombie2.png", "Zombie3.png", "Zombie4.png",
   "Zombie5.png", "Zombie6.png", "Zombie7.png", "Zombie8.png");

   soldierAnimation = loadAnimation("sw1.png", "sw2.png", "sw3.png", "sw4.png", "sw5.png");

   zomb2Animation = loadAnimation("z1.png", "z2.png", "z3.png", "z4.png");

soldierImg = loadImage("soldier-firing.png");
bulletImg = loadImage("Bullet.png");
backgroundImg = loadImage("bg.png");
antidoteImg = loadImage("Antidote.png");
healthImg = loadImage("Health.png");
sol_standImg = loadImage("soldier-standing.png");
gameOverImg = loadImage("game-over.png");
var soldier_dying = loadAnimation("sd1.png", "sd2.png", "sd3.png", "sd4.png", "sd5.png", "sd6.png", "sd7.png", "sd8.png", "sd9.png");



}

function setup() {
  createCanvas(800,400);
  
  soldier = createSprite(750, 200, 50, 50);
  //soldier.addAnimation("soldiers", soldierAnimation)
  soldier.addImage("soldier",soldierImg);
  soldier.scale = 0.8;
  
  var hlth = createSprite(215,40,10,10);
  hlth.addImage("health", healthImg);
  hlth.scale = 0.03
  
  zombGroup = new Group();
  bulletGroup = new Group();
  antidoteGroup = new Group();
  zomb2Group = new Group();

}

function draw() {
  background(backgroundImg);

textSize(30);
  fill("white");
  text("『 Zᴏᴍʙɪᴇ•Sʟᴀʏᴇʀ 』", 270,50);

  textSize(29);
  fill("white");
  text("Sᴄᴏʀᴇ : " + score, 650,50);

  textSize(29);
  fill("white");
  text("Hᴇᴀʟᴛʜ : " + health + "x", 50,50);


if (gameState === PLAY){


if (frameCount%50===0){
spawnZombies();
}

if (frameCount%50===0){
spawnZomb2();
}


if (keyDown("SPACE")){
  createBullet();

}

if (frameCount%400===0){
createAntidote();
}

if (zombGroup.x > 800){
score = score-1;
}

if (zomb2Group.x > 800){
  score = score-1;
}


soldier.velocityX = 0;
  soldier.velocityY = 0;


 if(keyDown("UP_ARROW")) {
    
    soldier.velocityY = -6;
    
  }
    
 if (keyDown("DOWN_ARROW")) {
    soldier.velocityY = 6;
     
    
 }
  
  if (keyDown("LEFT_ARROW")) {
    
    soldier.velocityX = -6;
   
  }
    
    if (keyDown("RIGHT_ARROW")) {
      soldier.velocityX = 6;
       
      
    }

    gameOver.visible = false;

    if (soldier.index !== null){
  for (var i = 0; i< zombGroup.length; i++)
  if (zombGroup.get(i).isTouching(soldier)){
    zombGroup.get(i).destroy();
    health = health-1;
  }
}

if (soldier.index !== null){
  for (var i = 0; i< zomb2Group.length; i++)
  if (zomb2Group.get(i).isTouching(soldier)){
    zomb2Group.get(i).destroy();
    health = health-1;
  }
}

if (zombGroup.index !== null){
  for (var i = 0; i< bulletGroup.length; i++)
  if (bulletGroup.get(i).isTouching(zombGroup)){
    bulletGroup.get(i).destroy();
    
  }
}


if (zomb2Group.index !==null){
  for(var  i = 0; i < bulletGroup.length; i++)
  if (bulletGroup.get(i).isTouching(zomb2Group)){
  bulletGroup.get(i).destroy();
  } 

}

if (bulletGroup.index !==null){
for(var  i = 0; i < zomb2Group.length; i++)
if (zomb2Group.get(i).isTouching(bulletGroup)){
zomb2Group.get(i).destroy();
  } 

}

if (soldier.index !== null){
 for (var i = 0; i < antidoteGroup.length; i++)
   if(antidoteGroup.get(i).isTouching(soldier)){
    antidoteGroup.get(i).destroy();
    score = score+1
    
       }
}

if (bulletGroup.index !== null){
 for(var i = 0; i < zombGroup.length; i++)
   if(zombGroup.get(i).isTouching(bulletGroup)){
    zombGroup.get(i).destroy();
    
       }
}





}

   if (health === 0){
   gameState = END;

   if (gameState === END){
    
    zombGroup.setVelocityXEach(0);
    zomb2Group.setVelocityXEach(0);

    zomb2Group.setLifetimeEach(0);
    zombGroup.setLifetimeEach(0);

   zomb2Group.visible = false;
   zombGroup.visible = false;

   gameOver = createSprite(width/2, height/2, 10,10);
   gameOver.addImage("gameOver", gameOverImg);

   soldier.velocityX = 0;
   soldier.velocityY = 0;
 
   fill("black");
   textSize(30);
   text("Pʀᴇss 'R' Tᴏ ", 600,200);

   fill("black");
   textSize(30);
   text("Rᴇsᴛᴀʀᴛ", 600,250);

   
  restart();




   }



 }
    

  drawSprites();
}

function spawnZombies(){
 var zomb = createSprite(0,Math.round(random(180,370)),10,10);
 zomb.addAnimation("zombie", zombieAnimation);
 zomb.velocityX = 4;
 zomb.lifetime = 900;
 zomb.scale = 0.5;
 zombGroup.add(zomb);
}

function createBullet(){
var bullet = createSprite(100,100,50,20);
bullet.addImage("bullet", bulletImg);
bullet.x = soldier.x;
bullet.y = soldier.y;
bullet.velocityX = -5;
bullet.lifetime = 800;
bullet.scale = 0.1;
bulletGroup.add(bullet);
}

function createAntidote(){
var antidote = createSprite(Math.round(random(0,500)), Math.round(random(190,370)), 10,10);
antidote.addImage("antidote", antidoteImg);
antidote.scale = 0.05;
antidoteGroup.add(antidote);
}

function spawnZomb2(){
 var zomb2 = createSprite(0,Math.round(random(180,370)),10,10);
 zomb2.addAnimation("zombie2", zomb2Animation);
 zomb2.velocityX = 4;
 zomb2.lifetime = 900;
 zomb2Group.add(zomb2);
}

function restart(){
if (keyDown("r")){
  gameState = PLAY;
}

}