'use strict';

//Selecting elements
const dayInput = document.getElementById('input--day');
const monthInput = document.getElementById('input--month');
const yearIput = document.getElementById('input--year');

const labels = document.querySelectorAll('.label');
const inputs = document.querySelectorAll('.input');
const smallMsgs = document.querySelectorAll('small');

const labelsArr = Array.from(labels);
const smallArr = Array.from(smallMsgs);
const inputsArr = Array.from(inputs);

const btnCalcAge = document.getElementById('calc--age');
const currentYear = new Date().getFullYear();

let error = false;

//Calculate age

const init = function () {
  inputs.forEach((inp) => (inp.value = ''));

  document.getElementById('days2').textContent = '--';
  document.getElementById('months2').textContent = '--';
  document.getElementById('years2').textContent = '--';
};

const inputError = function (inp, errorType) {
  error = true;

  const errorMsg = errorType === 'empty' ? 'This field is required' : 'Must be a valid number';
  console.log(errorMsg);

  const input = inputsArr.find((inpt) => inpt.classList.contains(`input--${inp}`));
  const label = labelsArr.find((label) => label.classList.contains(`label-${inp}`));
  const small = smallArr.find((msg) => msg.classList.contains(`error--msg-${inp}`));
  console.log(input, label, small);

  input.classList.add('red--border');
  label.classList.add('error');
  small.classList.add('display--error');
  small.textContent = errorMsg;
};

const restoreError = function (input) {
  const parent = input.closest('div.bday--input');
  const label = parent.querySelector('label');
  const message = parent.querySelectorAll('small');

  input.classList.remove('red--border');
  label.classList.remove('error');
  message.forEach((mes) => mes.classList.remove('display--error'));
};

inputs.forEach((input) =>
  input.addEventListener('click', function () {
    if (error === true) {
      restoreError(input);
      error = false;
    }
  })
);

const checkDay = function (day) {
  if (day.length === 0) inputError('day', 'empty');
  else if (day.length === 1) inputError('day', 'invalid');
  else if (day.length === 2 && (+day < 1 || +day > 31)) inputError('day', 'invalid');
  else return day;
};

const checkMonth = function (month) {
  if (month.length === 0) inputError('month', 'empty');
  else if (month.length === 1) inputError('month', 'invalid');
  else if (month.length === 2 && (+month < 1 || +month > 12)) inputError('month', 'invalid');
  else return month;
};

const checkYear = function (year) {
  if (year.length === 0) inputError('year', 'empty');
  else if (year.length >= 1 && year.length < 4) inputError('year', 'invalid');
  else if (year.length === 4 && (+year < 1 || +year > currentYear)) inputError('year', 'invalid');
  else return year;
};

const calcAge = function () {
  const birthDay = dayInput.value;
  const birthMonth = monthInput.value; //Month is 0 based
  const birthYear = yearIput.value;

  const day = +checkDay(birthDay);
  const month = +checkMonth(birthMonth) - 1;
  const year = +checkYear(birthYear);

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

    document.getElementById('days2').textContent = daysDiff;
    document.getElementById('months2').textContent = monthsDiff;
    document.getElementById('years2').textContent = yearsDiff;

    inputs.forEach((input) => {
      input.addEventListener('click', function () {
        init();
      });
    });
  }
};

btnCalcAge.addEventListener('click', calcAge);

document.addEventListener('keydown', (event) => {
  event.key === 'Enter' && calcAge();
});
