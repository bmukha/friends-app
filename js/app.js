import {
  handleFormChange,
  handleMenuButtonClick,
  handleFilterByGenderButtonClick,
} from './eventHandlers.js';

import { renderCards, renderSpinner } from './renderers.js';

import { fetchPeople } from './fetchPeople.js';

const state = {
  initialArray: [],
  arrayToRender: [],
};

document.addEventListener('DOMContentLoaded', async () => {
  renderSpinner();
  state.initialArray = state.arrayToRender = await fetchPeople();
  console.log(state);
  renderCards(state.arrayToRender);
  // document
  //   .getElementById('sort-and-filter')
  //   .addEventListener('click', handleFormChange);
  // document
  //   .getElementById('menu-button')
  //   .addEventListener('click', handleMenuButtonClick);
  // const buttons = Array.from(document.getElementsByClassName('gender'));
  // buttons.forEach((button) =>
  //   button.addEventListener('click', handleFilterByGenderButtonClick)
  // );
});
