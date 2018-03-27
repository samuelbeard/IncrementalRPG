function updateDisplay() {

    // Resources
    for (r in resource) {
        document.getElementById(r + "-total").innerHTML = eval(resource[r].total)
        document.getElementById(r + "-max").innerHTML = eval(resource[r].max)

        if (r.clickIncrement) {
            document.getElementById(r + "-click-increment").innerHTML = eval(resource[r].clickIncrement)
        }

        document.getElementById(r + "-storage-total").innerHTML = eval(resource[r].storage.total)

        document.getElementById(r + "-auto-increment").innerHTML = eval(resource[r].autoIncrement)

        for (c in resource[r].storage.cost) {
            document.getElementById(r + "-" + c + "-storage-cost").innerHTML = eval(resource[r].storage.cost[c])
        }
    }

    // Buildings
    for (b in buildings) {
        document.getElementById(b + "-total").innerHTML = eval(buildings[b].total)
        document.getElementById(b + "-residents").innerHTML = eval(buildings[b].residents)

        for (c in buildings[b].cost) {
            document.getElementById(b + "-" + c + "-cost").innerHTML = eval(buildings[b].cost[c])
        }

        if (buildings[b].research) {
            for (rc in buildings[b].research.cost) {
                document.getElementById(b + "-" + rc + "-research-cost").innerHTML = eval(buildings[b].research.cost[rc])
            }
        }

    }

    // TODO: Make this loop through all buildings.
    if (buildings.hostel.research.isUnlocking === true) {
        document.getElementById("hostel-percentage").innerHTML = buildings.hostel.research.unlockedPercent.toFixed(2);
        document.getElementById("hostel-progress-bar").style.left = buildings.hostel.research.unlockedPercent + "%";
    }

    // Workers
    for (w in workers) {
        document.getElementById(w + "-total").innerHTML = eval(workers[w].total)

        for (c in workers[w].cost) {
            document.getElementById(w + "-" + c + "-cost").innerHTML = eval(workers[w].cost[c])
        }
    }

    // Upgrades
    for (u in upgrades) {
        document.getElementById(u + "-name").innerHTML = eval(upgrades[u]).name;
        document.getElementById(u + "-description").innerHTML = eval(upgrades[u]).description;

        for (c in upgrades[u].cost) {
            document.getElementById(u + "-" + c + "-cost").innerHTML = eval(upgrades[u].cost[c])
        }
    }

    document.getElementById("population-max").innerHTML = meta.maxPopulation;
    document.getElementById("population-total").innerHTML = meta.population;
}

function initDisplay() {
    for (u in upgrades) {
        if (eval(upgrades[u]).visible === false) {
            let obj = eval(upgrades[u])
            let id = "upgrade-" + obj.name.replace(" ", "-").toLowerCase()
            document.getElementById(id).classList.add("hidden");
        }
    }

    // Add resources and storage buttons to DOM
    for (r in resource) {
        let obj = eval(resource[r]);

        if (obj.clickIncrement) {
            var clickHTML = `<button class="btn btn-primary btn-block" onmousedown="clickIncrement(resource.`+ obj.slug +`)">`+ obj.action +` <span id="`+ obj.slug +`-click-increment"></span> `+ obj.name +`</button>`;
        } else {
            var clickHTML = `<button class="btn btn-default btn-block disabled">`+ obj.name +`</button>`
        }

        let resourceStr = `
        <div class="row">
            <div class="col-xs-4">
                `+ clickHTML +`
            </div>
            <div class="col-xs-4">
                <button class="btn btn-default btn-block disabled">
                    <span id="`+ obj.slug +`-total"></span> /
                    <span id="`+ obj.slug +`-max"></span>
                </button>
            </div>
            <div class="col-xs-4">
                <span class="btn btn-default btn-block disabled">
                    <span id="`+ obj.slug +`-auto-increment"></span>
                    <span>/ 5s</span>
                </span>
            </div>
        </div>
        `

        let resourceParent = document.getElementById("resources")
        resourceParent.innerHTML += resourceStr;

        var costStr = "";
        for (c in resource[r].storage.cost) {
            costStr += `<span id="`+ obj.slug +`-`+ c +`-storage-cost"></span> `+ c +` | `
        }

        let storageStr = `
        <div class="row">
            <div class="col-xs-4">
                <button class="btn btn-danger btn-block" onmousedown="addStorage(resource.`+ obj.slug +`)">Build `+ obj.name +` Storage</button>
            </div>
            <div class="col-xs-4">
                <button id="`+ obj.slug +`-storage-total" class="btn btn-default btn-block disabled">0</button>
            </div>
            <div class="col-xs-4">
                <h6>| `+ costStr +`<h6>+`+ obj.storage.max +` `+ obj.name +` Storage</h6>
            </div>
        </div>
        `

        let storageParent = document.getElementById("storage-buttons");
        storageParent.innerHTML += storageStr;
    }

    // Add workers buttons to the DOM
    for (w in workers) {
        let obj = eval(workers[w]);

        let workerStr = `
        <div class="row">
            <div class="col-xs-4">
                <button class="btn btn-block btn-success" onmousedown="buyWorker(workers.`+ obj.slug +`)">Create `+ obj.name +`</button>
            </div>
            <div class="col-xs-4">
                <button id="`+ obj.slug +`-total" class="btn btn-block btn-default disabled"></button>
            </div>
            <div class="col-xs-4">
                <h6>-
                    <span id="`+ obj.slug +`-food-cost"></span> Food</h6>
                <h6>+1 `+ obj.name +`</h6>
            </div>
        </div>
        `

        let workerParent = document.getElementById("workers")
        workerParent.innerHTML += workerStr;
    }

    // Add buildings to DOM
    for (b in buildings) {
        let obj = eval(buildings[b]);
        var isResearched = function() {
            if (obj.research) {
                return true;
            } else {
                var isLocked = false;
                return false;
            }
        }
        var isLocked = function() {
            if (isResearched()) {
                return obj.research.locked;
            } else {
                return false;
            }
        }

        var costStr = "";
        for (c in buildings[b].cost) {
            costStr += `<span id="`+ obj.slug +`-`+ c +`-cost"></span> `+ c +` | `
        }

        if (isResearched() && isLocked()) {
            var researchCostStr = ""
            for (c in buildings[b].research.cost) {
                researchCostStr += `<span id="`+ obj.slug +`-`+ c +`-research-cost"></span> `+ c +` | `
            }

            var buildingStr = `
            <div class="row">
                <div class="col-xs-4">
                    <button id="`+ obj.slug +`-research" class="btn btn-danger btn-block" onmousedown="unlockBuilding(buildings.`+ obj.slug +`)">Consider `+ obj.name +`</button>
                    <div id="`+ obj.slug +`-progress-wrap" class="progress-wrap-`+ obj.slug +` progress hidden">
                        <span id="`+ obj.slug +`-percentage" class="researchingComment"></span>
                        <div id="`+ obj.slug +`-progress-bar" class="progress-bar-`+ obj.slug +` progress"></div>
                    </div>
                    <button id="`+ obj.slug +`-build" class="btn btn-danger btn-block hidden" onmousedown="buyBuilding(buildings.`+ obj.slug +`)">Build `+ obj.name +`</button>
                </div>

                <div class="col-xs-4">
                    <button id="`+ obj.slug +`-total" class="btn btn-default btn-block disabled">0</button>
                </div>
                <div class="col-xs-4">
                    <h6 class="`+ obj.slug +`Info hidden">| 
                        `+ costStr +`
                    </h6>
                    <h6 class="`+ obj.slug +`ResearchInfo">|
                        `+ researchCostStr +`
                    </h6>
                    <h6>+<span id="`+ obj.slug +`-residents"></span> Population</h6>
                </div>
            </div>
            `
        } else {
            var buildingStr = `
            <div class="row">
                <div class="col-xs-4">
                    <button id="`+ obj.slug +`-build" class="btn btn-danger btn-block" onmousedown="buyBuilding(buildings.`+ obj.slug +`)">Build `+ obj.name +`</button>
                </div>
                <div class="col-xs-4">
                    <button id="`+ obj.slug +`-total" class="btn btn-default btn-block disabled"></button>
                </div>
                <div class="col-xs-4">
                    <h6>`+ costStr +`</h6>
                    <h6>+<span id="`+ obj.slug +`-residents"></span> Population</h6>
                </div>
            </div>
            `
        }

        let buildingParent = document.getElementById("buildings")
        buildingParent.innerHTML += buildingStr;
    }

    if (meta.devmode === true) {
        document.getElementById("dev-buttons").classList.remove("hidden");
    }

    if (meta.infoAlerts.welcome === true) {
        document.getElementById("welcome-alert").classList.remove("hidden");
    }
    if (meta.infoAlerts.workers === true) {
        document.getElementById("workers-alert").classList.remove("hidden");
    }
    if (meta.infoAlerts.accommodation === true) {
        document.getElementById("accommodation-alert").classList.remove("hidden");
    }
    if (meta.infoAlerts.storage === true) {
        document.getElementById("storage-alert").classList.remove("hidden");
    }

    document.getElementById("version-number").innerHTML = meta.versionNumber;

}
