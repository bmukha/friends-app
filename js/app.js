import {
  handleMenuButtonClick,
  handleFilterByGenderButtonClick,
  handleOnClickEvent,
} from './eventHandlers.js';

import { renderCards, renderSpinner } from './renderers.js';

import { fetchPeople } from './fetchPeople.js';

export const state = {
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
    if (this.gender === 'all') {
      if (!this.arrayToRender.length) {
        this.arrayToRender = [...this.initialArray];
      }
      return;
    }
    this.arrayToRender = this.initialArray.filter(
      (item) => item.gender === this.filters.gender
    );
    console.log(`filtered by gender value ${this.filters.gender}`);
  },
  filterByAge() {
    this.arrayToRender = this.arrayToRender.filter(
      (item) =>
        item.dob.age >= this.filters.ageMin &&
        item.dob.age <= this.filters.ageMax
    );
    return this.arrayToRender;
  },
  filterByName() {
    if (this.filters.name === '') return this.arrayToRender;
    this.arrayToRender = this.arrayToRender.filter((item) =>
      `${item.name.first} ${item.name.last}`.includes(this.filters.name)
    );
  },
  sort() {
    if (this.sort === null) return this.arrayToRender;
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
    this.filterByGender();
    // this.filterByAge();
    // this.filterByName();
    // this.sort();
  },
};

document.addEventListener('DOMContentLoaded', async () => {
  renderSpinner();
  state.initialArray = await fetchPeople();
  renderCards(state.initialArray);
  document
    .getElementById('sort-and-filter')
    .addEventListener('input', handleOnClickEvent);
  document
    .getElementById('menu-button')
    .addEventListener('click', handleMenuButtonClick);
  const buttons = Array.from(document.getElementsByClassName('gender'));
  buttons.forEach((button) =>
    button.addEventListener('click', handleFilterByGenderButtonClick)
  );
});
