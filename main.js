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
  scaryCat: 'https://i.imgur.com/rmFqDV8.png',
  dogBark: 'https://i.imgur.com/Vzsbvpb.png',
  octopusEscape: 'https://i.imgur.com/7L41jr2.png',
  policeRaid: 'https://i.imgur.com/dD6hBPs.png',
  doorUnlocked: 'https://i.imgur.com/u9VrfwT.png',
  atWork: 'https://i.imgur.com/aqhTIEA.jpg',
  salary: 'https://i.imgur.com/amMzbNw.png',
  border: 'https://i.imgur.com/PtzPUQy.png',
  letterF: 'https://i.imgur.com/9MCv9xI.png',
  letterD: 'https://i.imgur.com/1AeWD9i.png',
  fullTrash: 'https://i.imgur.com/dBuJxZq.jpg',
  emptyTrash: 'https://i.imgur.com/nGfRzez.jpg',

  //days
  sunday: 'https://i.imgur.com/54BUbYO.png',
  monday: 'https://i.imgur.com/5J0ewsQ.png',
  tuesday: 'https://i.imgur.com/ATO6mY3.png',
  wednesday: 'https://i.imgur.com/UO88fZa.png',
  thursday: 'https://i.imgur.com/ZLIwhuO.png',
  friday: 'https://i.imgur.com/HXMZVKC.png',
  saturday: 'https://i.imgur.com/72IRSxz.png'
};

var winW = window.innerWidth;
var winH = window.innerHeight;
// REQUIRED: configure the grid
const TEXT_DEFAULT_COLOR = [255,230,210];
const GRID_ROWS = 5;
const GRID_COLS = 7;
const GRID_CELL_SIZE = winW/12;
const GRID_EMPTY = [247, 245, 165];
const GRID_DRAG = false;
const GRID_ZOOM = false;
const BACKGROUND_COLOR = [0,170,40];
//const BACKGROUND_IMAGE = "https://i.imgur.com/om1kbpB.jpg";

RESOURCES_TEXT_SIZE = winW/32;

// REQUIRED: define how our resources will be represented
const RESOURCES = {
  money: '💵',

  currentDay: "Day: ",
  currentWeek: "Week: ",
  currentMonth: "Month: ",
  currentYear: "Year: ",
}

const SPRITES = {
  cat: "🐈",
  dog: "🐕",
  octopus: "🐙",
  snake: "🐍",
  guineaPig: "🐹",

  venusFlyTrap: "🌺",
  aloeVera: "🎍",
  cactus: "🌵",
  tulip: "🌷",
  cannabis: "🌿",

  vice: "🗜️",
  wrench: "🔧",
  hammer: "🔨",
  batteries: "🔋",
  candles: "🕯️",
  rollingPapers: "🗞️"
}

// REQUIRED: define our game state.
// At minimum this must define initial values for your resources.
const STATE = {
  resources: {

    money: 1000,

    currentDay : 1,
    currentWeek: 1,
    currentMonth : 1,
    currentYear : 2000,

    rent: 500

  },

  sprites: {
    cat: false,
    dog: false,
    octopus: false,
    snake: false,
    guineaPig: false,

    venusFlyTrap: false,
    aloeVera: false,
    cactus: false,
    tulip: false,
    cannabis: false,

    vice: false,
    wrench: false,
    hammer: false,
    batteries: false,
    candles: false,
    rollingPapers: false
  },

  income: 300,

  days: ['sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'],

  months: ['january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'],


// MINIGAME

//on / off
  miniGameOn : false,

//difficulty
  sinkPopups: 7,
  bathPopups: 7,
  trashPopups: 7,

  meterRate: .25,

  repairFee: 100,

//0-6 for sunday thru monday

  bathWeekCount : 3,
  bathWeekCycle : 3,

  trashDay : 4,
  trashWeek : false,
  trashChance : .4
}

//random starting items

class Date{
  constructor(d,m,y){
    this.day = d;
    this.month = m;
    this.year = y;
  }

  asTile(){
    return '';
  }
}

class CalendarDayCell extends Cell{
  constructor(day){
    super();
    this.day = day;
  }

  get info(){
    return '';
  }

  get image(){
    return this.day;
  }

  canPlace(item) {
    return false;
  }
}

class RentCell extends Cell{
  constructor(rent){
    super();
    this.rent = rent;
    this.id = 0;
  }

  get info(){
    return 'The rent is $' + this.rent;
  }

  get image(){
    return 'rent';
  }

  canPlace(item) {
    return false;
  }
}

class PayDayCell extends Cell{
  constructor(sal){
    super();
    this.sal = sal;
    this.id = 1;
  }

  get info(){
    return 'You make $' + this.sal;
  }

  get image(){
    return 'salary';
  }

  canPlace(item) {
    return false;
  }
}

class BathDayCell extends Cell{
  constructor(){
    super();
    this.clean = false;
    this.id = 2;
  }

  get info(){
    if (this.clean){
      return 'The bathroom is clean';
    }else{
      return 'The bathroom is dirty';
    }
  }

  get image(){
    if(this.clean){
      return 'cleanToilet';
    }else{
      return 'dirtyToilet';
    }
  }

  canPlace(item) {
    return false;
  }

  toggleClean(){
    if(this.clean){
      this.clean = false;
    }else{
      this.clean = true;
    }
  }
}

class DishDayCell extends Cell{
  constructor(){
    super();
    this.clean = false;
    this.id = 3;
  }

  get info(){
    if (this.clean){
      return 'The sink is clean';
    }else{
      return 'The sink is dirty';
    }
  }

  get image(){
    if(this.clean){
      return 'cleanSink';
    }else{
      return 'dirtySink';
    }
  }

  canPlace(item) {
    return false;
  }

  toggleClean(){
    if(this.clean){
      this.clean = false;
    }else{
      this.clean = true;
    }
  }
}

class TrashDayCell extends Cell{
  constructor(){
    super();
    this.clean = false;
    this.id = 4;
  }

  get info(){
    if (this.clean){
      return 'The trash is empty';
    }else{
      return 'The trash is overflowing';
    }
  }

  get image(){
    if(this.clean){
      return 'emptyTrash';
    }else{
      return 'fullTrash';
    }
  }

  canPlace(item) {
    return false;
  }

  toggleClean(){
    if(this.clean){
      this.clean = false;
    }else{
      this.clean = true;
    }
  }
}

//a cursor type tile modification
class Selector extends Item {

  init() {
  }
  get cost() {
    return {
    }
  }
  get info() {
      return 'This is today!'
  }
  get image() {
    return 'border';
  }
  onClick() {
  }
  onPlace() {
  }
  onDestroy() {
  }
}

// Define pet bonuses
  var catBonus = new Bonus(
    'Cat',
    'One fewer popup when cleaning sink', {
      money: 50
    }, function(){
      STATE.sinkPopups-=1;
      STATE.sprites.cat=true;
    });

  var dogBonus = new Bonus(
    'Dog',
    'Two fewer popups when taking out trash', {
      money: 50
    }, function(){
      STATE.trashPopups-=2;
      STATE.sprites.dog=true;
    });

  var octopusBonus = new Bonus(
    'Octopus',
    'One fewer popup when cleaning bathroom', {
      money: 50
    }, function(){
      STATE.bathPopups-=1;
      STATE.sprites.octopus=true;
    });

  var snakeBonus = new Bonus(
    'Octopus',
    'One fewer popup when cleaning bathroom', {
      money: 70
    }, function(){
      STATE.sinkPopups-=1;
      STATE.trashPopups-=1;
      STATE.bathPopups-=1;
      STATE.sprites.snake=true;
    });

  var guineaPigBonus = new Bonus(
    'Guinea Pig',
    'ITS JUST CUTE', {
      money: 12
    }, function(){
      STATE.sprites.guineaPig=true;
    });

  // Define plant bonuses
  var venusFlyTrapBonus = new Bonus(
    'Venus Fly Trap',
    'Chance of trash week decreases %10', {
      money: 35
    }, function(){
      STATE.trashChance-=.1;
      STATE.sprites.venusFlyTrap=true;
    });

  var aloeVeraBonus = new Bonus(
    'Aloe Vera',
    'Meter rate decreases a notch', {
      money: 20
    }, function(){
      STATE.meterRate-=.05;
      STATE.sprites.aloeVera=true;
    });

  var cactusBonus = new Bonus(
    'Cactus',
    'Meter rate decreases a notch', {
      money: 20
    }, function(){
      STATE.meterRate-=.05;
      STATE.sprites.cactus=true;
    });

  var tulipBonus = new Bonus(
    'Tulip',
    'Meter rate decreases a notch', {
      money: 20
    }, function(){
      STATE.meterRate-=.05;
      STATE.sprites.tulip=true;
    });

    var cannabisBonus = new Bonus(
      'Cannabis',
      'Three additional popups for each chore; meter rate zero.', {
        money: 40
      }, function(){
        STATE.meterRate= 0.;
        STATE.sinkPopups+=1;
        STATE.trashPopups+=1;
        STATE.bathPopups+=1;
        STATE.sprites.cannabis=true;
      });

      //define hardware BONUSES

      var viceBonus = new Bonus(
        'Vice',
        'Repair fee decreases by $30', {
          money: 30
        }, function(){
          STATE.repairFee-=30;
          STATE.sprites.vice=true;
        });

      var wrenchBonus = new Bonus(
        'Wrench',
        'Repair fee decreases by $25', {
          money: 25
        }, function(){
          STATE.repairFee-=25;
          STATE.sprites.wrench=true;
        });

      var hammerBonus = new Bonus(
        'Hammer',
        'Repair fee decreases by $15', {
          money: 15
        }, function(){
          STATE.repairFee-=15;
          STATE.sprites.hammer=true;
        });

      var batteriesBonus = new Bonus(
        'Batteries',
        'Rent decreases by $50', {
          money: 100
        }, function(){
          STATE.resources.rent-=50;
          STATE.sprites.batteries=true;
        });

      var candlesBonus = new Bonus(
        'Candles',
        'Bathroom stays clean over four weeks (from three)', {
          money: 60
        }, function(){
          STATE.bathWeekCycle+=1;
          STATE.sprites.candles=true;
        });

      var rollingPaperBonus = new Bonus(
        'rollingPapers',
        'Salary increases by $20', {
          money: 5
        }, function(){
          STATE.salary+=20;
          STATE.sprites.rollingPapers=true;
        });

var meter1;

let payDayCellA = new PayDayCell(STATE.income);

let payDayCellB = new PayDayCell(STATE.income);

let bathDayCell = new BathDayCell();//bathDayCell.toggleClean();

let dishDayCell = new DishDayCell();//dishDayCell.toggleClean();

let trashDayCell = new TrashDayCell();//trashDayCell.toggleClean();

var weekCell =1;
var dayCell = 1;

var selector;

// Initial setup of the game
function init() {
  placeCalendarDays();
  // Create a starting wheat plot
  let rentCell = new RentCell('350');
//  place(rentCell, 0, 0);
  GAME.grid.setCellAt(rentCell,0,1);

  GAME.grid.setCellAt(payDayCellA,5,2);

  GAME.grid.setCellAt(payDayCellB,5,4);

  GAME.grid.setCellAt(dishDayCell,3,1);

  selector = new Selector();
  place(selector,0,1);

  // Setup the Menu for buying stuff
  var petShop = new Menu('Pet Shop', [
    new BuyButton("Cat",catBonus),
    new BuyButton("Dog",dogBonus),
    new BuyButton("Octopus",octopusBonus),
    new BuyButton("Snake",snakeBonus),
    new BuyButton("Guinea Pig", guineaPigBonus)
  ]);

  var plantNursery = new Menu('Plant Nursery', [
    new BuyButton("Venus Fly Trap", venusFlyTrapBonus),
    new BuyButton("Aloe Vera", aloeVeraBonus),
    new BuyButton("Cactus", cactusBonus),
    new BuyButton("Tulip", tulipBonus),
    new BuyButton("Cannabis", cannabisBonus)
  ]);

  var hardwareStore = new Menu('Hardware Store',[
    new BuyButton("Vice", viceBonus),
    new BuyButton("Wrench", wrenchBonus),
    new BuyButton("Hammer", hammerBonus),
    new BuyButton("Batteries", batteriesBonus),
    new BuyButton("Candles", candlesBonus),
    new BuyButton("Rolling Papers", rollingPaperBonus)
  ])


  var turnMenu = new Menu('Press Space for Next Turn',[
    new Button('Next Turn', () => {
      selector.destroy();
      console.log("w/d:"+weekCell + " " + dayCell);
      place(selector,dayCell,weekCell);
      turnCheck();
    })
  ])

  meter1 = new Meter('Task', 0);
}

window.addEventListener("keypress", (e) => {
  var keyCode = e.keyCode;
  console.log(keyCode);
  if(keyCode == 0 ){//&& !STATE.miniGameOn){
    selector.destroy();
    console.log("w/d:"+weekCell + " " + dayCell);
    place(selector,dayCell,weekCell);
    turnCheck();
  }
});

function placeCalendarDays(){
  for(var i = 0; i<7 ; i++){
    let calendarDay = new CalendarDayCell(STATE.days[i]);
    GAME.grid.setCellAt(calendarDay,i,0);
  }
}

var currentCell;
var currentCellID;

function turnCheck(){
  //Chore check FUNCTIONS
  currentCell=GAME.grid.cellAt(dayCell,weekCell);
  switch (currentCell.id) {
    case 0:
      payRent();
      break;
    case 1:
      STATE.resources.money+=STATE.income;
      showModal("PayDay","Yahoo! you made $"+STATE.income);
      break;
    case 2:
      minigame("Clean the bathroom!!!",STATE.bathPopups);
      currentCell.toggleClean();
      break;
    case 3:
      minigame("Scrub the sink!!!",STATE.sinkPopups);
      currentCell.toggleClean();
      break;
    case 4:
      minigame("Take out the trash!!!",STATE.trashPopups);
      currentCell.toggleClean();
    default:

  }

  if (Math.random<.02){
    showMessage('A ghost!');
  }

  if (dayCell == 0){
    weeklyCellSwap();
    STATE.resources.currentWeek++;
    if (weekCell==1){
      STATE.resources.currentMonth++;
      showModal(STATE.months[STATE.resources.currentMonth%12-1],"A new month has begun! Rent amounted $"+STATE.resources.rent);
      if ((STATE.resources.currentMonth-1)%12==0){
        STATE.resources.currentYear+=1;
      }
    }
  }
 dayCell+=1;
 STATE.resources.currentDay++;
 //weeek check
 if (dayCell>6){
   dayCell=0;
   weekCell++;
 }
 //month check;
 if(weekCell>4){
    weekCell = 1;
 }
}

function weeklyCellSwap(){
  // switch tiles to present week;
  //reset last week cells
  if(weekCell>1){
    GAME.grid.setCellAt(new Cell(),1,weekCell-1);
    GAME.grid.setCellAt(new Cell(),3,weekCell-1);
    GAME.grid.setCellAt(new Cell(),4,weekCell-1);
    if (STATE.trashWeek){
      GAME.grid.setCellAt(new Cell(),STATE.trashDay,weekCell-1);
    }
  }else{
    GAME.grid.setCellAt(new Cell(),1,weekCell+3);
    GAME.grid.setCellAt(new Cell(),3,weekCell+3);
    GAME.grid.setCellAt(new Cell(),4,weekCell+3);
    if (STATE.trashWeek){
      GAME.grid.setCellAt(new Cell(),STATE.trashDay,weekCell+3);
    }
  }

    // chores UNdone
    bathDayCell.clean=false;
    dishDayCell.clean=false;
    trashDayCell.clean=false;

    if(STATE.bathWeekCount==STATE.bathWeekCycle){
      GAME.grid.setCellAt(bathDayCell,1,weekCell);
      STATE.bathWeekCount=1;
    }else{
      STATE.bathWeekCount++;
    }
    GAME.grid.setCellAt(dishDayCell,3,weekCell);

    randomTrash();
    if(STATE.trashWeek){
      GAME.grid.setCellAt(trashDayCell,STATE.trashDay,weekCell);
    }
}

function randomTrash(){
  var randWeek = Math.random();
  var randDay = Math.random()*6;

  //determine if trash week
  if (randWeek>STATE.trashChance){
    STATE.trashWeek=false;
  }else{
    STATE.trashWeek=true;
  }

  //determine trash day
  STATE.trashDay=Math.floor(randDay)+1;
  //and check that it doesn't conflict with another tile
  if (GAME.grid.cellAt(STATE.trashDay,weekCell).id >=0){
    STATE.trashWeek=false;
  }
}

function payRent(){
  //subtract rent from $
  STATE.resources.money-=STATE.resources.rent;
}

function minigame(name,i){
  STATE.miniGameOn=true;
  var randX;
  var randY;

  var taskButton = new Button("Go",() => {
    minigame(name,i-1);
    console.log(i);
  });

  if(i>1 && meter1.val<100){
    randX = Math.floor(Math.random()*(winW-500));
    randY = Math.floor(Math.random()*(winH-400));

    showModal("Minigame",name,[taskButton]);
    moveOverlay(randX, randY);
  }else{
    STATE.miniGameOn = false;
    if (meter1.val<100){
            showModal("Result", "Nicely handled!");
            meter1.update(0.);
    }else{
      showModal("Result", "You missed a spot.  It cost you $"+ STATE.repairFee);
      STATE.resources.money-=100;
      meter1.update(0.);
    }
  }
}

// The game's main loop.
function main() {
    if(STATE.miniGameOn){
      meter1.update(meter1.val + STATE.meterRate);
    }
  }
