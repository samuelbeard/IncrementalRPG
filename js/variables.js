var meta = {
    devmode: true,
    town: "",
    mayor: "",
    maxPopulation: 0,
    population: 0,
    infoAlerts: {
        welcome: true,
        workers: true,
        accommodation: true,
        storage: true
    }
}

var resource = {
    wood: {
        name: "Wood",
        description: "Brown stuff that grows on trees.",
        worker: "lumberjack",
        total: 0,
        clickIncrement: 1,
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
        worker: "miner",
        total: 0,
        clickIncrement: 1,
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
        worker: "scrapper",
        total: 0,
        clickIncrement: 1,
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
        description: "Goes into mouths and is the leading cause of obesity.",
        worker: "hunter",
        total: 0,
        clickIncrement: 1,
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
        resource: "wood",
        total: 0,
        autoIncrement: 1,
        cost: {
            food: 10
        },
        costIncrease: 1.1
    },
    miner: {
        name: "Miner",
        description: "Not a young person.",
        resource: "stone",
        total: 0,
        autoIncrement: 1,
        cost: {
            food: 10
        },
        costIncrease: 1.1
    },
    scrapper: {
        name: "Scrapper",
        description: "Not someone who gets into lots of fights.",
        resource: "iron",
        total: 0,
        autoIncrement: 1,
        cost: {
            food: 10
        },
        costIncrease: 1.1
    },
    hunter: {
        name: "Hunter",
        description: "The opposite to a gatherer.",
        resource: "food",
        total: 0,
        autoIncrement: 1,
        cost: {
            food: 10
        },
        costIncrease: 1.1
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
        },
        costIncrease: 1.1
    },
    house: {
        name: "House",
        description: "Just like a tent but way bigger and not made out of fabric.",
        total: 0,
        residents: 4,
        cost: {
            wood: 75,
            stone: 25,
            iron: 10
        },
        costIncrease: 1.1
    },
    hostel: {
        name: "Hostel",
        description: "A bit like a house but not as nice and not as private.",
        total: 0,
        residents: 10,
        cost: {
            wood: 200,
            stone: 215
        },
        costIncrease: 1.1,
        research: {
            locked: true,
            unlockedPercent: 0,
            unlockTime: 60,
            isUnlocking: false,
            cost: {
                wood: 600,
                stone: 350
            }
        }
    }
}

var upgrades = {
    twoAxes: {
        name: "Two Axes",
        description: "Two wood per click.",
        cost: {
            wood: 200,
            stone: 100,
            food: 100
        },
        live: false,
        visible: true,
        nextTier: "fiveAxes"
    },
    fiveAxes: {
        name: "Five Axes",
        description: "Five wood per click.",
        cost: {
            wood: 800,
            stone: 400,
            food: 400
        },
        live: false,
        visible: false,
        nextTier: "tenAxes"
    },
    tenAxes: {
        name: "Ten Axes",
        description: "Ten wood per click.",
        cost: {
            wood: 2000,
            stone: 1000,
            food: 1000
        },
        live: false,
        visible: false,
    },
    twoPickaxes: {
        name: "Two Pickaxes",
        description: "Two stone per click.",
        cost: {
            wood: 100,
            stone: 200,
            food: 100
        },
        live: false,
        visible: true,
        nextTier: "fivePickaxes"
    },
    fivePickaxes: {
        name: "Five Pickaxes",
        description: "Five stone per click.",
        cost: {
            wood: 400,
            stone: 800,
            food: 400
        },
        live: false,
        visible: false,
        nextTier: "tenPickaxes"
    },
    tenPickaxes: {
        name: "Ten Pickaxes",
        description: "Ten stone per click.",
        cost: {
            wood: 1000,
            stone: 2000,
            food: 1000
        },
        live: false,
        visible: false,
    },
    twoWreckages: {
        name: "Two Wreckages",
        description: "Two iron per click.",
        cost: {
            wood: 100,
            stone: 100,
            iron: 200,
            food: 100
        },
        live: false,
        visible: true,
        nextTier: "fiveWreckages"
    },
    fiveWreckages: {
        name: "Five Wreckages",
        description: "Five iron per click.",
        cost: {
            wood: 400,
            stone: 400,
            iron: 800,
            food: 400
        },
        live: false,
        visible: false,
        nextTier: "tenWreckages"
    },
    tenWreckages: {
        name: "Ten Wreckages",
        description: "Ten iron per click.",
        cost: {
            wood: 1000,
            stone: 1000,
            iron: 2000,
            food: 1000
        },
        live: false,
        visible: false,
    },
    twoArrows: {
        name: "Two Arrows",
        description: "Two food per click.",
        cost: {
            wood: 100,
            stone: 100,
            food: 200
        },
        live: false,
        visible: true,
        nextTier: "fiveArrows"
    },
    fiveArrows: {
        name: "Five Arrows",
        description: "Five food per click.",
        cost: {
            wood: 400,
            stone: 400,
            food: 800
        },
        live: false,
        visible: false,
        nextTier: "tenArrows"
    },
    tenArrows: {
        name: "Ten Arrows",
        description: "Ten food per click.",
        cost: {
            wood: 1000,
            stone: 1000,
            food: 2000
        },
        live: false,
        visible: false,
    },

}
