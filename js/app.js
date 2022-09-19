import {
  handleMenuButtonClick,
  handleFilterByGenderButtonClick,
  handleSortButtonClick,
  handleNameInputChange,
} from './eventHandlers.js';

import { renderCards, renderSpinner } from './renderers.js';

import { fetchPeople } from './fetchPeople.js';

export const state = {
  initialArray: [],
  arrayToRender: [],
  filter: {
    gender: 'all',
    ageMin: 0,
    ageMax: 200,
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
      `filtered by age value ${this.filter.ageMin} < value < ${this.filter.ageMax}`
    );
    const done = array.filter(
      (item) => item.age >= this.filter.ageMin && item.age <= this.filter.ageMax
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

document.addEventListener('DOMContentLoaded', async () => {
  renderSpinner();
  state.initialArray = await fetchPeople();
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

  document.querySelector('#name-input').addEventListener('change', (event) => {
    console.log('Name changed!');
    handleNameInputChange(event);
  });
});
