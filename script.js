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

//Calculate age

const checkEmptyInput = function (input, type) {
  if (!input || input < 0) {
    const input = inputsArr.find((inp) => inp.classList.contains(`input--${type}`));
    const label = labelsArr.find((label) => label.classList.contains(`label-${type}`));
    const message = smallArr.find((msg) => msg.classList.contains(`empty--msg-${type}`));

    input.classList.add('red--border');
    label.classList.add('error');
    message.classList.add('display--error');
  }
};

const calcAge = function () {
  const birthDay = +dayInput.value;
  const birthMonth = +monthInput.value - 1;
  const birthYear = +yearIput.value;

  checkEmptyInput(birthDay, 'day');
  checkEmptyInput(birthMonth, 'month');
  checkEmptyInput(birthYear, 'year');

  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  let days = currentDay - birthDay;
  let months = currentMonth - birthMonth;
  let years = currentYear - birthYear;

  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }
  if (days < 0) {
    const lastMonth = new Date(currentYear, currentMonth - 1, birthDay);
    const diffTime = new Date() - lastMonth;

    days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    months--;
  }

  document.getElementById('days2').textContent = days;
  document.getElementById('months2').textContent = months;
  document.getElementById('years2').textContent = years;
};

btnCalcAge.addEventListener('click', calcAge);

document.addEventListener('keydown', (event) => {
  event.key === 'Enter' && calcAge();
});
