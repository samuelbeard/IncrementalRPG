function updateDisplay() {
    for (r in resource) {
        document.getElementById(r + "-total").innerHTML = eval(resource[r].total)
        document.getElementById(r + "-max").innerHTML = eval(resource[r].max)
        document.getElementById(r + "-click-increment").innerHTML = eval(resource[r].clickIncrement)
        document.getElementById(r + "-auto-increment").innerHTML = eval(resource[r].autoIncrement)
        document.getElementById(r + "-storage-total").innerHTML = eval(resource[r].storage.total)

        for (c in resource[r].storage.cost) {
            document.getElementById(r + "-" + c + "-storage-cost").innerHTML = eval(resource[r].storage.cost[c])
        }
    }

    for (b in buildings) {
        document.getElementById(b + "-total").innerHTML = eval(buildings[b].total)
    }

    if (buildings.hostel.research.isUnlocking === true) {
        document.getElementById("hostel-percentage").innerHTML = buildings.hostel.research.unlockedPercent.toFixed(2);
        document.getElementById("hostel-progress-bar").style.left = buildings.hostel.research.unlockedPercent + "%";
    }

    document.getElementById("population-total").innerHTML = meta.population;
}
