'use strict';

//Selecting elements
const dayInput = document.getElementById('input--day');
const monthInput = document.getElementById('input--month');
const yearIput = document.getElementById('input--year');

const daysEl = document.getElementById('daysEl');
const monthsEl = document.getElementById('monthsEl');
const yearsEl = document.getElementById('yearsEl');

const labels = document.querySelectorAll('.label');
const inputs = document.querySelectorAll('.input');
const smallMsgs = document.querySelectorAll('small');

const labelsArr = Array.from(labels);
const smallArr = Array.from(smallMsgs);
const inputsArr = Array.from(inputs);

const btnCalcAge = document.getElementById('calc--age');

//Calculate age

const restoreError = function (input) {
  const parent = input.closest('div.bday--input');
  const label = parent.querySelector('label');
  const message = parent.querySelectorAll('small');

  input.classList.remove('red--border');
  label.classList.remove('error');
  message.forEach((mes) => mes.classList.remove('display--error-msg'));
};

const init = function () {
  inputs.forEach(restoreError);
  inputs.forEach((inp) => (inp.value = ''));

  daysEl.textContent = '--';
  monthsEl.textContent = '--';
  yearsEl.textContent = '--';
};

inputs.forEach((input) =>
  input.addEventListener('focus', () => {
    if (input.classList.contains('red--border')) restoreError(input);
  })
);

const inputError = function (inp, errorMsg) {
  console.log(inp, errorMsg);
  const input = inputsArr.find((inpt) => inpt.classList.contains(`input--${inp}`));
  const label = labelsArr.find((label) => label.classList.contains(`label-${inp}`));
  const small = smallArr.find((msg) => msg.classList.contains(`error--msg-${inp}`));

  input.classList.add('red--border');
  label.classList.add('error');
  small.classList.add('display--error-msg');
  small.textContent = errorMsg;
};

const checkInput = function (value, type) {
  const currentYear = new Date().getFullYear();

  if (value.length === 0) inputError(type, 'This field is required');

  if (type === 'day') {
    if (value.length === 1) inputError(type, 'Must be a valid day');
    else if (value.length === 2 && (+value < 1 || +value > 31)) inputError(type, 'Must be a valid day');
    else return +value;
  }
  if (type === 'month') {
    if (value.length === 1) inputError(type, 'Must be a valid month');
    else if (value.length === 2 && (+value < 1 || +value > 12)) inputError(type, 'Must be a valid month');
    else return value;
  }
  if (type === 'year') {
    console.log(type, value);
    if (value.length >= 1 && value.length < 4) inputError(type, 'Must be a valid year');
    else if (value.length === 4 && (+value < 1900 || +value > currentYear)) inputError(type, 'Must be a valid year');
    else return +value;
  }
};

const calcAge = function () {
  const birthDay = dayInput.value;
  const birthMonth = monthInput.value; //Month is 0 based
  const birthYear = yearIput.value;

  const day = checkInput(birthDay, 'day');
  const month = checkInput(birthMonth, 'month') - 1;
  const year = checkInput(birthYear, 'year');

  if (day && month && year) {
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    let daysDiff = currentDay - day;
    let monthsDiff = currentMonth - month;
    let yearsDiff = currentYear - year;

    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
      yearsDiff--;
      monthsDiff += 12;
    }
    if (daysDiff < 0) {
      const lastMonth = new Date(currentYear, currentMonth - 1, birthDay);
      const diffTime = new Date() - lastMonth;

      daysDiff = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      monthsDiff--;
    }

    daysEl.textContent = daysDiff;
    monthsEl.textContent = monthsDiff;
    yearsEl.textContent = yearsDiff;
  }
};
btnCalcAge.addEventListener('click', calcAge);

document.addEventListener('keydown', (event) => {
  event.key === 'Enter' && calcAge();
});

document.addEventListener('click', (event) => {
  const targ = event.target;
  if (targ.parentElement === document.querySelector('html')) init();
});
