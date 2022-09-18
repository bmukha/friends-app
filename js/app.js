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
  filters: {
    gender: 'all',
    ageMin: 0,
    ageMax: 200,
    name: '',
  },
  sort: null,
  filterByGender() {
    if (this.gender === 'all') this.arrayToRender = [...this.initialArray];
    this.arrayToRender = this.initialArray.filter(
      (item) => item.gender === this.filters.gender
    );
  },
  filterByAge() {
    this.initialArray = this.initialArray.filter(
      (item) =>
        item.dob.age >= this.filters.ageMin &&
        item.dob.age <= this.filters.ageMax
    );
  },
  filterByName() {
    if (this.filters.name === '') return;
    this.initialArray = this.initialArray.filter((item) =>
      `${item.name.first} ${item.name.last}`.includes(this.filters.name)
    );
  },
  sort() {
    if (this.sort === null) return;
    switch (this.sort) {
      case 'name-ascending':
        this.arrayToRender = this.arrayToRender.sort((item1, item2) =>
          item1.name.first > item2.name.first ? -1 : a === b ? 0 : 1
        );
        break;
      case 'name-descending':
        this.arrayToRender = this.arrayToRender.sort((item1, item2) =>
          item1.name.first > item2.name.first ? -1 : a === b ? 0 : 1
        );
        break;
      case 'age-ascending':
        this.arrayToRender = this.arrayToRender.sort((item1, item2) =>
          item1.dob.age > item2.dob.age ? -1 : a === b ? 0 : 1
        );
        break;
      case 'age-descending':
        this.arrayToRender = this.arrayToRender.sort((item1, item2) =>
          item1.dob.age > item2.dob.age ? -1 : a === b ? 0 : 1
        );
        break;
    }
  },
  prepareArrayToRender() {
    //TODO write filter and sort
    console.log('first');
  },
};

document.addEventListener('DOMContentLoaded', async () => {
  renderSpinner();
  state.initialArray = await fetchPeople();
  console.log(state);
  renderCards(state.arrayToRender);
  document
    .getElementById('sort-and-filter')
    .addEventListener('click', handleFormChange);
  document
    .getElementById('menu-button')
    .addEventListener('click', handleMenuButtonClick);
  const buttons = Array.from(document.getElementsByClassName('gender'));
  buttons.forEach((button) =>
    button.addEventListener('click', handleFilterByGenderButtonClick)
  );
});
