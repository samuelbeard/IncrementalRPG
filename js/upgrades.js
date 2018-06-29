/*
 * Handle Click Increment Upgrades
 * r - object = The resource object.
 * i - number = The new clickIncrement value for said object.
 * u - object = The upgrade object
 */
function clickIncrementUpgrade(r, i, u) {
    if (Calc.spendResources(Calc.expensesArray(u.cost))) {
        // Do upgrade
        r.clickIncrement = i;

        // Hide upgrade
        let id = 'upgrade-' + u.name.replace(' ', '-').toLowerCase();
        document.getElementById(id).classList.add('hidden');
        u.visible = false;
        u.live = true;

        // Check for nextTier and show it
        if (u.nextTier) {
            var tierObj = eval(upgrades[u.nextTier]);
            let id = 'upgrade-' + tierObj.name.replace(' ', '-').toLowerCase();
            document.getElementById(id).classList.remove('hidden');
            tierObj.visible = true;
        }
    }
}

/*
 * Handle Resident Capacity Upgrades
 * r - object = The resident/building object.
 * i - number = The new resident value for said object.
 * u - object = The upgrade object
 */
function residentSizeUpgrade(r, i, u) {
    if (Calc.spendResources(Calc.expensesArray(u.cost))) {
        // Do upgrade
        r.residents = i;

        // Hide Upgrade
        let id = 'upgrade-' + u.name.replace(' ', '-').toLowerCase();
        document.getElementById(id).classList.add('hidden');
        u.visible = false;
        u.live = true;

        // Check for next tier
        if (u.nextTier) {
            var tierObj = eval(upgrades[u.nextTier]);
            let id = 'upgrade-' + tierObj.name.replace(' ', '-').toLowerCase();
            document.getElementById(id).classList.remove('hidden');
            tierObj.visible = true;
        }
    }
}
