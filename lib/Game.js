//import all the packages
const inquirer = require('inquirer');
const Player = require('./Player');
const Enemy = require('./Enemy');


function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

Game.prototype.initializeGame = function() {
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));

    //keeping track of which enemy is currently fighting

    this.currentEnemy = this.enemies[0];

    //prompt for user input

    inquirer.prompt(
        {
            type : "input",
            name : "name", 
            message : "What is your name?"
        }
    )
    //destructure name from the prompt object
    .then(({name}) => {
        this.player = new Player(name);

        //test the object creation
        // console.log(this.currentEnemy, this.player);

        //make the 2 characters fight
        this.startNewBattle();
    })
}

Game.prototype.startNewBattle = function() {
    if (this.player.agility > this.currentEnemy.agility)
    {
        this.isPlayerTurn = true;
    }
    else
    {
        this.isPlayerTurn = false;
    }

    console.log('Your stats are as follows:');
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());
    this.battle();
}

Game.prototype.battle = function () {
    if (this.isPlayerTurn)
    {
        inquirer.prompt(
            {
                type : "list",
                name : "action",
                message : "What would you like to do?",
                choices : ["Attack", "Use Potion"]

            }
        )
        .then (({action}) => {
            if (action === 'Use Potion')
            {
                if(!this.player.getInventory())
                {
                    console.log("You don't have any potions!");
                    return this.checkEndOfBattle();
                }

                inquirer.prompt(
                    {
                        type : "list",
                        name : "action",
                        message : "Which potion would you like to use?",
                        choices : this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                    }
                )
                .then (({action}) => {
                    const potionDetails = action.split(":");

                    this.player.usePotion(potionDetails[0]-1);
                    console.log(`You used a ${potionDetails[1]} potion.`);
                    this.checkEndOfBattle();
                })
            }
            else
            {
                const damage = this.player.getAttackValue();
                this.currentEnemy.reduceHealth(damage);

                console.log(`You attacked the ${this.currentEnemy.name}`);
                console.log(this.currentEnemy.getHealth());
                this.checkEndOfBattle();
            }
        });
    }
    else
    {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
        this.checkEndOfBattle();
    }
};

//check win/lose

Game.prototype.checkEndOfBattle = function() {
    if (this.player.isAlive() && this.currentEnemy.isAlive())
    {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();
    }
    else if (this.player.isAlive() && !this.currentEnemy.isAlive())
    {
        console.log(`You've defeated the ${this.currentEnemy.name}`);

        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);

        this.roundNumber++;

        if (this.roundNumber < this.enemies.length)
        {
            this.currentEnemy = this.enemies[this.roundNumber];
            this.startNewBattle();
        }
        else
        {
            console.log('You win!');
        }
    }
    else
    {
        console.log("You've been defeated!");
    }
}



module.exports = Game;