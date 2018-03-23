window.onload = function() {
    updateDisplay();
    setInterval(updateDisplay, 100);
    setInterval(tick, 5000);
    setInterval(saveGame, 10000);
    loadGame();
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

        for (iii in x.storage.cost) {
            let obj = eval(x.storage.cost[iii]);
            x.storage.cost[iii] = Math.floor(obj * x.storage.costIncrease)
        }
    }
}

function unlock(x) {
    var shortages = []

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
