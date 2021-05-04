const Potion = require ('../lib/Potion');
const Character = require('./Character');
class Player extends Character {
    constructor (name='')
    {
        super(name);
        
        this.inventory = [new Potion('health'), new Potion('agility')];
    }

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

    //returns an object with various player properties
    getStats() {
        return {
            potions : this.inventory.length,
            strength : this.strength, 
            health : this.health,
            agility : this.agility
        }
    };

    //returns inventory array or false if empty
    getInventory() {
        if (this.inventory.length)
        {
            return this.inventory;
        }
        return false;
    };

    //method to add potion to the inventory
    addPotion(potion) {
        return this.inventory.push(potion);
    }

    //method that allows the Player to use potion
    usePotion(index) {
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



};



module.exports = Player;