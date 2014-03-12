// Variables
var names = {
  town:"",
  mayor:"",
},
wood = {
  name:"wood",
  amount:0,
  increment:0,
  max:100,
  storage:0,
  storageCost: {
    wood:50,
    stone:50
  }
},
stone = {
  name:"stone",
  amount:0,
  increment:0,
  max:100,
  storage:0,
  storageCost: {
    wood:50,
    stone:50
  }
},
food = {
  name:"food",
  amount:0,
  increment:0,
  max:100,
  storage:0,
  storageCost: {
    wood:50,
    stone:50
  }
},
worker = {
  name:"worker",
  amount:0,
  lumberjack:{
    increment:1,
    amount:0,
    cost:10
  },
  miner:{
    increment:1,
    amount:0,
    cost:10
  },
  hunter:{
    increment:1,
    amount:0,
    cost:10
  }
}, // Buildings
tent = {
  amount:0,
  residents:1,
  cost:{
    wood:30
  }
},
house = {
  amount:0,
  residents:4,
  cost:{
    wood:75,
    stone:25
  } 
},
hostel = {
  amount:0,
  residents:10,
  cost:{
    wood:200,
    stone:215
  }
};

var maxPop = (tent.residents * tent.amount) + (house.residents * house.amount);
var clickIncrement = 1; // Consider changing this to specific materials.

// All OnLoad Functions
// Modal Commented out during development
$(document).ready(function(){
  $('#onLoadModal').modal();
  beginTick();
  updateValues();
});

// Get town and moyor names and display them.
$('#modalClose').click(function(){
  names.town = document.getElementById('town').value;
  document.getElementById("townName").innerHTML = names.town;
  names.mayor = document.getElementById('mayor').value;
  document.getElementById("mayorName").innerHTML = names.mayor;
});

function beginTick(){
  nIntervId = setInterval(tick, 5000);
}

function tick(){
  gatherWood();
  gatherStone();
  gatherFood();
}

// Display the correct values.
function updateValues(){
  document.getElementById("woodAmount").innerHTML = wood.amount;
  document.getElementById("maxWood").innerHTML = wood.max;
  document.getElementById("woodIncrement").innerHTML = wood.increment;
  document.getElementById("stoneAmount").innerHTML = stone.amount;
  document.getElementById("maxStone").innerHTML = stone.max;
  document.getElementById("stoneIncrement").innerHTML = stone.increment;
  document.getElementById("foodAmount").innerHTML = food.amount;
  document.getElementById("maxFood").innerHTML = food.max;
  document.getElementById("foodIncrement").innerHTML = food.increment;
  
  document.getElementById("workerAmount").innerHTML = worker.amount;
  document.getElementById("maxPop").innerHTML = maxPop;
  document.getElementById("lumberjackAmount").innerHTML = worker.lumberjack.amount;
  document.getElementById("lumberjackCost").innerHTML = worker.lumberjack.cost;
  document.getElementById("minerAmount").innerHTML = worker.miner.amount;
  document.getElementById("minerCost").innerHTML = worker.miner.cost;
  document.getElementById("hunterAmount").innerHTML = worker.hunter.amount;
  document.getElementById("hunterCost").innerHTML = worker.hunter.cost;
  
  document.getElementById("tentAmount").innerHTML = tent.amount;
  document.getElementById("tentCostWood").innerHTML = tent.cost.wood;
  document.getElementById("tentResidents").innerHTML = tent.residents;
  document.getElementById("houseAmount").innerHTML = house.amount;
  document.getElementById("houseCostWood").innerHTML = house.cost.wood;
  document.getElementById("houseCostStone").innerHTML = house.cost.stone;
  document.getElementById("houseResidents").innerHTML = house.residents;
  document.getElementById("hostelAmount").innerHTML = hostel.amount;
  document.getElementById("hostelCostWood").innerHTML = hostel.cost.wood;
  document.getElementById("hostelCostStone").innerHTML = hostel.cost.stone;
  document.getElementById("hostelResidents").innerHTML = hostel.residents;
  document.getElementById("woodStorageAmount").innerHTML = wood.storage;
  document.getElementById("woodStorageCostWood").innerHTML = wood.storageCost.wood;
  document.getElementById("woodStorageCostStone").innerHTML = wood.storageCost.stone;
  document.getElementById("stoneStorageAmount").innerHTML = stone.storage;
  document.getElementById("stoneStorageCostWood").innerHTML = stone.storageCost.wood;
  document.getElementById("stoneStorageCostStone").innerHTML = stone.storageCost.stone;
  document.getElementById("foodStorageAmount").innerHTML = food.storage;
  document.getElementById("foodStorageCostWood").innerHTML = food.storageCost.wood;
  document.getElementById("foodStorageCostStone").innerHTML = food.storageCost.stone;
}

// Click to Chop, Mine, Gather
$('#chopWood').click(function(){
  wood.amount = wood.amount + clickIncrement;
  checkMaxWood();
  updateValues();
});

$('#mineStone').click(function(){
  stone.amount = stone.amount + clickIncrement;
  checkMaxStone();
  updateValues();
});

$('#gatherFood').click(function(){
  food.amount = food.amount + clickIncrement;
  checkMaxFood();
  updateValues();
});

// Create Workers
$('#createLumberjack').click(function(){
  if (worker.amount < maxPop) {
    if (food.amount >= worker.lumberjack.cost) {
      food.amount = food.amount - worker.lumberjack.cost;
      worker.amount++;
      worker.lumberjack.amount++;
      worker.lumberjack.cost++;
      updateValues();
    } else {$("#info").prepend($('<p>You need more food.</p>').fadeIn('slow'));}
  } else {$("#info").prepend($('<p>You need to build more accommodation.</p>').fadeIn('slow'));}
});

$('#createMiner').click(function(){
  if (worker.amount < maxPop) {
    if (food.amount >= worker.miner.cost) {
      food.amount = food.amount - worker.miner.cost;
      worker.amount++;
      worker.miner.amount++;
      worker.miner.cost++;
      updateValues();
    } else {$("#info").prepend($('<p>You need more food.</p>').fadeIn('slow'));}
  } else {$("#info").prepend($('<p>You need to build more accommodation.</p>').fadeIn('slow'));}
});

$('#createHunter').click(function(){
  if (worker.amount < maxPop) {
    if (food.amount >= worker.hunter.cost) {
      food.amount = food.amount - worker.hunter.cost;
      worker.amount++;
      worker.hunter.amount++;
      worker.hunter.cost++;
      updateValues();
    } else {$("#info").prepend($('<p>You need more food.</p>').fadeIn('slow'));}
  } else {$("#info").prepend($('<p>You need to build more accommodation.</p>').fadeIn('slow'));}
});

// Lumberjacks Gather Wood
function gatherWood(){
  wood.increment = worker.lumberjack.increment * worker.lumberjack.amount;
  wood.amount = wood.amount + wood.increment;
  checkMaxWood();
  updateValues();
}

// Miner Gather Stone
function gatherStone(){
  stone.increment = worker.miner.increment * worker.miner.amount;
  stone.amount = stone.amount + stone.increment;
  checkMaxStone();
  updateValues();
}

// Hunter Gather Food
function gatherFood(){
  food.increment = worker.hunter.increment * worker.hunter.amount;
  food.amount = food.amount + food.increment;
  checkMaxFood();
  updateValues();
}

// Test max resources
function checkMaxWood(){
  if (wood.amount > wood.max){
    wood.amount = wood.max;
  }
}

function checkMaxStone(){
  if (stone.amount > stone.max){
    stone.amount = stone.max;
  }
}

function checkMaxFood(){
  if (food.amount > food.max){
    food.amount = food.max;
  }
}

// Build a tent
$('#buildTent').click(function(){
  if (wood.amount >= tent.cost.wood) {
    wood.amount = wood.amount - tent.cost.wood;
    tent.amount++;
    tent.cost.wood = tent.cost.wood * 1.2;
    tent.cost.wood = tent.cost.wood.toFixed(0);
    maxPop = maxPop + tent.residents;
    updateValues();
  } else{$("#info").prepend($('<p>You need more wood.</p>').fadeIn('slow'));}
});

// Build a house
$('#buildHouse').click(function(){
  if (wood.amount >= house.cost.wood && stone.amount >= house.cost.stone) {
    wood.amount = wood.amount - house.cost.wood;
    stone.amount = stone.amount - house.cost.stone;
    house.amount++;
    house.cost.wood = house.cost.wood * 1.2;
    house.cost.stone = house.cost.stone * 1.2;
    house.cost.wood = house.cost.wood.toFixed(0);
    house.cost.stone = house.cost.stone.toFixed(0);
    maxPop = maxPop + house.residents;
    updateValues();
  } else {$("#info").prepend($('<p>You need more building materials.</p>').fadeIn('slow'));}
});

// Research Hostel
$('#researchHostel').click(function() {
  if (wood.amount >= 400 && stone.amount >= 150){
    wood.amount = wood.amount - 400;
    stone.amount = stone.amount - 150;
    
    $('#researchHostel').addClass('hidden');
    $('.progress-wrap-hostel').removeClass('hidden');

    var getPercent = ($('.progress-wrap-hostel').data('progress-percent-hostel') / 100);
    var getProgressWrapWidth = $('.progress-wrap-hostel').width();
    var progressTotal = getPercent * getProgressWrapWidth;
    var animationLength = 25000;

    $('.progress-bar-hostel').stop().animate({
         left: progressTotal
      }, 
      animationLength, 
      function(){
        $('#buildHostel').removeClass('hidden');
        $('.progress-wrap-hostel').addClass('hidden');
        $('.hostelInfo').removeClass('hidden');
        $('.hostelResearchInfo').addClass('hidden'); 
      });
  } else {$("#info").prepend($('<p>You need more building materials.</p>').fadeIn('slow'));}
});

// Build a hostel
$('#buildHostel').click(function(){
  if (wood.amount >= hostel.cost.wood && stone.amount >= hostel.cost.stone) {
    wood.amount = wood.amount - hostel.cost.wood;
    stone.amount = stone.amount - hostel.cost.stone;
    hostel.amount++;
    hostel.cost.wood = hostel.cost.wood * 1.2;
    hostel.cost.stone = hostel.cost.stone * 1.2;
    hostel.cost.wood = hostel.cost.wood.toFixed(0);
    hostel.cost.stone = hostel.cost.stone.toFixed(0);
    maxPop = maxPop + hostel.residents;
    updateValues();
  } else {$("#info").prepend($('<p>You need more building materials.</p>').fadeIn('slow'));}
});

// Build wood storage
$('#buildWoodStorage').click(function(){
  if (wood.amount >= wood.storageCost.wood && stone.amount >= wood.storageCost.stone){
    wood.amount = wood.amount - wood.storageCost.wood;
    stone.amount = stone.amount - wood.storageCost.stone;
    wood.storage++;
    wood.max = wood.max + 100;
    updateValues();
  } else {$("#info").prepend($('<p>You need more building materials.</p>').fadeIn('slow'));}
});

// Build stone storage
$('#buildStoneStorage').click(function(){
  if (wood.amount >= stone.storageCost.wood && stone.amount >= stone.storageCost.stone){
    wood.amount = wood.amount - stone.storageCost.wood;
    stone.amount = stone.amount - stone.storageCost.stone;
    stone.storage++;
    stone.max = stone.max + 100;
    updateValues();
  } else {$("#info").prepend($('<p>You need more building materials.</p>').fadeIn('slow'));}
});

// Build food storage
$('#buildFoodStorage').click(function(){
  if (wood.amount >= food.storageCost.wood && stone.amount >= food.storageCost.stone){
    wood.amount = wood.amount - food.storageCost.wood;
    stone.amount = stone.amount - food.storageCost.stone;
    food.storage++;
    food.max = food.max + 100;
    updateValues();
  } else {$("#info").prepend($('<p>You need more building materials.</p>').fadeIn('slow'));}
});

// Upgrades
$('#upgradeTwoFingers').click(function(){
  if (wood.amount >= 100 && stone.amount >= 100 && food.amount >= 100) {
    wood.amount = wood.amount - 100;
    stone.amount = stone.amount - 100;
    food.amount = food.amount - 100;
    clickIncrement = clickIncrement + 1;
    $('.upgradeTwoFingers').addClass('hidden');
    $('.upgradeFiveFingers').removeClass('hidden');
    $("#upgrades").prepend($('<p>Two Fingers | Two Resources Per Click</p>').fadeIn('slow'));
    updateValues();
  } else {$("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));}
});

$('#upgradeFiveFingers').click(function(){
  if (wood.amount >= 450 && stone.amount >= 450 && food.amount >= 120) {
    wood.amount = wood.amount - 450;
    stone.amount = stone.amount - 450;
    food.amount = food.amount - 120;
    clickIncrement = clickIncrement + 3;
    $('.upgradeFiveFingers').addClass('hidden');
    $("#upgrades").prepend($('<p>Five Fingers | Five Resources Per Click</p>').fadeIn('slow'));
    updateValues();
  } else {$("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));}
});

$('#upgradeDoubleSleepingBags').click(function(){
  if (wood.amount >= 100 && stone.amount >= 100 && food.amount >= 100) {
    wood.amount = wood.amount - 100;
    stone.amount = stone.amount - 100;
    food.amount = food.amount - 100;
    tent.residents = 2; 
    maxPop = maxPop + tent.amount;  //This only works because we are adding ONE resident.
    $('.upgradeDoubleSleepingBags').addClass('hidden');
    $("#upgrades").prepend($('<p>Double Sleeping Bags | Two People, One Tent</p>').fadeIn('slow'));
    updateValues();
  } else {$("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));}
});

$('#upgradeBunkBeds').click(function(){
  if (wood.amount >= 100 && stone.amount >= 100 && food.amount >= 100) {
    wood.amount = wood.amount - 100;
    stone.amount = stone.amount - 100;
    food.amount = food.amount - 100;
    house.residents = 5;
    maxPop = maxPop + house.amount; //This only works because we are adding ONE resident.
    $('.upgradeBunkBeds').addClass('hidden');
    $("#upgrades").prepend($('<p>Bunk Beds | Five People, One House</p>').fadeIn('slow'));
    updateValues();
  } else {$("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));}
});

$('#upgradeSharpenAxes').click(function(){
  if (wood.amount >= 50 && stone.amount >= 100 && food.amount >= 50) {
    wood.amount = wood.amount - 50;
    stone.amount = stone.amount - 100;
    food.amount = food.amount - 50;
    worker.lumberjack.increment = 2;
    $('.upgradeSharpenAxes').addClass('hidden');
    $("#upgrades").prepend($('<p>Sharpen Axes | Lumberjacks Chop Two Wood Each</p>').fadeIn('slow'));
    updateValues();
  } else {$("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));}
});

$('#upgradeSharpenPicks').click(function(){
  if (wood.amount >= 50 && stone.amount >= 100 && food.amount >= 50) {
    wood.amount = wood.amount - 50;
    stone.amount = stone.amount - 100;
    food.amount = food.amount - 50;
    worker.miner.increment = 2;
    $('.upgradeSharpenPicks').addClass('hidden');
    $("#upgrades").prepend($('<p>Sharpen Picks | Miners Mine Two Stone Each</p>').fadeIn('slow'));
    updateValues();
  } else {$("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));}
});

$('#upgradeSharpenArrows').click(function(){
  if (wood.amount >= 50 && stone.amount >= 100 && food.amount >= 50) {
    wood.amount = wood.amount - 50;
    stone.amount = stone.amount - 100;
    food.amount = food.amount - 50;
    worker.hunter.increment = 2;
    $('.upgradeSharpenArrows').addClass('hidden');
    $("#upgrades").prepend($('<p>Sharpen Arrows | Hunters Gather Two Food Each</p>').fadeIn('slow'));
    updateValues();
  } else {$("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));}
});

$('#upgradeMatesRatesWood').click(function(){
  if (stone.amount >= 150 && food.amount >= 50) {
    stone.amount = stone.amount - 150;
    food.amount = food.amount - 50;
    house.cost.wood = house.cost.wood - 20;
    tent.cost.wood = tent.cost.wood - 15;
    $('.upgradeMatesRatesWood').addClass('hidden');
    $("#upgrades").prepend($('<p>Mates Rates - Wood | Houses and Tents Cost Less Wood</p>').fadeIn('slow'));
    updateValues();
  } else {$("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));}
});

$('#upgradeMatesRatesStone').click(function(){
  if (wood.amount >= 150 && food.amount >= 50) {
    wood.amount = wood.amount - 150;
    food.amount = food.amount - 50;
    house.cost.stone = house.cost.stone - 20;
    $('.upgradeMatesRatesStone').addClass('hidden');
    $("#upgrades").prepend($('<p>Mates Rates - Stone | Houses Cost Less Stone</p>').fadeIn('slow'));
    updateValues();
  } else {$("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));}
});
