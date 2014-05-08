"use strict"

# Variables
names =
  realm: ""
  king: ""

self =
  upgrade:
    wood: 100
    stone: 100
    food: 100
    silver: 0
    gold: 0

wood =
  name: "wood"
  amount: 0
  increment: 0
  max: 100
  flag: false

stone =
  name: "stone"
  amount: 0
  increment: 0
  max: 100
  flag: false

food =
  name: "food"
  amount: 0
  increment: 0
  max: 100
  flag: false

ore =
  name: "ore"
  increment: 0
  amount: 0
  max: 200
  flag: false
  iron:
    name: "iron"
    amount: 0

  copper:
    name: "copper"
    amount: 0

  silver:
    name: "silver"
    amount: 0

  gold:
    name: "gold"
    amount: 0

worker =
  name: "worker"
  amount: 0
  logger:
    increment: 1
    amount: 0
    cost: 10

  miner:
    increment: 1
    amount: 0
    cost: 10

  hunter:
    increment: 1
    amount: 0
    cost: 10

  quarrier:
    increment: 1
    amount: 0
    cost: 15

tent =
# Buildings
  amount: 0
  residents: 1
  cost:
    wood: 30

house =
  amount: 0
  residents: 4
  cost:
    wood: 75
    stone: 25

hostel =
  amount: 0
  residents: 10
  cost:
    wood: 200
    stone: 215
    iron: 25

mine =
  amount: 0
  cost:
    wood: 100
    stone: 100
    iron: 25

quarry =
  amount: 0
  cost:
    wood: 100
    stone: 100
    iron: 0

silo =
  amount: 0
  cost:
    wood: 100
    stone: 100
    iron: 0

mill =
  amount: 0
  cost:
    wood: 100
    stone: 100
    iron: 0

clickIncrement = 1
maxPop = (tent.residents * tent.amount) + (house.residents * house.amount)
beginTick = undefined
tick = undefined

# Consider changing this to specific materials.

# All OnLoad Functions
# Modal Commented out during development
$(document).ready ->

  # Get realm and king names and display them.

  # Display the correct values.
  updateValues = ->
    document.getElementById("maxPop").innerHTML = maxPop
    document.getElementById("tentAmount").innerHTML = tent.amount
    document.getElementById("tentCostWood").innerHTML = tent.cost.wood
    document.getElementById("tentResidents").innerHTML = tent.residents
    document.getElementById("houseAmount").innerHTML = house.amount
    document.getElementById("houseCostWood").innerHTML = house.cost.wood
    document.getElementById("houseCostStone").innerHTML = house.cost.stone
    document.getElementById("houseResidents").innerHTML = house.residents
    #document.getElementById("hostelAmount").innerHTML = hostel.amount
    #document.getElementById("hostelCostWood").innerHTML = hostel.cost.wood
    #document.getElementById("hostelCostStone").innerHTML = hostel.cost.stone
    #document.getElementById("hostelResidents").innerHTML = hostel.residents
    document.getElementById("millAmount").innerHTML = mill.amount
    document.getElementById("millCostWood").innerHTML = mill.cost.wood
    document.getElementById("millCostStone").innerHTML = mill.cost.stone
    document.getElementById("millCostIron").innerHTML = mill.cost.iron
    document.getElementById("quarryAmount").innerHTML = quarry.amount
    document.getElementById("quarryCostWood").innerHTML = quarry.cost.wood
    document.getElementById("quarryCostStone").innerHTML = quarry.cost.stone
    document.getElementById("quarryCostIron").innerHTML = quarry.cost.iron
    document.getElementById("siloAmount").innerHTML = silo.amount
    document.getElementById("siloCostWood").innerHTML = silo.cost.wood
    document.getElementById("siloCostStone").innerHTML = silo.cost.stone
    document.getElementById("mineAmount").innerHTML = mine.amount
    document.getElementById("mineCostWood").innerHTML = mine.cost.wood
    document.getElementById("mineCostStone").innerHTML = mine.cost.stone
    document.getElementById("mineCostIron").innerHTML = mine.cost.iron
    document.getElementById("maxOre").innerHTML = ore.max
    document.getElementById("ironAmount").innerHTML = ore.iron.amount
    document.getElementById("copperAmount").innerHTML = ore.copper.amount
    document.getElementById("silverAmount").innerHTML = ore.silver.amount
    document.getElementById("goldAmount").innerHTML = ore.gold.amount
    document.getElementById("oreAmount").innerHTML = ore.amount
    document.getElementById("maxWood").innerHTML = wood.max
    document.getElementById("woodAmount").innerHTML = wood.amount
    document.getElementById("stoneAmount").innerHTML = stone.amount
    document.getElementById("foodAmount").innerHTML = food.amount
    document.getElementById("woodIncrement").innerHTML = wood.increment
    document.getElementById("maxStone").innerHTML = stone.max
    document.getElementById("stoneIncrement").innerHTML = stone.increment
    document.getElementById("maxFood").innerHTML = food.max
    document.getElementById("foodIncrement").innerHTML = food.increment
    document.getElementById("workerAmount").innerHTML = worker.amount
    document.getElementById("loggerAmount").innerHTML = worker.logger.amount
    document.getElementById("quarrierAmount").innerHTML = worker.quarrier.amount
    document.getElementById("minerAmount").innerHTML = worker.miner.amount
    document.getElementById("hunterAmount").innerHTML = worker.hunter.amount
    document.getElementById("loggerCost").innerHTML = worker.logger.cost
    document.getElementById("minerCost").innerHTML = worker.miner.cost
    document.getElementById("hunterCost").innerHTML = worker.hunter.cost
    document.getElementById("quarrierCost").innerHTML = worker.quarrier.cost
    document.getElementById("upgradeSelfTotal").innerHTML = clickIncrement++
    return

  # Loggers Gather Wood
  gatherWood = ->
    wood.increment = worker.logger.increment * worker.logger.amount
    wood.amount += wood.increment
    checkMaxWood()
    updateValues()
    console.log(wood.amount)
    return

  # Quarriers Gather Stone
  gatherStone = ->
    stone.increment = worker.quarrier.increment * worker.quarrier.amount
    stone.amount += stone.increment
    checkMaxStone()
    updateValues()
    return

  # Hunters Gather Food
  gatherFood = ->
    food.increment = worker.hunter.increment * worker.hunter.amount
    food.amount += food.increment
    checkMaxFood()
    updateValues()
    return

  # Miners Gather Ore
  gatherOre = ->
    ore.increment = worker.miner.increment * worker.miner.amount
    ore.amount += ore.increment
    checkMaxOre()
    updateValues()
    return

  # Test max resources
  checkMaxWood = ->
    wood.amount = wood.max  if wood.amount >= wood.max
    return
  checkMaxStone = ->
    stone.amount = stone.max  if stone.amount >= stone.max
    return
  checkMaxFood = ->
    food.amount = food.max  if food.amount >= food.max
    return
  checkMaxOre = ->
    ore.amount = ore.max  if ore.iron.amount + ore.copper.amount + ore.silver.amount + ore.gold.amount >= ore.max
    return
  $("#onLoadModal").modal()
  $("#modalClose").click ->
    names.realm = document.getElementById("realm").value
    document.getElementById("realmName").innerHTML = names.realm
    names.king = document.getElementById("king").value
    document.getElementById("kingName").innerHTML = names.king
    return

  beginTick = ->
    nIntervId = undefined
    nIntervId = setInterval(tick, 5000)
    return

  tick = ->
    gatherWood()
    gatherStone()
    gatherFood()
    gatherOre()
    return

  $("#chopWood").click ->
    wood.amount += clickIncrement
    checkMaxWood()
    updateValues()
    return

  $("#mineStone").click ->
    stone.amount += clickIncrement
    checkMaxStone()
    updateValues()
    return

  $("#gatherFood").click ->
    food.amount += clickIncrement
    checkMaxFood()
    updateValues()
    return

  $("#mineOre").click ->
    ores = [
      "c"
      "c"
      "c"
      "c"
      "i"
      "i"
      "i"
      "s"
      "s"
      "g"
    ]
    oreChoice = ores[Math.floor(Math.random() * ores.length)]
    if oreChoice is "i"
      ore.iron.amount += clickIncrement
      ore.amount += clickIncrement
    else if oreChoice is "c"
      ore.copper.amount += clickIncrement
      ore.amount += clickIncrement
    else if oreChoice is "s"
      ore.silver.amount += clickIncrement
      ore.amount += clickIncrement
    else
      ore.gold.amount += clickIncrement
      ore.amount += clickIncrement
    checkMaxOre()
    updateValues()
    return

  # Hire Logger
  $("#createLogger").click ->
    if worker.amount < maxPop
      if food.amount >= worker.logger.cost
        food.amount -= worker.logger.cost
        worker.amount++
        worker.logger.amount++
        worker.logger.cost++
        updateValues()
      else
        $("#info").prepend $("<p>You need more food.</p>").fadeIn("slow")
    else
      $("#info").prepend $("<p>You need to build more accommodation.</p>").fadeIn("slow")
    return

  # Hire Miner
  $("#createMiner").click ->
    if worker.amount < maxPop
      if food.amount >= worker.miner.cost
        food.amount -= worker.miner.cost
        worker.amount++
        worker.miner.amount++
        worker.miner.cost++
        updateValues()
      else
        $("#info").prepend $("<p>You need more food.</p>").fadeIn("slow")
    else
      $("#info").prepend $("<p>You need to build more accommodation.</p>").fadeIn("slow")
    return

  # Hire Hunter
  $("#createHunter").click ->
    if worker.amount < maxPop
      if food.amount >= worker.hunter.cost
        food.amount -= worker.hunter.cost
        worker.amount++
        worker.hunter.amount++
        worker.hunter.cost++
        updateValues()
      else
        $("#info").prepend $("<p>You need more food.</p>").fadeIn("slow")
    else
      $("#info").prepend $("<p>You need to build more accommodation.</p>").fadeIn("slow")
    return

  # Hire Quarrier
  $("#createQuarrier").click ->
    if worker.amount < maxPop
      if food.amount >= worker.quarrier.cost
        food.amount -= worker.quarrier.cost
        worker.amount++
        worker.quarrier.amount++
        worker.quarrier.cost++
        updateValues()
      else
        $("#info").prepend $("<p>You need more food.</p>").fadeIn("slow")
    else
      $("#info").prepend $("<p>You need to build more accommodation.</p>").fadeIn("slow")
    return


  # Build a tent
  $("#buildTent").click ->
    if wood.amount >= tent.cost.wood
      wood.amount -= tent.cost.wood
      tent.amount++
      tent.cost.wood = tent.cost.wood * 1.2
      tent.cost.wood = tent.cost.wood.toFixed(0)
      maxPop = maxPop + tent.residents
      updateValues()
    else
      $("#info").prepend $("<p>You need more wood.</p>").fadeIn("slow")
    return


  # Build a house
  $("#buildHouse").click ->
    if wood.amount >= house.cost.wood and stone.amount >= house.cost.stone
      wood.amount -= house.cost.wood
      stone.amount -= house.cost.stone
      house.amount++
      house.cost.wood = house.cost.wood * 1.2
      house.cost.stone = house.cost.stone * 1.2
      house.cost.wood = house.cost.wood.toFixed(0)
      house.cost.stone = house.cost.stone.toFixed(0)
      maxPop += house.residents
      updateValues()
    else
      $("#info").prepend $("<p>You need more building materials.</p>").fadeIn("slow")
    return


  # Research Hostel
  $("#researchHostel").click ->
    progressWrap = document.getElemenyByClass("progress-wrap-hostel")
    if wood.amount >= 400 and stone.amount >= 150
      wood.amount -= 400
      stone.amount -= 150
      $("#researchHostel").addClass "hidden"
      progressWrap.removeClass "hidden"
      getPercent = (progressWrap.data("progress-percent-hostel") / 100)
      getProgressWrapWidth = progressWrap.width()
      progressTotal = getPercent * getProgressWrapWidth
      animationLength = 25000
      $(".progress-bar-hostel").stop().animate
        left: progressTotal
      , animationLength, ->
        $("#buildHostel").removeClass "hidden"
        $(".progress-wrap-hostel").addClass "hidden"
        $(".hostelInfo").removeClass "hidden"
        $(".hostelResearchInfo").addClass "hidden"
        return
      updateValues()
    else
      $("#info").prepend $("<p>You need more building materials.</p>").fadeIn("slow")
    return


  # Build a hostel
  $("#buildHostel").click ->
    if wood.amount >= hostel.cost.wood and stone.amount >= hostel.cost.stone
      wood.amount -= hostel.cost.wood
      stone.amount -= hostel.cost.stone
      hostel.amount++
      hostel.cost.wood = hostel.cost.wood * 1.2
      hostel.cost.stone = hostel.cost.stone * 1.2
      hostel.cost.wood = hostel.cost.wood.toFixed(0)
      hostel.cost.stone = hostel.cost.stone.toFixed(0)
      maxPop = maxPop + hostel.residents
      updateValues()
    else
      $("#info").prepend $("<p>You need more building materials.</p>").fadeIn("slow")
    return


  # Build wood storage
  $("#buildMill").click ->
    if wood.amount >= mill.cost.wood and stone.amount >= mill.cost.stone and ore.iron.amount >= mill.cost.iron
      wood.amount -= mill.cost.wood
      stone.amount -= mill.cost.stone
      ore.iron.amount -= mill.cost.iron
      mill.amount++
      wood.max += 100
      updateValues()
    else
      $("#info").prepend $("<p>You need more building materials.</p>").fadeIn("slow")
    return


  # Build stone storage
  $("#buildQuarry").click ->
    if wood.amount >= quarry.cost.wood and stone.amount >= quarry.cost.stone and ore.iron.amount >= quarry.cost.iron
      wood.amount -= quarry.cost.wood
      stone.amount -= quarry.cost.stone
      ore.iron.amount -= quarry.cost.iron
      quarry.amount++
      stone.max += 100
      updateValues()
    else
      $("#info").prepend $("<p>You need more building materials.</p>").fadeIn("slow")
    return


  # Build food storage
  $("#buildSilo").click ->
    if wood.amount >= silo.cost.wood and stone.amount >= silo.cost.stone and ore.iron.amount >= silo.cost.iron
      wood.amount -= silo.cost.wood
      stone.amount -= silo.cost.stone
      ore.iron.amount -= silo.cost.iron
      silo.amount++
      food.max += 100
      updateValues()
    else
      $("#info").prepend $("<p>You need more building materials.</p>").fadeIn("slow")
    return


  # Build ore storage
  $("#buildMine").click ->
    if wood.amount >= mine.cost.wood and stone.amount >= mine.cost.stone and ore.iron.amount >= mine.cost.iron
      wood.amount -= mine.cost.wood
      stone.amount -= mine.cost.stone
      ore.iron.amount -= mine.cost.iron
      mine.amount++
      ore.max += 100
      updateValues()
    else
      $("#info").prepend $("<p>You need more building materials.</p>").fadeIn("slow")
    return


  # Upgrades
  $("#upgradeSelf").click ->
    upCost = clickIncrement++ * 100
    if clickIncrement <= 5
      if wood.amount >= upCost and stone.amount >= upCost and food.amount >= upCost
        wood.amount -= upCost
        stone.amount -= upCost
        food.amount -= upCost
        clickIncrement += 1
        $("#upgrades").append $("<p>Personal Ability | <span id='clickIncrement'>2</span> Resources Per Click</p>").fadeIn("slow")
        document.getElementById("clickIncrement").innerHTML = clickIncrement
        updateValues()
    if clickIncrement <= 7
      silverUpCost = clickIncrement * 1.3
      goldUpCost = clickIncrement * 1.2
      if wood.amount >= upCost and stone.amount >= upCost and food.amount >= upCost and ore.silver.amount >= silverUpCost and ore.gold.amount >= goldUpCost
        wood.amount -= upCost
        stone.amount -= upCost
        food.amount -= upCost
        ore.silver.amount -= silverUpCost
        ore.gold.amount -= goldUpCost
        clickIncrement += 1
        $("#upgrades").append $("<p>Personal Ability | <span id='clickIncrement'>2</span> Resources Per Click</p>").fadeIn("slow")
        document.getElementById("clickIncrement").innerHTML = clickIncrement
        updateValues()
    else
      $("#info").prepend $("<p>You need more resources.</p>").fadeIn("slow")
    return

  $("#upgradeFiveFingers").click ->
    if wood.amount >= 450 and stone.amount >= 450 and food.amount >= 120
      wood.amount -= 450
      stone.amount -= 450
      food.amount -= 120
      clickIncrement = clickIncrement + 3
      $(".upgradeFiveFingers").addClass "hidden"
      $("#upgrades").prepend $("<p>Five Fingers | Five Resources Per Click</p>").fadeIn("slow")
      updateValues()
    else
      $("#info").prepend $("<p>You need more resources.</p>").fadeIn("slow")
    return

  $("#upgradeDoubleSleepingBags").click ->
    if wood.amount >= 100 and stone.amount >= 100 and food.amount >= 100
      wood.amount -= 100
      stone.amount -= 100
      food.amount -= 100
      tent.residents = 2
      maxPop = maxPop + tent.amount #This only works because we are adding ONE resident.
      $(".upgradeDoubleSleepingBags").addClass "hidden"
      $("#upgrades").prepend $("<p>Double Sleeping Bags | Two People, One Tent</p>").fadeIn("slow")
      updateValues()
    else
      $("#info").prepend $("<p>You need more resources.</p>").fadeIn("slow")
    return

  $("#upgradeBunkBeds").click ->
    if wood.amount >= 100 and stone.amount >= 100 and food.amount >= 100
      wood.amount -= 100
      stone.amount -= 100
      food.amount -= 100
      house.residents = 5
      maxPop = maxPop + house.amount #This only works because we are adding ONE resident.
      $(".upgradeBunkBeds").addClass "hidden"
      $("#upgrades").prepend $("<p>Bunk Beds | Five People, One House</p>").fadeIn("slow")
      updateValues()
    else
      $("#info").prepend $("<p>You need more resources.</p>").fadeIn("slow")
    return

  $("#upgradeSharpenAxes").click ->
    if wood.amount >= 50 and stone.amount >= 100 and food.amount >= 50
      wood.amount -= 50
      stone.amount -= 100
      food.amount -= 50
      worker.logger.increment = 2
      $(".upgradeSharpenAxes").addClass "hidden"
      $("#upgrades").prepend $("<p>Sharpen Axes | Loggers Chop Two Wood Each</p>").fadeIn("slow")
      updateValues()
    else
      $("#info").prepend $("<p>You need more resources.</p>").fadeIn("slow")
    return

  $("#upgradeSharpenPicks").click ->
    if wood.amount >= 50 and stone.amount >= 100 and food.amount >= 50
      wood.amount -= 50
      stone.amount -= 100
      food.amount -= 50
      worker.miner.increment = 2
      worker.quarrier.increment = 2
      $(".upgradeSharpenPicks").addClass "hidden"
      $("#upgrades").prepend $("<p>Sharpen Picks | Miners & Quarriers get double resources.</p>").fadeIn("slow")
      updateValues()
    else
      $("#info").prepend $("<p>You need more resources.</p>").fadeIn("slow")
    return

  $("#upgradeSharpenArrows").click ->
    if wood.amount >= 50 and stone.amount >= 100 and food.amount >= 50
      wood.amount -= 50
      stone.amount -= 100
      food.amount -= 50
      worker.hunter.increment = 2
      $(".upgradeSharpenArrows").addClass "hidden"
      $("#upgrades").prepend $("<p>Sharpen Arrows | Hunters Gather Two Food Each</p>").fadeIn("slow")
      updateValues()
    else
      $("#info").prepend $("<p>You need more resources.</p>").fadeIn("slow")
    return

  $("#upgradeMatesRatesWood").click ->
    if stone.amount >= 150 and food.amount >= 50
      stone.amount -= 150
      food.amount -= 50
      house.cost.wood = house.cost.wood - 20
      tent.cost.wood = tent.cost.wood - 15
      $(".upgradeMatesRatesWood").addClass "hidden"
      $("#upgrades").prepend $("<p>Mates Rates - Wood | Houses and Tents Cost Less Wood</p>").fadeIn("slow")
      updateValues()
    else
      $("#info").prepend $("<p>You need more resources.</p>").fadeIn("slow")
    return

  $("#upgradeMatesRatesStone").click ->
    if wood.amount >= 150 and food.amount >= 50
      wood.amount -= 150
      food.amount -= 50
      house.cost.stone = house.cost.stone - 20
      $(".upgradeMatesRatesStone").addClass "hidden"
      $("#upgrades").prepend $("<p>Mates Rates - Stone | Houses Cost Less Stone</p>").fadeIn("slow")
      updateValues()
    else
      $("#info").prepend $("<p>You need more resources.</p>").fadeIn("slow")
    return
#document.ready