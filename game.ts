import readline from 'readline';
import chalk from "chalk";
import chalkanimation from "chalk-animation";
import figlet from 'figlet';


type Room = {
    description: string;
    north: number;
    south: number;
    east: number;
    west: number;
    treasure: boolean;
};

const rooms: Room[] = [
    {
        description: chalk.magentaBright(chalk.italic('You are in a small room with a door to the north.')),
        north: 1,
        south: -1,
        east: -1,
        west: -1,
        treasure: false,
    },
    {
        description: chalk.blue(chalk.italic('You are in a large room with doors to the north, south, and west.')),
        north: 2,
        south: 0,
        east: -1,
        west: 3,
        treasure: false,
    },
    {
        description: chalk.yellow(chalk.italic('You are in a treasure room with a door to the south.')),
        north: -1,
        south: 1,
        east: -1,
        west: -1,
        treasure: true,
    },
    {
        description: chalk.greenBright(chalk.italic('You are in a dark hallway with a door to the east.')),
        north: -1,
        south: -1,
        east: 1,
        west: -1,
        treasure: false,
    },
];

type GameState = {
    currentRoom: number;
    inventory: string[];
};

const gameState: GameState = {
    currentRoom: 0,
    inventory: [],
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function printRoomDescription(room: Room) {
    console.log(room.description);
    if (room.treasure) {
        console.log('You found a treasure! Added it to your inventory.');
        gameState.inventory.push('treasure');
        room.treasure = false;
    }
}

function move(direction: string) {
    const room = rooms[gameState.currentRoom];
    switch (direction) {
        case 'north':
            if (room.north === -1) {
                console.log(chalk.redBright('You cannot go that way.'));
            } else {
                gameState.currentRoom = room.north;
                printRoomDescription(rooms[gameState.currentRoom]);
            }
            break;
        case 'south':
            if (room.south === -1) {
                console.log(chalk.redBright('You cannot go that way.'));
            } else {
                gameState.currentRoom = room.south;
                printRoomDescription(rooms[gameState.currentRoom]);
            }
            break;
        case 'east':
            if (room.east === -1) {
                console.log(chalk.redBright('You cannot go that way.'));
            } else {
                gameState.currentRoom = room.east;
                printRoomDescription(rooms[gameState.currentRoom]);
            }
            break;
        case 'west':
            if (room.west === -1) {
                console.log(chalk.redBright('You cannot go that way.'));
            } else {
                gameState.currentRoom = room.west;
                printRoomDescription(rooms[gameState.currentRoom]);
            }
            break;
        default:
            console.log(chalk.redBright('Invalid direction.'));
    }
}

function showInventory() {
    console.log(chalk.redBright('Inventory:'));
    if (gameState.inventory.length === 0) {
        console.log('  (none)');
    } else {
        for (const item of gameState.inventory) {
            console.log(`  ${item}`);
        }
    }
}

function handleInput(input: string) {
    const words = input.trim().toLowerCase().split(' ');
    const command = words[0];
    const argument = words[1];
    switch (command) {
        case 'go':
            move(argument)
    }
}

const sleep = () => new Promise((resolve, reject) => {    //for stopping the rainbow animation 
    return setTimeout(resolve, 1000)
})



// startup the Adventure game

let welcome = chalkanimation.rainbow(figlet.textSync('AD VENTURE  GAME  ! ! ! '));
await sleep();
welcome.stop();

printRoomDescription(rooms[gameState.currentRoom]);
rl.prompt();
rl.on('line', handleInput);     //When you run the code, you should see the game's welcome message and the description of the starting room.
                                // You can then type commands like "go north" or "inventory" to facing with the game.
