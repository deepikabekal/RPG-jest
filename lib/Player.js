const Potion = require ('../lib/Potion');
function Player(name='') {
    this.name = name;

    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);

    this.inventory = [new Potion('health'), new Potion()];

    // //returns an object with various player properties
    // this.getStats = function () {
    //     return {
    //         potions : this.inventory.length,
    //         strength : this.strength, 
    //         health : this.health,
    //         agility : this.agility
    //     }
    // };

    // //returns inventory array or false if empty
    // this.getInventory = function () {
    //     if (this.inventory.length)
    //     {
    //         return this.inventory;
    //     }
    //     return false;
    // };
};

//returns an object with various player properties
Player.prototype.getStats = function () {
    return {
        potions : this.inventory.length,
        strength : this.strength, 
        health : this.health,
        agility : this.agility
    }
};

//returns inventory array or false if empty
Player.prototype.getInventory = function () {
    if (this.inventory.length)
    {
        return this.inventory;
    }
    return false;
};

//method to displaye the player health
Player.prototype.getHealth = function() {
    return `${this.name}'s health is now ${this.health}!`;
};

//method to check if the player is alive or dead
Player.prototype.isAlive = function () {
    if (this.health === 0)
    {
        return false;
    }
    return true;
}


//reduce the player health 

Player.prototype.reduceHealth = function (health) {
    this.health -= health;
    if (this.health < 0)
    {
        this.health = 0;
    }
};

//method to get a player's attack value
Player.prototype.getAttackValue = function () {
    const max = this.strength + 5;
    const min = this.strength - 5;

    return Math.floor(Math.random() * (max-min) + min);
}

//method to add potion to the inventory
Player.prototype.addPotion = function (potion) {
    return this.inventory.push(potion);
}

//method that allows the Player to use potion
Player.prototype.usePotion = function(index){
    const potion = this.getInventory().splice(index,1)[0];

    switch (potion.name) {
        case 'agility' : 
        this.agility += potion.value;
        break;
        case 'strength' : 
        this.strength += potion.value;
        break;
        case 'health' : 
        this.health += potion.value;
        break;
    }
};



module.exports = Player;