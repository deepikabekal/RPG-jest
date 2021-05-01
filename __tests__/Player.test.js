const Player = require ('../lib/Player.js');
const Potion = require ('../lib/Potion');
jest.mock('../lib/Potion'); //get the mock data

console.log(new Potion());

test('create a Player object', () => {
    const player = new Player('Dave');

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));

    expect(player.inventory).toEqual(expect.arrayContaining([expect.any(Object)]));
});

//checking that player.getStats() returns an object with four specific properties.

test("gets player's stats as an object", () => {
    const player = new Player('Dave');

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('agility');
    expect(player.getStats()).toHaveProperty('strength');
});

//call to player.getInventory() should return an array.
test('gets inverntory from player or returns false', () => {
    const player = new Player('Dave');

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});

//test to get information about the player's health

test('gets player health value', () => {
    const player = new Player('Dave');

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

//test to check if the player is alive

test('checks if the player is alive or not', () => {
    const player = new Player('Dave');

    expect(player.isAlive()).toBeTruthy();

    player.health = 0;

    expect(player.isAlive()).toBeFalsy();
});

// test to check if the correct amount of health is being subtracted from the Player health property

test("subtract from player's health property", () => {
    const player = new Player('Dave');
    const oldHealth = player.health;

    player.reduceHealth(5);

    expect(player.health).toBe(oldHealth-5);

    player.reduceHealth(99999);

    expect(player.health).toBe(0);

})