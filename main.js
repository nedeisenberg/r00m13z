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
  income: '💹',

  currentDay: "Day: ",
  currentWeek: "Week: ",
  currentMonth: "Month: ",
  currentYear: "Year: ",

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
    hammer: [false,"🔨"],
    batteries: [false,"🔋"],
    candles: [false,"🕯️"],
    rollingPapers: [false,"🗞️"]
  }
}

// REQUIRED: define our game state.
// At minimum this must define initial values for your resources.
const STATE = {
  resources: {

    money: 3000,
    income: 300,

    currentDay : 1,
    currentWeek: 1,
    currentMonth : 1,
    currentYear : 2000,

    rent: 200

  },
  cashPerCrop: 100,
  investment: 0,
  aqueducts: 0,
  rents: 0,

  leapYear: false,

  days: ['sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'],

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

// MINIGAME

//on / off
  miniGameOn : false,

//difficulty

//0-6 for sunday thru monday
  lastDayOfMonth: 0,

  bathWeekCount : 3,

  trashDay : 4,
  trashWeek : false
}
console.log(RESOURCES.items.cat[1]);

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
    return 'The rent is `${this.rent}';
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
    return 'You make`${this.sal}';
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

// Define a Wheat "item"
class Selector extends Item {
  // Initialize the rent with
  // 3 bushels
  init() {
  }
  // Wheat costs water and nitrogen
  get cost() {
    return {
    }
  }
  // Show a different tooltip
  // depending on how many bushels are left
  get info() {
      return 'This is today!'
  }
  // Show a different image
  // depending on how many bushels are left
  get image() {
    return 'border';
  }
  // When a Wheat is clicked on...
  onClick() {
  }

  onPlace() {
  }

  onDestroy() {
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

var meter1;


////MOVE DECLARATIONS TO GLOBAL
let payDayCellA = new PayDayCell('400');

let payDayCellB = new PayDayCell('400');

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

//  GAME.grid.setCellAt(bathDayCell,1,1);

  GAME.grid.setCellAt(dishDayCell,3,1);

  //GAME.grid.setCellAt(trashDayCell,4,1);

  STATE.rents += 1;

  selector = new Selector();
  place(selector,0,1);
  // Setup the Menu for buying stuff
  var menu = new Menu('Farm Mall', [
    //new BuyButton('Buy wheat', Rent),
    new BuyButton('Upgrade tractor', tractorBonus),
    new BuyButton('Open Roth IRA', investmentBonus)
  ]);


  var turnMenu = new Menu('Turn',[
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
  if(keyCode == 0){
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
      STATE.resources.money-=STATE.resources.rent;
      break;
    case 1:
      STATE.resources.money+=STATE.resources.income;
      showModal("PayDay","Whoopee, you got paid $"+STATE.resources.income);
      break;
    case 2:
      minigame("Clean the bathroom!!!",7);
      currentCell.toggleClean();
      break;
    case 3:
      minigame("Scrub the sink!!!",7);
      currentCell.toggleClean();
      break;
    case 4:
      minigame("Take out the trash!!!",7);
      currentCell.toggleClean();
    default:

  }

  if (dayCell == 0){
    weeklyCellSwap();
    STATE.resources.currentWeek++;
    if (weekCell==1){
      STATE.resource.currentMonth++;
    }
  }
 dayCell++;
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
    GAME.grid.setCellAt(new Cell(),1,weekCell-1);
    GAME.grid.setCellAt(new Cell(),3,weekCell-1);
    GAME.grid.setCellAt(new Cell(),4,weekCell-1);

    // chores UNdone
    bathDayCell.clean=false;
    dishDayCell.clean=false;
    trashDayCell.clean=false;

    if(STATE.bathWeekCount==3){
      GAME.grid.setCellAt(bathDayCell,1,weekCell);
      STATE.bathWeekCount=1;
    }else{
      STATE.bathWeekCount++;
    }
    GAME.grid.setCellAt(dishDayCell,3,weekCell);
    //set
    GAME.grid.setCellAt(trashDayCell,STATE.trashDay,weekCell);
}

function randomTrash(){

}

function payRent(){
  //subtract rent from $
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
    STATE.miniGameOn =false;
    if (meter1.val<100){
      showModal("Result", "Nice work, splendidly handled!");
      meter1.update(0.);
    }else{
      showModal("Result", "You missed a spot.  It cost you $100");
      STATE.resources.money-=100;
      meter1.update(0.);
    }
  }
}
// The game's main loop.
// We're just using it to set a background color
function main() {

  //background(58, 170, 80);
//  console.log(STATE.months.january)
//textAlign(CENTER);
//textSize(24);
//text("R00M13Z: The Simulation",winW/2,winH/20);
//textAlign(LEFT);
  //check turn event
    //chore?
    //payday?
    //random event?
  //check week event
    //reset chores
  //check month event
    //rent
  //check year event
    //rent raise
    if(STATE.miniGameOn){
      meter1.update(meter1.val + .25);
      console.log(meter1.val)
    }
  }
