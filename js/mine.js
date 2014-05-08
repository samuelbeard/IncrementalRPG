"use strict";

function Mine(amount, cost) {
    this.amount = 0;
    this.cost = mineCost();

    function mineCost(mines, wood, stone, iron, gold) {
        this.mines = Mine.amount;
        this.wood = 100;
        this.stone = 100;
        this.iron = 0;
        this.gold = 0;
    }
}
alert(mineCost.mines);