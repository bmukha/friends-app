import { renderCards, renderSpinner } from './renderers.js';
import { state } from './app.js';

export const handleMenuButtonClickEvent = ({ target }) => {
  console.log(target.parentElement);
  if (target.type !== 'button' && target.parentElement.type !== 'button')
    return;
  const newTarget = target.type === 'button' ? target : target.parentElement;
  console.log(newTarget);
};

export const handleMenuButtonClick = () => {
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
  console.log(element.dataset.type);
  const value = element.dataset.type.split(' ');
  if (value[0] === 'filter') {
    state.filter[value[1]] = value[2];
  }
  if (value[0] === 'sort') {
    state.sort = value[1];
  }
  console.log(state);
  state.prepareArrayToRender();
  renderCards(state.arrayToRender);
};

export const handleFilterByGenderButtonClick = (event) => {
  handleGroupOfButtons(event, 'filter-gender-button');
};

export const handleSortButtonClick = (event) => {
  handleGroupOfButtons(event, 'sort-button');
};
