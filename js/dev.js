function clearLocalStorage() {
    localStorage.clear();
    window.location.reload();
}

function maxEverything() {
    for (r in resource) {
        let obj = eval(resource[r]);
        obj.total = obj.max;
    }
}

function upStorage() {
    for (r in resource) {
        let obj = eval(resource[r]);
        obj.max *= 2;
    }
}

function dev() {
    upStorage();
    maxEverything();
}

function clear() {
    clearLocalStorage();
}
