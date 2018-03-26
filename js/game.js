window.onload = function() {
    setInterval(updateDisplay, 100);
    setInterval(tick, 5000);
    setInterval(saveGame, 30000);
    loadGame();
    initDisplay();
}

// Increments resources.
function tick() {
    for (r in resource) {
        autoIncrementResource(eval(resource[r]))
    }
}

// x is the resource object, i is the amount to increase by.
function increaseResourceTotal(x, i) {
    newValue = x.total + i;

    if (newValue < x.max) {
        x.total += i;
        increaseChanceResources(x, i)
        return true;
    } else {
        x.total = x.max;
        return false;
    }
}

function clickIncrement(x) {
    increaseResourceTotal(x, x.clickIncrement)
}

function autoIncrementResource(x) {
    if (x.autoIncrement > 0) {
        increaseResourceTotal(x, x.autoIncrement)
    }
}

function increaseChanceResources(x, i) {
    if (x.chance) {
        for (c in x.chance) {
            let counter = 1
            while (counter < i) {
                let num = x.chance[c];
                let rand = Math.floor(Math.random() * 101)
                if (rand <= num) {
                    let obj = eval(resource[c]);
                    increaseResourceTotal(obj, obj.chanceIncrement)
                }
                counter++;
            }
        }
    }
}

function stopAlert(x) {
    meta.infoAlerts[x] = false;
}

// Add storage for a resource
// x = The resources object name. E.g. wood
function addStorage(x) {
    var shortages = [];

    for (i in x.storage.cost) {
        let obj = eval(resource[i]);

        if (obj.total < x.storage.cost[i]) {
            shortages.push(obj.name)
        }
    }

    if (shortages.length > 0) {
        let msg = "Can't afford this! You need more " + shortages.join(", ");
        message(msg, "info");
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
        let msg = "Can't afford this! You need more " + shortages.join(", ");
        message(msg, "info");
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
        let msg = "Can't afford this! You need more " + shortages.join(", ");
        message(msg, "info");
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
                // console.log(x.name, "Unlocked");
                message(x,name + " Unlocked", "info");
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
        let msg = "Can't afford this! You need more " + shortages.join(", ");
        message(msg, "info");
    } else {
        // Spend the resources.
        for (ii in x.cost) {
            let obj = eval(resource[ii]);

            obj.total -= x.cost[ii]
        }

        // Alter values
        x.total ++;
        meta.population ++;

        let res = eval(resource[x.resource])
        res.autoIncrement += x.autoIncrement

        for (iii in x.cost) {
            let obj = eval(x.cost[iii]);
            x.cost[iii] = Math.floor(obj * x.costIncrease)
        }
    }
}
