var resource = {
    wood: {
        name: "Wood",
        description: "Brown stuff that grows on trees.",
        total: 0,
        clickIncrement: 1,
        autoIncrement: 1,
        max: 20,
        storage: {
            total: 0,
            max: 20,
            cost: {
                wood: 10,
                stone: 10,
            },
            costIncrease: 1.5
        }
    },
    stone: {
        name: "Stone",
        description: "Hard stuff.",
        total: 20,
        clickIncrement: 1,
        autoIncrement: 0,
        max: 20,
        storage: {
            total: 0,
            max: 20,
            cost: {
                wood: 10,
                stone: 10,
            },
            costIncrease: 1.5
        }
    }
}

// Recalculate Maximum Values - This is only used if when storage is upgrade, all existing storages are upgraded also.
// wood.max = (wood.storage.max * wood.storage.total) + wood.max;
