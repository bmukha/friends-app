const content = document.getElementById('content');

export const renderSpinner = () => {
  content.innerHTML = `<div class="semipolar-spinner">
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
      </div>`;
};

export const renderCards = async (arr) => {
  const cardsWrapper = document.createElement('div');
  cardsWrapper.id = 'cards-wrapper';
  if (!arr.length) {
    cardsWrapper.insertAdjacentHTML(
      'beforeend',
      `<p class="nobody-message">Ooops!!! It look like you filtered out everyone!</p>`
    );
  } else {
    arr.forEach((item) => {
      const { age, gender, email, title, name, picture, phone } = item;
      cardsWrapper.insertAdjacentHTML(
        'beforeend',
        `<div class='card' data-gender="${gender}">
  <div class='card-top'>
    <div class="title-and-name">
      <span class='card-title'>${title}.</span>
      <span class='card-name'>${name}</span>
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
      <span>&nbsp;${phone}</span>
    </div>
    <div class='card-email'>
      <img class='icon' src='./img/email.svg' alt='email icon' />
      <span>&nbsp;${email}</span>
    </div>
  </div>
</div>`
      );
    });
  }
  content.innerHTML = '';
  content.appendChild(cardsWrapper);
};
