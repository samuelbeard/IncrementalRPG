/*
 * On Window Load
 */
window.onload = function() {
    setInterval(updateDisplay, meta.fps);
    setInterval(tick, meta.tick);
    setInterval(saveGame, meta.saveGameInterval);
    loadGame();
    initDisplay();
};

/*
 * Increments Resources
 */
function tick() {
    for (r in resource) {
        autoIncrementResource(eval(resource[r]));
    }

    for (w in workers) {
        if (eval(workers[w]).chance) {
            increaseChanceResourcesFromWorker(eval(workers[w]));
        }
    }
}

/*
 * Calculation Functions
 */
Calc = {
    /*
     * Spend Multiple Resources
     * arr - array = Array of arrays. Each contains the resource object slug and the amount to spend of that resource.
     *
     * Returns true if all resource has been spent.
     * Returns false if one resource cannot be spent. It will not spend any resources if one cannot be spent.
     */
    spendResources: function(arr) {
        var shortages = [];

        for (a in arr) {
            let objSlug = arr[a][0];
            let obj = eval(resource[objSlug]);
            let i = arr[a][1];
            let newValue = obj.total - i;

            if (newValue < 0) {
                shortages.push(obj.name);
            }
        }

        if (shortages.length === 0) {
            for (a in arr) {
                let objSlug = arr[a][0];
                let obj = eval(resource[objSlug]);
                let i = arr[a][1];
                obj.total -= i;
            }
            return true;
        } else {
            return false;
        }
    },

    /*
     * Takes an object of expenses and puts them into an array of arrays.
     * x - object = The cost object.
     * Returns an array or arrays [[the resource slug, the amount to spend], [...]]
     */
    expensesArray: function(x) {
        expenses = [];
        for (i in x) {
            let costValue = x[i];
            expenses.push([i, costValue]);
        }
        return expenses;
    }
};

/* TODO: REWRITE THIS FUNCTION TO RETURN TRUE OR FALSE & PUT IT IN Calc
 * Increase a Resource Total
 * x - object = The resource object.
 * i - number = The amount to increase the total by.
 */
function increaseResourceTotal(x, i) {
    newValue = x.total + i;

    // Check if the resource has a cost and manage that.
    if (typeof x.cost !== 'undefined') {
        for (c in x.cost) {
            let obj = eval(resource[c]);
            let costNum = eval(x.cost[c]);
            let newValueOfCost = obj.total - costNum;
            if (newValueOfCost >= 0) {
                obj.total -= costNum;
            } else {
                return;
            }
        }
    }

    if (newValue < x.max) {
        x.total += i;
        increaseChanceResources(x, i);
        return true;
    } else {
        x.total = x.max;
        return false;
    }
}

/*
 * Increment Resource from a Click
 * Initiated from the DOM
 * x - object = The resource object.
 */
function clickIncrement(x) {
    increaseResourceTotal(x, x.clickIncrement);
}

/*
 * Increment Resource Automatically
 * x - object = The resource object.
 */
function autoIncrementResource(x) {
    if (x.autoIncrement > 0) {
        increaseResourceTotal(x, x.autoIncrement);
    }
}

/* AWFULLY WET
 * Increment Resource in the Chance Object of the Passed Resource
 * x - object = The resource object. (Which contains the `chance` object.)
 * i - number = The number of times the chance check should run.
 */
function increaseChanceResources(x, i) {
    if (typeof x.chance !== 'undefined') {
        for (c in x.chance) {
            var counter = 0;
            while (counter < i) {
                let num = x.chance[c];
                let rand = Math.floor(Math.random() * 101);
                if (rand <= num) {
                    let obj = eval(resource[c]);
                    increaseResourceTotal(obj, obj.chanceIncrement);
                }
                counter++;
            }
        }
    }
}

/* AWFULLY WET
 * Increment Resource in the Chance Object or the Passed Worker
 * x - object = The worker object. (Which contains the `chance` object.)
 */
function increaseChanceResourcesFromWorker(x) {
    for (c in x.chance) {
        let obj = eval(resource[c]);
        i = obj.chanceIncrement;
        var counter = 0;
        while (counter < i) {
            var secondCounter = 0;
            while (secondCounter < x.total) {
                let num = x.chance[c];
                let rand = Math.floor(Math.random() * 101);
                if (rand <= num) {
                    let obj = eval(resource[c]);
                    increaseResourceTotal(obj, i);
                }
                secondCounter++;
            }
            counter++;
        }
    }
}

/*
 * Add Storage to a Resource
 * Initiated from the DOM
 * x - object = The resource object.
 */
function addStorage(x) {
    if (Calc.spendResources(Calc.expensesArray(x.storage.cost))) {
        x.max += x.storage.max;
        x.storage.total++;

        for (iii in x.storage.cost) {
            let obj = eval(x.storage.cost[iii]);
            x.storage.cost[iii] = Math.floor(obj * x.storage.costIncrease);
        }
    }
}

/*
 * Buy a Residential Building
 * Initiated from the DOM
 * x - object = The buildings object.
 */
function buyBuilding(x) {
    if (Calc.spendResources(Calc.expensesArray(x.cost))) {
        x.total++;
        meta.maxPopulation += x.residents;

        for (iii in x.cost) {
            let obj = eval(x.cost[iii]);
            x.cost[iii] = Math.floor(obj * x.costIncrease);
        }
    }
}

/*
 * Add a Worker
 * Initiated from the DOM
 * x - object = The worker object.
 */
function buyWorker(x) {
    // Stop the function if there isn't enough population capacity.
    if (meta.population >= meta.maxPopulation) {
        return;
    }

    if (Calc.spendResources(Calc.expensesArray(x.cost))) {
        x.total++;
        meta.population++;

        let res = eval(resource[x.resource]);
        res.autoIncrement += x.autoIncrement;

        for (iii in x.cost) {
            let obj = eval(x.cost[iii]);
            x.cost[iii] = Math.floor(obj * x.costIncrease);
        }
    }
}
