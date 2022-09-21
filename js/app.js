import {
  handleMenuButtonClick,
  handleFilterByGenderButtonClick,
  handleSortButtonClick,
  handleNameInputChange,
  handleMinAndMaxAgeInput,
} from './eventHandlers.js';

import { renderCards, renderSpinner } from './renderers.js';

import { fetchPeople } from './fetchPeople.js';

export const state = {
  initialArray: [],
  arrayToRender: [],
  filter: {
    gender: 'all',
    minAge: undefined,
    maxAge: undefined,
    name: '',
  },
  sort: 'random',
  // filter() {},

  filterByGender() {
    if (this.filter.gender === 'all') return [...this.initialArray];
    const done = this.initialArray.filter(
      (item) => item.gender === this.filter.gender
    );
    return done;
  },
  filterByAge(array) {
    const done = array.filter(
      (item) => item.age >= this.filter.minAge && item.age <= this.filter.maxAge
    );
    return done;
  },
  filterByName(array) {
    const done = array.filter((item) =>
      item.name.toLowerCase().includes(this.filter.name.toLowerCase())
    );
    return done;
  },
  sortBy(array) {
    if (this.sort === 'random') return (this.arrayToRender = array);
    let sortingFunction;
    switch (this.sort) {
      case 'name-ascending':
        sortingFunction = (item1, item2) =>
          item1.name < item2.name ? -1 : item1.name === item2.name ? 0 : 1;
        break;
      case 'name-descending':
        sortingFunction = (item1, item2) =>
          item1.name > item2.name ? -1 : item1.name === item2.name ? 0 : 1;
        break;
      case 'age-ascending':
        sortingFunction = (item1, item2) =>
          +item1.age < +item2.age ? -1 : item1.age === item2.age ? 0 : 1;
        break;
      case 'age-descending':
        sortingFunction = (item1, item2) =>
          +item1.age > +item2.age ? -1 : item1.age === item2.age ? 0 : 1;
        break;
      default:
        break;
    }
    this.arrayToRender = array.sort(sortingFunction);
  },
  prepareArrayToRender() {
    const filteredByGender = this.filterByGender();
    const filteredByAge = this.filterByAge(filteredByGender);
    const filteredByName = this.filterByName(filteredByAge);
    this.sortBy(filteredByName);
  },
};

const getMinAndMaxAgeInStateFromArrayOfPeople = (array) => {
  state.filter.maxAge = state.filter.minAge = array[0].age;
  for (let i = 1; i < array.length; i++) {
    if (array[i].age < state.filter.minAge) {
      state.filter.minAge = array[i].age;
      continue;
    }
    if (array[i].age > state.filter.maxAge) {
      state.filter.maxAge = array[i].age;
    }
  }
};

const setMinAndMaxValuesInFilterFields = () => {
  const minAgeField = document.getElementById('min-age-input');
  const maxAgeField = document.getElementById('max-age-input');
  minAgeField.setAttribute('max', state.filter.maxAge);
  minAgeField.setAttribute('value', state.filter.minAge);
  minAgeField.setAttribute('min', state.filter.minAge);
  maxAgeField.setAttribute('min', state.filter.minAge);
  maxAgeField.setAttribute('value', state.filter.maxAge);
  maxAgeField.setAttribute('max', state.filter.maxAge);
};

document.addEventListener('DOMContentLoaded', async () => {
  renderSpinner();
  state.initialArray = await fetchPeople();
  getMinAndMaxAgeInStateFromArrayOfPeople(state.initialArray);
  setMinAndMaxValuesInFilterFields();
  renderCards(state.initialArray);
  document
    .querySelectorAll('.filter-gender-button')
    .forEach((button) =>
      button.addEventListener('click', handleFilterByGenderButtonClick)
    );
  document
    .querySelectorAll('.sort-button')
    .forEach((button) =>
      button.addEventListener('click', handleSortButtonClick)
    );

  document
    .getElementById('menu-button')
    .addEventListener('click', handleMenuButtonClick);

  document.getElementById('name-input').addEventListener('input', (event) => {
    handleNameInputChange(event);
  });

  document
    .querySelectorAll('.age-input')
    .forEach((element) =>
      element.addEventListener('input', handleMinAndMaxAgeInput)
    );
});
