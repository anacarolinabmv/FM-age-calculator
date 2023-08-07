'use strict';

const selectDay = document.getElementById('days');
const selectMonth = document.getElementById('months');
const selectYear = document.getElementById('years');

//days
for (let day = 1; day <= 31; day++) {
  const html = `<option value="${day}">${day}</option>`;
  selectDay.insertAdjacentHTML('beforeend', html);
}

//months
const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

monthsShort.forEach((month) => {
  const html = `<option value="${month}">${month}</option>`;
  selectMonth.insertAdjacentHTML('beforeend', html);
});

//years
const currentYear = new Date().getFullYear();

for (let year = 1900; year <= currentYear; year++) {
  const html = `<option value="${year}">${year}</option>`;
  selectYear.insertAdjacentHTML('beforeend', html);
}

//Calculating age

const btnCalcAge = document.getElementById('calcAge');

const calcAge = function () {
  const day = document.getElementById('days').value;
  const month = document.getElementById('months').value;
  const monthNum = monthsShort.indexOf(`${month}`);
  const year = document.getElementById('years').value;

  const timestampBirth = new Date(
    `${year}`,
    `${monthNum}`,
    `${day}`,
    `${new Date().getHours()}`,
    `${new Date().getMinutes()}`
  ).getTime();

  const now = new Date().getTime();
  const yearsNum = (now - timestampBirth) / 1000 / 60 / 60 / 24 / 365;
  const monthsNum = yearsNum - Math.floor(yearsNum);
  // const daysNum = yearsNum - Math.floor(monthsNum);
  console.log(monthsNum * 12);
  // console.log(daysNum);

  // document.getElementById('days2').textContent=;
  document.getElementById('years2').textContent = Math.floor(yearsNum);
  document.getElementById('months2').textContent = Math.floor((monthsNum * 12) / 10);
};

btnCalcAge.addEventListener('click', calcAge);

const now = new Date().getTime();
