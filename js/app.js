import {
  handleFormChange,
  handleCloseButtonClick,
  handleMenuButtonClick,
} from './eventHandlers.js';

const cardsWrapper = document.getElementById('cards-wrapper');

const renderCards = (arr) => {
  arr.forEach((item) => {
    const { title, first, last } = item.name;
    const picture = item.picture.medium;
    const age = item.dob.age;
    const { gender, cell, email } = item;
    cardsWrapper.insertAdjacentHTML(
      'beforeend',
      `<div class='card' data-gender="${gender}">
  <div class='card-top'>
    <div class="title-and-name">
      <span class='card-title'>${title}.</span>
      <span class='card-name'>${first} ${last}</span>
    </div>
    <div class="pic-and-age">  
      <img
      src=${picture}
      alt=''
      class='card-image'
      />
      <span class='card-age'>${age} y.o.</span>
    </div>
  </div>
  <div class='card-bottom'>
    <div class='card-phone'>
      <img class='icon' src='./img/phone.svg' alt='phone icon' />
      <span>${cell}</span>
    </div>
    <div class='card-email'>
      <img class='icon' src='./img/mail.svg' alt='email icon' />
      <span> ${email}</span>
    </div>
  </div>
</div>`
    );
  });
};

const fetchPeople = async () => {
  let data;
  try {
    const response = await fetch(
      'https://randomuser.me/api/?results=50&inc=gender,name,cell,dob,email,picture&noinfo'
    );
    data = await response.json();
  } catch (error) {
    console.log('Rendered from default results');
    data = defaultResults;
  }
  renderCards(data.results);
};

document.addEventListener('DOMContentLoaded', () => {
  fetchPeople();
  document
    .getElementById('sort-and-filter')
    .addEventListener('change', handleFormChange);
  // document
  //   .getElementById('close-button')
  //   .addEventListener('click', handleCloseButtonClick);
  document
    .getElementById('menu-button')
    .addEventListener('click', handleMenuButtonClick);
});

// fetchPeople();
// console.log(defaultResults.results);
