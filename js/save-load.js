function saveGame() {
    console.log("Saving Game");
    localStorage['rpg_save[meta]'] = btoa(JSON.stringify(meta));
    localStorage['rpg_save[resource]'] = btoa(JSON.stringify(resource));
    localStorage['rpg_save[workers]'] = btoa(JSON.stringify(workers));
    localStorage['rpg_save[buildings]'] = btoa(JSON.stringify(buildings));
}

function loadGame() {
    if (!localStorage['rpg_save[meta]']) {
        console.log("No Saved Game - Starting Fresh");
        return;
    } else {
        console.log("Loading Saved Game");
    }

    meta = JSON.parse(atob(localStorage['rpg_save[meta]']));
    resource = JSON.parse(atob(localStorage['rpg_save[resource]']));
    workers = JSON.parse(atob(localStorage['rpg_save[workers]']));
    buildings = JSON.parse(atob(localStorage['rpg_save[buildings]']));
}

function clearLocalStorage() {
    localStorage.clear();
    window.location.reload();
}
