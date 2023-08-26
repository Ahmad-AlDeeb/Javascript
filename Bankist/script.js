'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

///////// Helper Functions /////////
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}$</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
const calcPrintBalance = function (account) {
  const balance = account.movements.reduce((acc, mov) => acc + mov);
  account.balance = balance;
  labelBalance.textContent = `${balance}$`;
};
const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}$`;

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}$`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}$`;
};
const updateUser = function (acc) {
  displayMovements(acc.movements);
  calcPrintBalance(acc);
  calcDisplaySummary(acc);
};

let currentAccount;
let sort = false;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  let user = inputLoginUsername.value;
  let pin = Number(inputLoginPin.value);
  currentAccount = accounts.find(
    acc => acc.username === user && acc.pin == pin
  );

  if (currentAccount) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUser(currentAccount);
    containerApp.style.opacity = 100;
  }
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const toUser = inputTransferTo.value;
  const amount = inputTransferAmount.value;
  const receiver = accounts.find(acc => acc.username === toUser);

  if (
    receiver &&
    amount > 0 &&
    amount <= currentAccount.balance &&
    currentAccount.username !== receiver.username
  ) {
    currentAccount.movements.push(-amount);
    receiver.movements.push(+amount);
    updateUser(currentAccount);

    inputTransferTo.value = inputTransferAmount.value = '';
    inputTransferAmount.blur();
  }
});
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const user = inputCloseUsername.value;
  const pin = +inputClosePin.value;
  const accIndex = accounts.findIndex(acc => acc.username == user);

  if (currentAccount.username === user && currentAccount.pin === pin) {
    accounts.splice(accIndex, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
  }
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.movements.some(
      amount => amount >= inputLoanAmount.value / 10
    )
  ) {
    currentAccount.movements.push(+inputLoanAmount.value);
    updateUser(currentAccount);
    inputLoanAmount.value = '';
  }
});
btnSort.addEventListener('click', function (e) {
  displayMovements(currentAccount.movements, !sort);
  sort = !sort;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
const stat = ['too little', 'okay amount', 'too much'];
const eating = function (recommended, amount) {
  const percent = recommended * 0.1;
  if (amount > recommended + percent) return 2;
  else if (amount < recommended - percent) return 0;
  else return 1;
};
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
dogs.forEach(
  dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);

const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));

console.log(
  `Sarah's dog is eating ${
    stat[eating(sarahDog.recommendedFood, sarahDog.curFood)]
  }`
);

const ownersEatTooMuch = dogs
  .filter(dog => eating(dog.recommendedFood, dog.curFood) == 2)
  .flatMap(dog => dog.owners);
const ownersEatTooLittle = dogs
  .filter(dog => eating(dog.recommendedFood, dog.curFood) == 0)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch, ownersEatTooLittle);

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

console.log(dogs.some(dog => eating(dog.recommendedFood, dog.curFood) == 1));
const eatingOkay = dogs.filter(
  dog => eating(dog.recommendedFood, dog.curFood) == 1
);
const sortedDogs = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(sortedDogs);
console.log(dogs);
