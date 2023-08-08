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

for (let year = 1900; year <= currentYear; year++) {
  const html = `<option value="${year}">${year}</option>`;
  yearEl.insertAdjacentHTML('beforeend', html);
}

//Calculating age

const btnCalcAge = document.getElementById('calc--age');

const calcAge = function () {
  const dayVal = dayEl.value.padStart(2, 0);
  const monthVal = monthEl.value;
  const monthNumVal = `${monthsShort.indexOf(`${monthVal}`) + 1}`.padStart(2, 0);
  const yearVal = yearEl.value;

  const nowTimestamp = Date.now();
  const now = new Date();

  const bdayString = `${yearVal}-${monthNumVal}-${dayVal}T${`${now.getHours()}`.padStart(
    2,
    0
  )}:${`${now.getMinutes()}`.padStart(2, 0)}:00`;
  const bdayTimestamp = new Date(bdayString).getTime();

  const years = (nowTimestamp - bdayTimestamp) / 1000 / 60 / 60 / 24 / 365.25;
  const months = (years - Math.floor(years)) * 12;
  const days = (months - Math.floor(months)) * 30.4375;

  document.getElementById('years2').textContent = Math.floor(years);
  document.getElementById('months2').textContent = Math.floor(months);
  document.getElementById('days2').textContent = Math.ceil(days);
};

btnCalcAge.addEventListener('click', calcAge);
