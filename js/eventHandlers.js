import { renderCards, renderSpinner } from './renderers.js';
import { state } from './app.js';

export const handleFormChange = (event) => {
  event.preventDefault();
  console.log("I'm form change event");
};

export const handleOnClickEvent = () => {
  // event.preventDefault();
  console.log("I'm oninput event");
};

export const handleMenuButtonClick = () => {
  document.getElementById('aside').classList.toggle('hidden');
};

export const handleFilterByGenderButtonClick = (event) => {
  console.log(state);
  const element =
    event.target.tagName === 'IMG' ? event.target.parentElement : event.target;
  console.log(element.dataset.filterGender);
  if (element.classList.contains('is-pressed')) return;
  const sameBbuttons = Array.from(document.getElementsByClassName('gender'));
  sameBbuttons.forEach((button) => {
    if (element === button) {
      button.classList.add('is-pressed');
    } else {
      button.classList.remove('is-pressed');
    }
  });
  state.filters.gender = element.dataset.filterGender;
  state.prepareArrayToRender();
  renderCards(state.arrayToRender);
  console.log('state is:');
  console.log(state);
};
