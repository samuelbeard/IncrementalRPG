function updateDisplay() {

    // Resources
    for (r in resource) {
        document.getElementById(r + "-total").innerHTML = eval(resource[r].total)
        document.getElementById(r + "-max").innerHTML = eval(resource[r].max)
        document.getElementById(r + "-click-increment").innerHTML = eval(resource[r].clickIncrement)
        document.getElementById(r + "-storage-total").innerHTML = eval(resource[r].storage.total)

        let obj = eval(resource[r])
        let w = eval(workers[obj.worker])
        let value = w.total * w.autoIncrement;
        document.getElementById(r + "-auto-increment").innerHTML = value

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
}
