window.onload = function() {
    updateDisplay();
    setInterval(updateDisplay, 100);
    setInterval(tick, 5000);
    setInterval(saveGame, 10000);
    loadGame();
}

function saveGame() {
    console.log("Saving Game");
    localStorage['clicky[wood]'] = btoa(JSON.stringify(resource.wood));
}

function loadGame() {
    if (!localStorage['clicky[wood]']) return;

    resource.wood = JSON.parse(atob(localStorage['clicky[wood]']));
}

function clearLocalStorage() {
    localStorage.clear();
    window.location.reload();
}

// Increments resources.
function tick() {
    autoIncrementResource(resource.wood);
    autoIncrementResource(resource.stone);
}

function clickIncrement(x) {
    if (x.total >= x.max) {
        console.log("Max " + x.name);
    } else {
        x.total += x.clickIncrement;
    }
}

function autoIncrementResource(x) {
    let newValue = x.total + x.autoIncrement;
    if (newValue <= x.max) {
        x.total += x.autoIncrement;
    } else {
        x.total = x.max;
    }
}

// Add storage for a resource
// x = The resources object name. E.g. wood
function addStorage(x) {
    console.log(x);
    var shortages = [];

    for (i in x.storage.cost) {
        let obj = eval(resource[i]);

        if (obj.total < x.storage.cost[i]) {
            shortages.push(obj.name)
        }
    }

    if (shortages.length > 0) {
        console.log("Can't Afford This! You need more:", shortages);
    } else {
        for (ii in x.storage.cost) {
            let obj = eval(resource[ii]);

            obj.total -= x.storage.cost[ii]
        }
        x.max += x.storage.max;
        x.storage.total ++;
    }

    for (iii in x.storage.cost) {
        let obj = eval(x.storage.cost[iii]);
        x.storage.cost[iii] = Math.floor(obj * x.storage.costIncrease)
    }
}
