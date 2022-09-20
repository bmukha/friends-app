import { renderCards } from './renderers.js';
import { state } from './app.js';

// export const handleMenuButtonClickEvent = ({ target }) => {
//   // console.log(target.parentElement);
//   if (target.type !== 'button' && target.parentElement.type !== 'button')
//     return;
//   const newTarget = target.type === 'button' ? target : target.parentElement;
//   // console.log(newTarget);
// };

export const handleMenuButtonClick = ({ target }) => {
  console.log(target.src);
  target.src.includes('bars-solid.svg')
    ? target.setAttribute('src', '/img/xmark-solid.svg')
    : target.setAttribute('src', '/img/bars-solid.svg');
  document.getElementById('aside').classList.toggle('hidden');
};

const toggleFocusOfGroupOfButtons = (element, buttonClass) => {
  document.querySelectorAll(`.${buttonClass}`).forEach((button) => {
    if (element === button) {
      button.classList.add('is-pressed');
    } else {
      button.classList.remove('is-pressed');
    }
  });
};

const handleGroupOfButtons = (event, buttonClass) => {
  const element =
    event.target.tagName === 'IMG' ? event.target.parentElement : event.target;
  if (element.classList.contains('is-pressed')) return;
  toggleFocusOfGroupOfButtons(element, buttonClass);
  // console.log(element.dataset.type);
  const value = element.dataset.type.split(' ');
  if (value[0] === 'filter') {
    state.filter[value[1]] = value[2];
  }
  if (value[0] === 'sort') {
    state.sort = value[1];
  }
  // console.log(state);
  state.prepareArrayToRender();
  renderCards(state.arrayToRender);
};

export const handleFilterByGenderButtonClick = (event) => {
  handleGroupOfButtons(event, 'filter-gender-button');
};

export const handleSortButtonClick = (event) => {
  handleGroupOfButtons(event, 'sort-button');
};

export const handleNameInputChange = (event) => {
  // console.log(event.target.value);
  state.filter.name = event.target.value;
  state.prepareArrayToRender();
  renderCards(state.arrayToRender);
};

export const handleMinAgeInput = ({ target }) => {
  const newValue = target.value;
  // console.log(
  //   `For this field min value is ${target.min} and max value is ${target.max}`
  // );
  const valueToUse =
    newValue < target.min
      ? target.min
      : newValue > target.max
      ? target.max
      : newValue;
  target.setAttribute('value', valueToUse);
  document.getElementById('max-age-input').setAttribute('min', valueToUse);
  state.filter.minAge = valueToUse;
  state.prepareArrayToRender();
  renderCards(state.arrayToRender);
};

export const handleMaxAgeInput = ({ target }) => {
  const newValue = target.value;
  // console.log(
  //   `For this field min value is ${target.min} and max value is ${target.max}`
  // );
  const valueToUse =
    newValue < target.min
      ? target.min
      : newValue > target.max
      ? target.max
      : newValue;
  target.setAttribute('value', valueToUse);
  document.getElementById('min-age-input').setAttribute('max', valueToUse);
  state.filter.maxAge = valueToUse;
  state.prepareArrayToRender();
  renderCards(state.arrayToRender);
};

// export const handleMinAgeInvalidInput = (event) => {
//   console.log('invalid min value');
//   event.target.value = event.target.min;
//   state.prepareArrayToRender();
//   renderCards(state.arrayToRender);
// };

// export const handleMaxAgeInvalidInput = (event) => {
//   console.log('invalid max value');
//   event.target.value = event.target.max;
//   state.prepareArrayToRender();
//   renderCards(state.arrayToRender);
// };
