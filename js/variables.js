var meta = {
    town: "",
    mayor: "",
    population: 0,
}

var resource = {
    wood: {
        name: "Wood",
        description: "Brown stuff that grows on trees.",
        total: 100,
        clickIncrement: 1,
        autoIncrement: 1,
        max: 100,
        storage: {
            total: 0,
            max: 100,
            cost: {
                wood: 50,
                stone: 50,
            },
            costIncrease: 1.1
        }
    },
    stone: {
        name: "Stone",
        description: "Hard stuff.",
        total: 100,
        clickIncrement: 1,
        autoIncrement: 0,
        max: 100,
        storage: {
            total: 0,
            max: 100,
            cost: {
                wood: 50,
                stone: 50,
            },
            costIncrease: 1.1
        }
    },
    iron: {
        name: "Iron",
        description: "Even harder stuff. Bit rusty.",
        total: 0,
        clickIncrement: 1,
        autoIncrement: 0,
        max: 100,
        storage: {
            total: 0,
            max: 100,
            cost: {
                wood: 100,
                stone: 100,
            },
            costIncrease: 1.1
        }
    },
    food: {
        name: "Food",
        description: "Goes into mouths.",
        total: 0,
        clickIncrement: 1,
        autoIncrement: 0,
        max: 100,
        storage: {
            total: 0,
            max: 100,
            cost: {
                wood: 50,
                stone: 50,
            },
            costIncrease: 1.1
        }
    }
}

var workers = {
    lumberjack: {
        name: "Lumberjack",
        description: "A person who likes to chop wood.",
        total: 0,
        autoIncrement: 1,
        cost: {
            food: 10
        }
    },
    miner: {
        name: "Miner",
        description: "Not a young person.",
        total: 0,
        autoIncrement: 1,
        cost: {
            food: 10
        }
    },
    scrapper: {
        name: "Scrapper",
        description: "Not someone who gets into lots of fights.",
        total: 0,
        autoIncrement: 1,
        cost: {
            food: 10
        }
    },
    hunter: {
        name: "Hunter",
        description: "The opposite to a gatherer.",
        total: 0,
        autoIncrement: 1,
        cost: {
            food: 10
        }
    }
}

var buildings = {
    tent: {
        name: "Tent",
        description: "Just like a house but way smaller and made out of fabric.",
        total: 0,
        residents: 1,
        cost: {
            wood: 30
        }
    },
    house: {
        name: "House",
        description: "Just like a tent but way bigger and not made out of fabric.",
        total: 0,
        residents: 1,
        cost: {
            wood: 75,
            stone: 25
        }
    },
    hostel: {
        name: "Hostel",
        description: "A bit like a house but not as nice and not as private.",
        total: 0,
        residents: 10,
        cost: {
            wood: 200,
            stone: 215
        }
    }
}
