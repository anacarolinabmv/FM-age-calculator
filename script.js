'use strict';

const dayEl = document.getElementById('day--input');
const monthEl = document.getElementById('month--input');
const yearEl = document.getElementById('year--input');

//days input
for (let day = 1; day <= 31; day++) {
  const html = `<option value="${day}">${day}</option>`;
  dayEl.insertAdjacentHTML('beforeend', html);
}

//months input
const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

monthsShort.forEach((month) => {
  const html = `<option value="${month}">${month}</option>`;
  monthEl.insertAdjacentHTML('beforeend', html);
});

//yearsinput
const currentYear = new Date().getFullYear();

for (let year = 1920; year <= currentYear; year++) {
  const html = `<option value="${year}">${year}</option>`;
  yearEl.insertAdjacentHTML('beforeend', html);
}

//Calculating age

const btnCalcAge = document.getElementById('calc--age');

const calcAge = function () {
  const birthDay = +dayEl.value;
  const bMonth = monthEl.value;
  const birthMonth = +monthsShort.indexOf(`${bMonth}`);
  const birthYear = +yearEl.value;

  console.log(bMonth, birthMonth);

  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  let days = currentDay - birthDay;
  let months = currentMonth - birthMonth;
  let years = currentYear - birthYear;

  console.log(days, years, months);

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
calcAge();
btnCalcAge.addEventListener('click', calcAge);
