/*
 * Update all the Values in the DOM
 * Runs every meta.fps milliseconds.
 */
function updateDisplay() {
    // Resources
    for (r in resource) {
        let obj = eval(resource[r]);
        document.getElementById(`${r}-total`).innerHTML = obj.total.toLocaleString();
        document.getElementById(`${r}-max`).innerHTML = obj.max.toLocaleString();
        document.getElementById(`${r}-storage-total`).innerHTML = obj.storage.total;
        document.getElementById(`${r}-auto-increment`).innerHTML = obj.autoIncrement;

        if (r.clickIncrement) {
            document.getElementById(`${r}-click-increment`).innerHTML = obj.clickIncrement;
        }

        if (typeof obj.cost !== 'undefined') {
            for (c in obj.cost) {
                document.getElementById(`${r}-${c}-cost`).innerHTML = obj.cost[c];
            }
        }

        for (c in obj.storage.cost) {
            let elem = document.getElementById(`${r}-${c}-storage-cost`);
            elem.innerHTML = obj.storage.cost[c];
            colorText(obj.storage.cost[c], eval(resource[c].total), elem);
        }
    }

    // Buildings
    for (b in buildings) {
        let obj = eval(buildings[b]);

        document.getElementById(`${b}-total`).innerHTML = obj.total;
        document.getElementById(`${b}-residents`).innerHTML = obj.residents;

        for (c in obj.cost) {
            let elem = document.getElementById(`${b}-${c}-cost`);
            elem.innerHTML = obj.cost[c];
            colorText(obj.cost[c], eval(resource[c].total), elem);
        }
    }

    // Workers
    for (w in workers) {
        let obj = eval(workers[w]);
        document.getElementById(`${w}-total`).innerHTML = obj.total;

        for (c in workers[w].cost) {
            let elem = document.getElementById(`${w}-${c}-cost`);
            elem.innerHTML = obj.cost[c];
            colorText(obj.cost[c], eval(resource[c].total), elem);
        }
    }

    // Upgrades
    for (u in upgrades) {
        let obj = eval(upgrades[u]);
        document.getElementById(`${u}-name`).innerHTML = obj.name;
        document.getElementById(`${u}-description`).innerHTML = obj.description;

        for (c in obj.cost) {
            let elem = document.getElementById(`${u}-${c}-cost`);
            elem.innerHTML = obj.cost[c];
            colorText(obj.cost[c], eval(resource[c].total), elem);
        }
    }

    document.getElementById('population-max').innerHTML = meta.maxPopulation;
    document.getElementById('population-total').innerHTML = meta.population;
}

/*
 * Update the DOM Values when it Loads
 */
function initDisplay() {
    for (u in upgrades) {
        if (eval(upgrades[u]).visible === false) {
            let obj = eval(upgrades[u]);
            let id = 'upgrade-' + obj.name.replace(' ', '-').toLowerCase();
            document.getElementById(id).classList.add('hidden');
        }
    }

    // Add resources and storage buttons to DOM
    for (r in resource) {
        let obj = eval(resource[r]);

        if (obj.clickIncrement) {
            var clickHTML = `<button class="btn btn-primary btn-block" onmousedown="clickIncrement(resource.${obj.slug})">${obj.action} <span id="${obj.slug}-click-increment"></span> ${obj.name}</button>`;
        } else {
            var clickHTML = `<button class="btn btn-default btn-block disabled">${obj.name}</button>`;
        }

        if (resource[r].cost !== 'undefined') {
            var resourceCostStr = '';
            for (c in resource[r].cost) {
                resourceCostStr += `<button class="btn btn-primary btn-block disabled">-<span id="${obj.slug}-${c}-cost"></span> ${c}</button>`;
            }
        }

        let resourceStr = `
        <div class="row">
            <div class="col-xs-3">
                ${clickHTML}
            </div>
            <div class="col-xs-3">
                <button class="btn btn-default btn-block disabled">
                    <span id="${obj.slug}-total"></span> /
                    <span id="${obj.slug}-max"></span>
                </button>
            </div>
            <div class="col-xs-3">
                <span class="btn btn-default btn-block disabled">
                    <span id="${obj.slug}-auto-increment"></span>
                    <span>/ ${meta.tick / 1000}s</span>
                </span>
            </div>
            <div class="col-xs-3">
                ${resourceCostStr}
            </div>
        </div>
        `;

        let resourceParent = document.getElementById('resources');
        resourceParent.innerHTML += resourceStr;

        var costStr = '';
        for (c in resource[r].storage.cost) {
            costStr += `<span id="${obj.slug}-` + c + `-storage-cost"></span> ` + c + ` | `;
        }

        let storageStr = `
        <div class="row">
            <div class="col-xs-4">
                <button class="btn btn-danger btn-block" onmousedown="addStorage(resource.${obj.slug})">Build ${obj.name} Storage</button>
            </div>
            <div class="col-xs-4">
                <button id="${obj.slug}-storage-total" class="btn btn-default btn-block disabled">0</button>
            </div>
            <div class="col-xs-4">
                <h6>| ${costStr}<h6>+${obj.storage.max} ${obj.name} Storage</h6>
            </div>
        </div>
        `;

        let storageParent = document.getElementById('storage-buttons');
        storageParent.innerHTML += storageStr;
    }

    // Add workers buttons to the DOM
    for (w in workers) {
        let obj = eval(workers[w]);

        var costStr = '';
        for (c in workers[w].cost) {
            costStr += `<span id="${obj.slug}-` + c + `-cost"></span> ` + c + ` | `;
        }

        let workerStr = `
        <div class="row">
            <div class="col-xs-4">
                <button class="btn btn-block btn-success" onmousedown="buyWorker(workers.${obj.slug})">Create ${obj.name}</button>
            </div>
            <div class="col-xs-4">
                <button id="${obj.slug}-total" class="btn btn-block btn-default disabled"></button>
            </div>
            <div class="col-xs-4">
                <h6>| ${costStr} </h6>
                <h6>+1 ${obj.name}</h6>
            </div>
        </div>
        `;

        let workerParent = document.getElementById('workers');
        workerParent.innerHTML += workerStr;
    }

    // Add buildings to DOM
    for (b in buildings) {
        let obj = eval(buildings[b]);

        var costStr = '';
        for (c in buildings[b].cost) {
            costStr += `<span id="${obj.slug}-${c}-cost"></span> ${c} | `;
        }

        var buildingStr = `
        <div class="row">
            <div class="col-xs-4">
                <button id="${obj.slug}-build" class="btn btn-danger btn-block" onmousedown="buyBuilding(buildings.${obj.slug})">Build ${obj.name}</button>
            </div>
            <div class="col-xs-4">
                <button id="${obj.slug}-total" class="btn btn-default btn-block disabled"></button>
            </div>
            <div class="col-xs-4">
                <h6>${costStr}</h6>
                <h6>+<span id="${obj.slug}-residents"></span> Population</h6>
            </div>
        </div>
        `;
        let buildingParent = document.getElementById('buildings');
        buildingParent.innerHTML += buildingStr;
    }

    if (meta.devmode === true) {
        document.getElementById('dev-buttons').classList.remove('hidden');
    }

    document.getElementById('version-number').innerHTML = meta.versionNumber;
}

/*
 * Colours Text Based on if the Player can Afford it.
 */
function colorText(cost, resource, elem) {
    if (cost > resource) {
        elem.style.color = 'red';
    } else {
        elem.style.color = 'black';
    }
}
