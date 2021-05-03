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
        console.log(this.currentEnemy, this.player);
    })
}

module.exports = Game;