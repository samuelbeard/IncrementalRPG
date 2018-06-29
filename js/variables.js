var meta = {
    devmode: false,
    versionNumber: 'alpha 0.10.2',
    fps: 100,
    tick: 1000,
    saveGameInterval: 30000,
    maxPopulation: 0,
    population: 0
};

var resource = {
    wood: {
        slug: 'wood',
        name: 'Wood',
        description: 'Brown stuff that grows on trees.',
        action: 'Chop',
        total: 0,
        clickIncrement: 1,
        autoIncrement: 0,
        chanceIncrement: 1,
        max: 100,
        storage: {
            total: 1,
            max: 100,
            cost: {
                wood: 50,
                stone: 50
            },
            costIncrease: 1.1
        }
    },
    stone: {
        slug: 'stone',
        name: 'Stone',
        description: 'Hard stuff.',
        action: 'Mine',
        total: 0,
        clickIncrement: 1,
        autoIncrement: 0,
        chanceIncrement: 1,
        max: 100,
        storage: {
            total: 1,
            max: 100,
            cost: {
                wood: 50,
                stone: 50
            },
            costIncrease: 1.1
        },
        chance: {
            // Percent
            iron: 30,
            silver: 10,
            gold: 5
        }
    },
    brick: {
        slug: 'brick',
        name: 'Brick',
        description: 'Like rocks but square.',
        action: 'Make',
        total: 0,
        clickIncrement: 1,
        autoIncrement: 0,
        max: 100,
        cost: {
            stone: 2
        },
        storage: {
            total: 1,
            max: 100,
            cost: {
                wood: 100
            },
            costIncrease: 1.1
        }
    },
    meat: {
        slug: 'meat',
        name: 'Meat',
        description: 'Can be cooked to provide nutrition.',
        action: 'Hunt',
        total: 0,
        clickIncrement: 1,
        autoIncrement: 0,
        chanceIncrement: 1,
        max: 100,
        storage: {
            total: 1,
            max: 100,
            cost: {
                wood: 50,
                stone: 50
            },
            costIncrease: 1.1
        }
    },
    wheat: {
        slug: 'wheat',
        name: 'Wheat',
        description: 'Grows upwards.',
        action: 'Harvest',
        total: 0,
        clickIncrement: 1,
        autoIncrement: 0,
        max: 0,
        storage: {
            total: 0,
            max: 500,
            cost: {
                wood: 1000
            },
            costIncrease: 1.1
        }
    },
    bread: {
        slug: 'bread',
        name: 'Bread',
        description: 'Another version of food.',
        action: 'Bake',
        total: 0,
        clickIncrement: 1,
        autoIncrement: 0,
        chanceIncrement: 1,
        max: 100,
        cost: {
            wheat: 4
        },
        storage: {
            total: 1,
            max: 100,
            cost: {
                wood: 50,
                stone: 50
            },
            costIncrease: 1.1
        }
    },
    skin: {
        slug: 'skin',
        name: 'Skin',
        description: 'The thing that covers animals.',
        total: 0,
        autoIncrement: 0,
        chanceIncrement: 1,
        max: 50,
        storage: {
            total: 1,
            max: 50,
            cost: {
                wood: 100
            },
            costIncrease: 1.2
        }
    },
    leather: {
        slug: 'leather',
        name: 'Leather',
        description: 'Nice skin.',
        action: 'Make',
        total: 0,
        clickIncrement: 1,
        autoIncrement: 0,
        max: 100,
        cost: {
            skin: 2
        },
        storage: {
            total: 1,
            max: 100,
            cost: {
                wood: 100
            },
            costIncrease: 1.1
        }
    },
    iron: {
        slug: 'iron',
        name: 'Iron',
        description: 'Even harder stuff. Bit rusty.',
        total: 0,
        autoIncrement: 0,
        chanceIncrement: 1,
        max: 100,
        storage: {
            total: 1,
            max: 100,
            cost: {
                wood: 100,
                stone: 100
            },
            costIncrease: 1.1
        }
    },
    silver: {
        slug: 'silver',
        name: 'Silver',
        description: 'Shiney...',
        total: 0,
        autoIncrement: 0,
        chanceIncrement: 1,
        max: 100,
        storage: {
            total: 1,
            max: 100,
            cost: {
                wood: 300,
                iron: 500,
                gold: 10
            },
            costIncrease: 1.2
        }
    },
    gold: {
        slug: 'gold',
        name: 'Gold',
        description: 'Fancy!',
        total: 0,
        autoIncrement: 0,
        chanceIncrement: 1,
        max: 100,
        storage: {
            total: 1,
            max: 100,
            cost: {
                wood: 350,
                iron: 600,
                gold: 20
            },
            costIncrease: 1.3
        }
    }
};

var workers = {
    lumberjack: {
        slug: 'lumberjack',
        name: 'Lumberjack',
        description: 'A person who likes to chop wood.',
        resource: 'wood',
        total: 0,
        autoIncrement: 1,
        cost: {
            meat: 10
        },
        costIncrease: 1.1
    },
    miner: {
        slug: 'miner',
        name: 'Miner',
        description: 'Not a young person.',
        resource: 'stone',
        total: 0,
        autoIncrement: 1,
        cost: {
            meat: 10
        },
        costIncrease: 1.1
    },
    hunter: {
        slug: 'hunter',
        name: 'Hunter',
        description: 'The opposite to a gatherer.',
        resource: 'meat',
        total: 0,
        autoIncrement: 1,
        cost: {
            meat: 10
        },
        costIncrease: 1.1,
        chance: {
            // Percent
            skin: 10
        }
    },
    brickmaker: {
        slug: 'brickmaker',
        name: 'Brickmaker',
        description: "Isn't it obvious?",
        resource: 'brick',
        total: 0,
        autoIncrement: 1,
        cost: {
            meat: 10,
            stone: 1
        },
        costIncrease: 1.2
    },
    tanner: {
        slug: 'tanner',
        name: 'Tanner',
        description: 'Takes skins and turns them into leather using magic.',
        resource: 'leather',
        total: 0,
        autoIncrement: 1,
        cost: {
            meat: 10,
            bread: 10
        },
        costIncrease: 1.2
    },
    farmer: {
        slug: 'farmer',
        name: 'Farmer',
        description: 'Enjoys going up and down, up and down.',
        resource: 'wheat',
        total: 0,
        autoIncrement: 2,
        cost: {
            meat: 15,
            wheat: 10
        },
        costIncrease: 1.2
    },
    baker: {
        slug: 'baker',
        name: 'Baker',
        description: 'Really relies on the farmers.',
        resource: 'bread',
        total: 0,
        autoIncrement: 1,
        cost: {
            meat: 10
        },
        costIncrease: 1.1
    }
};

var buildings = {
    tent: {
        slug: 'tent',
        name: 'Tent',
        description: 'Just like a house but way smaller and made out of fabric.',
        total: 0,
        residents: 1,
        cost: {
            wood: 30
        },
        costIncrease: 1.1
    },
    house: {
        slug: 'house',
        name: 'House',
        description: 'Just like a tent but way bigger and not made out of fabric.',
        total: 0,
        residents: 4,
        cost: {
            wood: 75,
            stone: 10,
            iron: 10,
            brick: 50
        },
        costIncrease: 1.1
    },
    hostel: {
        slug: 'hostel',
        name: 'Hostel',
        description: 'A bit like a house but not as nice and not as private.',
        total: 0,
        residents: 10,
        cost: {
            wood: 200,
            stone: 30,
            iron: 30,
            brick: 200
        },
        costIncrease: 1.1
    }
};

var upgrades = {
    twoAxes: {
        name: 'Two Axes',
        description: 'Two wood per click.',
        cost: {
            wood: 200,
            stone: 100,
            meat: 100
        },
        live: false,
        visible: true,
        nextTier: 'fiveAxes'
    },
    fiveAxes: {
        name: 'Five Axes',
        description: 'Five wood per click.',
        cost: {
            wood: 800,
            stone: 400,
            meat: 400
        },
        live: false,
        visible: false,
        nextTier: 'tenAxes'
    },
    tenAxes: {
        name: 'Ten Axes',
        description: 'Ten wood per click.',
        cost: {
            wood: 2000,
            stone: 1000,
            meat: 1000
            // bread: 100
        },
        live: false,
        visible: false
    },
    twoPickaxes: {
        name: 'Two Pickaxes',
        description: 'Two stone per click.',
        cost: {
            wood: 100,
            stone: 200,
            meat: 100
        },
        live: false,
        visible: true,
        nextTier: 'fivePickaxes'
    },
    fivePickaxes: {
        name: 'Five Pickaxes',
        description: 'Five stone per click.',
        cost: {
            wood: 400,
            stone: 800,
            meat: 400
        },
        live: false,
        visible: false,
        nextTier: 'tenPickaxes'
    },
    tenPickaxes: {
        name: 'Ten Pickaxes',
        description: 'Ten stone per click.',
        cost: {
            wood: 1000,
            stone: 2000,
            meat: 1000
            // bread: 100
        },
        live: false,
        visible: false
    },
    twoArrows: {
        name: 'Two Arrows',
        description: 'Two meat per click.',
        cost: {
            wood: 100,
            stone: 100,
            meat: 200
        },
        live: false,
        visible: true,
        nextTier: 'fiveArrows'
    },
    fiveArrows: {
        name: 'Five Arrows',
        description: 'Five meat per click.',
        cost: {
            wood: 400,
            stone: 400,
            meat: 800
        },
        live: false,
        visible: false,
        nextTier: 'tenArrows'
    },
    tenArrows: {
        name: 'Ten Arrows',
        description: 'Ten meat per click.',
        cost: {
            wood: 1000,
            stone: 1000,
            meat: 2000
            // bread: 100
        },
        live: false,
        visible: false
    },

    biggerTents: {
        name: 'Bigger Tents',
        description: 'Tents built from now on can hold three people.',
        cost: {
            wood: 100,
            stone: 30,
            iron: 20,
            meat: 200
        },
        live: false,
        visible: true
    }
};
