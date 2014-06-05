// Variables
var names = {
    town: "",
    mayor: "",
},
    wood = {
        name: "wood",
        amount: 0,
        increment: 0,
        max: 100,
        storage: 0,
        storageCost: {
            wood: 50,
            stone: 50
        }
    },
    stone = {
        name: "stone",
        amount: 0,
        increment: 0,
        max: 100,
        storage: 0,
        storageCost: {
            wood: 50,
            stone: 50
        }
    },
    food = {
        name: "food",
        amount: 0,
        increment: 0,
        max: 100,
        storage: 0,
        storageCost: {
            wood: 50,
            stone: 50
        }
    },
    worker = {
        name: "worker",
        amount: 0,
        lumberjack: {
            increment: 1,
            amount: 0,
            cost: 10
        },
        miner: {
            increment: 1,
            amount: 0,
            cost: 10
        },
        hunter: {
            increment: 1,
            amount: 0,
            cost: 10
        }
    }, // Buildings
    tent = {
        amount: 0,
        residents: 1,
        cost: {
            wood: 30
        }
    },
    house = {
        amount: 0,
        residents: 4,
        cost: {
            wood: 75,
            stone: 25
        }
    },
    hostel = {
        amount: 0,
        residents: 10,
        cost: {
            wood: 200,
            stone: 215
        }
    };

var maxPop = (tent.residents * tent.amount) + (house.residents * house.amount);
var clickIncrement = 1; // Consider changing this to specific materials.

// All OnLoad Functions
// Modal Commented out during development
$(document).ready(function () {

/* test 1,2,3: 
    $('#createLumberjack').click(function () {
        if (worker.amount < maxPop) {
            if (food.amount >= worker.lumberjack.cost) {
                food.amount = food.amount - worker.lumberjack.cost;
                worker.amount++;
                worker.lumberjack.amount++;
                worker.lumberjack.cost++;
                wood.increment = worker.lumberjack.increment * worker.lumberjack.amount;
                updateValues();
            } else {
                $("#info").prepend($('<p>You need more food.</p>').fadeIn('slow'));
            }
        } else {
            $("#info").prepend($('<p>You need to build more accommodation.</p>').fadeIn('slow'));
        }
    });
*/

    $('#test1').click(function () {
        worker.amount =1;
        maxPop=2;
        food.amount=1;
        worker.lumberjack.cost=1;
        if (worker.amount < maxPop) {
            if (food.amount >= worker.lumberjack.cost) {
                console.log('Test1 Passed: wokeramount<max pop, and foodamount>=worker.cost creates a worker');
            } else {
                console.log('Test1 Failed: foodamount<workercost');
            }
        } else {
            console.log('Test1 Failed: maxpop<=workeramount');
        }
    });

    $('#test2').click(function () {
        worker.amount =2;
        maxPop=1;
        food.amount=1;
        worker.lumberjack.cost=1;
        if (worker.amount < maxPop) {
            if (food.amount >= worker.lumberjack.cost) {
                console.log('Test2 Failed: maxpop<=worker.amount, inner loop reached.');
            } else {
                console.log('Test2 Failed: maxpop<=worker amount, inner loop reached.');
            }
        } else {
            console.log('Test2 Passed: maxpop>workeramount');
        }
    });

    $('#test3').click(function () {
        worker.amount =1;
        maxPop=2;
        food.amount=1;
        worker.lumberjack.cost=2;
        if (worker.amount < maxPop) {
            if (food.amount >= worker.lumberjack.cost) {
                console.log('Test3 Failed: wokeramount<max pop, foodamount>=worker.cost.');
            } else {
                console.log('Test3 Passed: wokeramount<max pop, foodamount<workercost doesn\'t create a worker.');
            }
        } else {
            console.log('Test3 Failed: maxpop<=workeramount.');
        }
    });

/* test 4,5:
    function checkMaxWood() {
        if (wood.amount > wood.max) {
            wood.amount = wood.max;
        }
    }
*/
    $('#test4').click(function () {
        wood.amount=5;
        wood.max=4;
        if (wood.amount > wood.max) {
            wood.amount = wood.max;
        }
        if (wood.amount==wood.max) console.log('Test4 Passed: Wood.amount set to wood.max');
        else console.log('Test5 Failed: wood.amount not set to wood.max');
    });

    $('#test5').click(function () {
        wood.amount=3;
        wood.max=4;
        if (wood.amount > wood.max) {
            wood.amount = wood.max;
        }
        if (wood.amount==wood.max) console.log('Test4 Failed: Wood.amount set to wood.max');
        else console.log('Test5 Passed: wood.amount not set to wood.max');
    });

/* test 6,7,8,9:
    $('#upgradeMatesRatesWood').click(function () {
        if (stone.amount >= 150 && food.amount >= 50) {
            stone.amount = stone.amount - 150;
            food.amount = food.amount - 50;
            house.cost.wood = house.cost.wood - 20;
            tent.cost.wood = tent.cost.wood - 15;
            $('.upgradeMatesRatesWood').addClass('hidden');
            $("#upgrades").prepend($('<p>Mates Rates - Wood | Houses and Tents Cost Less Wood</p>').fadeIn('slow'));
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
        }
    });
*/
    $('#test6').click(function () {
        stone.amount=150;
        food.amount=50;
        if (stone.amount >= 150 && food.amount >= 50) {
            console.log('Test6 Passed: Having resources required gives upgrade.');
        } else {
            console.log('Test6 Failed: Having resources required does not give upgrade.');
        }
    });

    $('#test7').click(function () {
        stone.amount=100;
        food.amount=50;
        if (stone.amount >= 150 && food.amount >= 50) {
            console.log('Test6 Failed: Having one resource required gives upgrade.');
        } else {
            console.log('Test6 Passed: Not having both resources required does not give upgrade.');
        }
    });

    $('#test8').click(function () {
        stone.amount=200;
        food.amount=10;
        if (stone.amount >= 150 && food.amount >= 50) {
            console.log('Test6 Failed: Having one resource required gives upgrade.');
        } else {
            console.log('Test6 Passed: Not having both resources required does not give upgrade.');
        }
    });

    $('#test9').click(function () {
        stone.amount=100;
        food.amount=10;
        if (stone.amount >= 150 && food.amount >= 50) {
            console.log('Test6 Failed: Having neither resource required gives upgrade.');
        } else {
            console.log('Test6 Passed: Not having resources required does not give upgrade.');
        }
    });
/* Test 10,11:
    $('#upgradeTwoFingers').click(function () {
        if (wood.amount >= 100 && stone.amount >= 100 && food.amount >= 100) {
            wood.amount = wood.amount - 100;
            stone.amount = stone.amount - 100;
            food.amount = food.amount - 100;
            clickIncrement = clickIncrement + 1;
            $('.upgradeTwoFingers').addClass('hidden');
            $('.upgradeFiveFingers').removeClass('hidden');
            $("#upgrades").prepend($('<p>Two Fingers | Two Resources Per Click</p>').fadeIn('slow'));
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
        }
    });
*/
    $('#test10').click(function () {
    wood.amount = 100;
    stone.amount = 100;
    food.amount = 100;
    if (wood.amount >= 100 && stone.amount >= 100 && food.amount >= 100) {
            console.log('Test10 Passed: Having required resources gives upgrade.');
        } else {
            console.log('Test10 Failed: Having required resources does not give upgrade.');
        }
    });

    $('#test11').click(function () {
    wood.amount = 90;
    stone.amount = 90;
    food.amount = 90;
    if (wood.amount >= 100 && stone.amount >= 100 && food.amount >= 100) {
            console.log('Test11 Failed: Not having required resources gives upgrade.');
        } else {
            console.log('Test11 Passed: Not having required resources does not give upgrade.');
        }
    });

}); /*document.ready*/
