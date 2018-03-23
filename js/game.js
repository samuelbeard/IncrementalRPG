window.onload = function() {
    initDisplay();
    updateDisplay();
    setInterval(updateDisplay, 100);
    setInterval(tick, 5000);
    setInterval(saveGame, 10000);
    loadGame();
}

// Increments resources.
function tick() {
    autoIncrementResource(workers.lumberjack);
    autoIncrementResource(workers.miner);
    autoIncrementResource(workers.scrapper);
    autoIncrementResource(workers.hunter);
}

function clickIncrement(x) {
    if (x.total >= x.max) {
        console.log("Max " + x.name);
    } else {
        x.total += x.clickIncrement;
    }
}

function autoIncrementResource(x) {
    let r = eval(resource[x.resource])
    let inc = x.total * x.autoIncrement;
    let max = r.max;
    let newValue = r.total + inc;

    if (newValue <= max) {
        r.total += inc;
    } else {
        r.total = max;
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

        for (iii in x.storage.cost) {
            let obj = eval(x.storage.cost[iii]);
            x.storage.cost[iii] = Math.floor(obj * x.storage.costIncrease)
        }
    }
}

function buyBuilding(x) {
    var shortages = [];

    for (i in x.cost) {
        let obj = eval(resource[i]);

        if (obj.total < x.cost[i]) {
            shortages.push(obj.name)
        }
    }

    if (shortages.length > 0) {
        console.log("Can't Afford This! You need more:", shortages);
    } else {
        for (ii in x.cost) {
            let obj = eval(resource[ii]);

            obj.total -= x.cost[ii]
        }

        x.total ++;
        meta.maxPopulation += x.residents;

        for (iii in x.cost) {
            let obj = eval(x.cost[iii]);
            x.cost[iii] = Math.floor(obj * x.costIncrease)
        }
    }
}

function unlockBuilding(x) {
    var shortages = [];

    for (i in x.research.cost) {
        let obj = eval(resource[i]);

        if (obj.total < x.research.cost[i]) {
            shortages.push(obj.name)
        }
    }

    if (shortages.length > 0) {
        console.log("Can't Afford This! You need more:", shortages);
    } else {
        // Spend the resources.
        for (ii in x.research.cost) {
            let obj = eval(resource[ii]);

            obj.total -= x.research.cost[ii]
        }

        propName = x.name.toLowerCase() // This gets the JSON property name. This is a really dodgy way of doing it and needs to be fixed.

        x.research.isUnlocking = true;
        document.getElementById(propName + "-progress-wrap").classList.remove("hidden");
        document.getElementById(propName + "-research").classList.add("hidden");

        percentageIncrements = parseFloat((100 / x.research.unlockTime).toFixed(2)) / 5

        unlock = setInterval(function() {
            x.research.unlockedPercent += percentageIncrements;

            // Research Complete:
            if (x.research.unlockedPercent >= 100) {
                x.research.locked = false;
                x.research.isUnlocking = false;
                document.getElementById(propName + "-progress-wrap").classList.add("hidden");
                document.getElementById(propName + "-build").classList.remove("hidden");
                clearInterval(unlock)
                console.log(x.name, "Unlocked");
            }
        }, 200);
    }

}

function buyWorker(x) {
    var shortages = [];

    for (i in x.cost) {
        let obj = eval(resource[i]);

        if (obj.total < x.cost[i]) {
            shortages.push(obj.name)
        }
    }

    if (meta.population >= meta.maxPopulation) {
        shortages.push("Population Capacity")
    }

    if (shortages.length > 0) {
        console.log("Can't Afford This! You need more:", shortages);
    } else {
        console.log("Getting a new worker.");
        // Spend the resources.
        for (ii in x.cost) {
            let obj = eval(resource[ii]);

            obj.total -= x.cost[ii]
        }

        x.total ++;
        meta.population ++;

        for (iii in x.cost) {
            let obj = eval(x.cost[iii]);
            x.cost[iii] = Math.floor(obj * x.costIncrease)
        }
    }
}
