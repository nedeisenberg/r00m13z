'use strict';

// REQUIRED: define images we want to use
const IMAGES = {
  dirtyLaundry: 'https://i.imgur.com/jcg7wJI.png',
  cleanLaundry: 'https://i.imgur.com/pdFkpdA.png',
  dirtySink: 'https://i.imgur.com/TpndZpq.jpg',
  cleanSink: 'https://i.imgur.com/tXFgduF.jpg',
  dirtyToilet: 'https://i.imgur.com/hDUtohr.jpg',
  cleanToilet: 'https://i.imgur.com/7qopSIG.jpg',
  rent: 'https://i.imgur.com/JBAvBbu.jpg',
  mold: 'https://i.imgur.com/ukloFtk.png',
  travel: 'https://i.imgur.com/wvH32qY.png',
  utilities: 'https://i.imgur.com/VfBZLIx.png',
  flood:'https://i.imgur.com/mumNmzK.png',
  bugs: 'https://i.imgur.com/jnNEIUz.png',
  brokenCup: 'https://i.imgur.com/zceb3MO.jpg',
  ghost: 'https://i.imgur.com/yPCQLce.png',
  party: 'https://i.imgur.com/yEDl6jA.png',
  evilCat: 'https://i.imgur.com/rmFqDV8.png',
  dogBark: 'https://i.imgur.com/Vzsbvpb.png',
  octopusEscape: 'https://i.imgur.com/7L41jr2.png',
  policeRaid: 'https://i.imgur.com/dD6hBPs.png',
  doorUnlocked: 'https://i.imgur.com/u9VrfwT.png',
  atWork: 'https://i.imgur.com/aqhTIEA.jpg',
  salary: 'https://i.imgur.com/RejTpg6.png'
};

// REQUIRED: configure the grid
const GRID_ROWS = 5;
const GRID_COLS = 7;
const GRID_CELL_SIZE = 130;
const GRID_EMPTY = [247, 245, 165];
const GRID_DRAG = false;

// REQUIRED: define how our resources will be represented
const RESOURCES = {
  water: '🌊',
  nitrogen: '💩',
  money: '💵',

  items: {
    cat: [false,"🐈"],
    dog: [false,"🐕"],
    octopus: [false,"🐙"],
    snake: [false,"🐍"],
    guineaPig: [false,"🐹"],

    venusFlyTrap: [false,"🌺"],
    aloeVera: [false,"🎍"],
    cactus: [false,"🌵"],
    tulip: [false,"🌷"],
    marijuana: [false,"🌿"],

    saw: [false,"🗜️"],
    wrench: [false,"🔧"],
    screwdriver: [false,"🔨"],
    batteries: [false,"🔋"],
    candles: [false,"🕯️"],
    rollingPapers: [false,"🗞️"]
  }
}

// REQUIRED: define our game state.
// At minimum this must define initial values for your resources.
const STATE = {
  resources: {
    water: 100,
    nitrogen: 50,
    money: 0
  },
  cashPerCrop: 100,
  investment: 0,
  aqueducts: 0,
  wheats: 0,

  leapYear: false,

  months: {
    january: 31,
    february: 31,
    march: 31,
    april: 30,
    may: 31,
    june: 30,
    july: 31,
    august: 31,
    september: 30,
    october: 31,
    november: 30,
    december: 31
  },

  currentDay : 1,
  currentMonth : 1,
  currentYear : 2000,



//0-6 for sunday thru monday
  lastDayOfMonth: 0


}
console.log(RESOURCES.items.cat[1]);

//random starting items


// Define a Wheat "item"
class Wheat extends Item {

  // Initialize the Wheat with
  // 3 bushels
  init() {
    this.quantity = 3;
  }

  // Wheat costs water and nitrogen
  get cost() {
    return {
      water: 20,
      nitrogen: 5
    }
  }

  // Show a different tooltip
  // depending on how many bushels are left
  get info() {
    if (this.quantity < 2) {
      return 'This wheat is almost gone!'
    } else if (this.quantity < 3) {
      return 'This wheat is running low'
    } else {
      return 'This is some nice wheat'
    }
  }

  // Show a different image
  // depending on how many bushels are left
  get image() {
    if (this.quantity < 3) {
      return 'sparse_wheat'
    } else {
      return 'wheat'
    }
  }

  // When a Wheat is clicked on...
  onClick() {
    // Remove a bushel
    this.quantity -= 1;

    // Give the player money depending on the STATE.cashPerCrop variable
    STATE.resources.money += STATE.cashPerCrop;

    // Check if any bushels remain.
    // If not, destroy this wheat and
    // let the player know
    if (this.quantity <= 0) {
      this.destroy();
      showMessage('You lost some wheat!')
    }
  }

  // When a new Wheat is placed,
  // increment the wheat count.
  // We'll use this to keep track
  // of water usage across the farm
  onPlace() {
    STATE.wheats++;
  }

  // When a Wheat is destroyed,
  // decrement the wheat count
  onDestroy() {
    STATE.wheats--;
  }
}


// Define a bonus
var tractorBonus = new Bonus(
  'Powerful Tractor',
  'A more powerful tractor', {
    money: 50
  }, function() {
    // When purchased,
    // this bonus increases the cash per wheat
    // bushel by $100
    STATE.cashPerCrop += 100;
  });

// Define another bonus
var investmentBonus = new Bonus(
  'Roth IRA',
  'Make your money work for you', {
    money: 100
  }, function() {
    // Set the investment variable to 0.1
    STATE.investment = 0.1;
  });


var meter1, meter2;

// Initial setup of the game
function init() {
  // Create a starting wheat plot
  var wheat = new Wheat();
  place(wheat, 0, 0);
  STATE.wheats += 1;

  // Setup the Menu for buying stuff
  var menu = new Menu('Farm Mall', [
    new BuyButton('Buy wheat', Wheat),
    new BuyButton('Upgrade tractor', tractorBonus),
    new BuyButton('Open Roth IRA', investmentBonus)
  ]);
  var turnTable = new Menu('Menu',[


  ])

  // Define a harvester which
  // regularly gives the player water
  // depending on how many aqueducts they own
  defineHarvester('water', function() {
    return 2 * STATE.aqueducts;
  }, 2000)

  // Define a harvester which uses up
  // water based on how much wheat the player has
  defineHarvester('water', function() {
    return -1 * STATE.wheats;
  }, 2000);

  // Define a harvester which
  // compounds the amount of money the player
  // has based on their investment return rateaa
  defineHarvester('money', function() {
    return STATE.resources.money * STATE.investment;
  }, 2000);

  meter1 = new Meter('Test Meter', 10);
  meter2 = new Meter('Another meter', 50);
}


// The game's main loop.
// We're just using it to set a background color
function main() {
  background(58, 170, 80);
  //check turn event
  meter1.update(meter1.val + 0.1);
}
