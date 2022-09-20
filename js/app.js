import {
  handleMenuButtonClick,
  handleFilterByGenderButtonClick,
  handleSortButtonClick,
  handleNameInputChange,
  handleMinAgeInput,
  handleMaxAgeInput,
  handleMinAgeInvalidInput,
  handleMaxAgeInvalidInput,
} from './eventHandlers.js';

import { renderCards, renderSpinner } from './renderers.js';

import { fetchPeople } from './fetchPeople.js';

export const state = {
  initialArray: [],
  arrayToRender: [],
  minPossibleAge: undefined,
  maxPossibleAge: undefined,
  filter: {
    gender: 'all',
    minAge: undefined,
    maxAge: undefined,
    name: '',
  },
  sort: 'random',
  filterByGender() {
    if (this.filter.gender === 'all') return [...this.initialArray];
    console.log(`filtered by gender value ${this.filter.gender}`);
    const done = this.initialArray.filter(
      (item) => item.gender === this.filter.gender
    );
    console.log(done);
    return done;
  },
  filterByAge(array) {
    console.log(
      `filtered by age value ${this.filter.minAge} < value < ${this.filter.maxAge}`
    );
    const done = array.filter(
      (item) => item.age >= this.filter.minAge && item.age <= this.filter.maxAge
    );
    console.log(done);
    return done;
  },
  filterByName(array) {
    console.log(`filtered by name value ${this.filter.name}`);
    const done = array.filter((item) =>
      item.name.toLowerCase().includes(this.filter.name.toLowerCase())
    );
    console.log(done);
    return done;
  },
  sortBy(array) {
    console.log(`sorted by value ${this.sort}`);
    if (this.sort === 'random') return (this.arrayToRender = array);
    switch (this.sort) {
      case 'name-ascending':
        this.arrayToRender = array.sort((item1, item2) =>
          item1.name < item2.name ? -1 : item1.name === item2.name ? 0 : 1
        );
        break;
      case 'name-descending':
        this.arrayToRender = array.sort((item1, item2) =>
          item1.name > item2.name ? -1 : item1.name === item2.name ? 0 : 1
        );
        break;
      case 'age-ascending':
        this.arrayToRender = array.sort((item1, item2) =>
          +item1.age < +item2.age ? -1 : item1.age === item2.age ? 0 : 1
        );
        break;
      case 'age-descending':
        this.arrayToRender = array.sort((item1, item2) =>
          +item1.age > +item2.age ? -1 : item1.age === item2.age ? 0 : 1
        );
        break;
      default:
        console.log(`Sorting failed! value of sorting is ${this.sort}`);
        break;
    }
  },
  prepareArrayToRender() {
    const filteredByGender = this.filterByGender();
    const filteredByAge = this.filterByAge(filteredByGender);
    const filteredByName = this.filterByName(filteredByAge);
    this.sortBy(filteredByName);
  },
};

const setMinAndMaxAgeInStackFromArrayOfPeople = (array) => {
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
  setMinAndMaxAgeInStackFromArrayOfPeople(state.initialArray);
  setMinAndMaxValuesInFilterFields();
  console.log(state);
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

  document.querySelector('#name-input').addEventListener('input', (event) => {
    console.log('Name changed!');
    handleNameInputChange(event);
  });

  document
    .getElementById('min-age-input')
    .addEventListener('input', handleMinAgeInput);

  document
    .getElementById('min-age-input')
    .addEventListener('invalid', handleMinAgeInvalidInput);

  document
    .getElementById('max-age-input')
    .addEventListener('input', handleMaxAgeInput);

  document
    .getElementById('max-age-input')
    .addEventListener('invalid', handleMaxAgeInvalidInput);
});
