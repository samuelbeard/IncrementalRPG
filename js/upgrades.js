/*
 * USE THE Calc FUNCTIONS
 */
function checkResources(arr) {
    for (res in arr) {
        name = arr[res][0];
        cost = arr[res][1];

        resourceObj = eval(resource[name])
        totalResources = resourceObj.total

        if (totalResources < cost) {
            return false
        }
    }
    return true;
}

/*
 * USE THE Calc FUNCTIONS
 */
function spendResources(arr) {
    for (res in arr) {
        name = arr[res][0];
        cost = arr[res][1];

        resourceObj = eval(resource[name])
        resourceObj.total -= cost
    }
}

/*
 * Handle Click Increment Upgrades
 * r - object = The resource object.
 * i - number = The new clickIncrement value for said object.
 * u - object = The upgrade object
 */
function clickIncrementUpgrade(r, i, u) {
    // Check for resources
    arr = []
    for (res in u.cost) {
        int = eval(u.cost[res])
        arr.push([res, int])
    }

    if (checkResources(arr)) {
        spendResources(arr)

        // Do upgrade
        r.clickIncrement = i;

        // Hide upgrade
        let id = "upgrade-" + u.name.replace(" ", "-").toLowerCase()
        document.getElementById(id).classList.add("hidden");
        u.visible = false;
        u.live = true;
        console.log(u);

        // Check for nextTier and show it
        if (u.nextTier) {
            var tierObj = eval(upgrades[u.nextTier]);
            let id = "upgrade-" + tierObj.name.replace(" ", "-").toLowerCase()
            document.getElementById(id).classList.remove("hidden");
            tierObj.visible = true;
        } else {
            console.log("No next tier");
        }

    } else {
        message("You can't afford this upgrade.", "info")
    }
}

/*
 * Handle Resident Capacity Upgrades
 * r - object = The resident/building object.
 * i - number = The new resident value for said object.
 * u - object = The upgrade object
 */
function residentSizeUpgrade(r, i, u) {
    console.log("r", r, "|| i", i, "||u", u);
    arr = [];
    for (res in u.cost) {
        int = eval(u.cost[res])
        arr.push([res, int])
    }

    if (checkResources(arr)) {
        spendResources(arr)

        // Do upgrade
        r.residents = i;

        // Hide Upgrade
        let id = "upgrade-" + u.name.replace(" ", "-").toLowerCase()
        document.getElementById(id).classList.add("hidden");
        u.visible = false;
        u.live = true;

        // Check for next tier
        if (u.nextTier) {
            var tierObj = eval(upgrades[u.nextTier]);
            let id = "upgrade-" + tierObj.name.replace(" ", "-").toLowerCase()
            document.getElementById(id).classList.remove("hidden");
            tierObj.visible = true;
        } else {
            console.log("No next tier");
        }
    } else {
        message("You can't afford this upgrade.", "info")
    }
}
