export const handleFormChange = (event) => {
  event.preventDefault();
  // console.log(event.target);
};

export const handleMenuButtonClick = ({ target }) => {
  // TODO delete target
  // console.log(target.src);
  document.getElementById('aside').classList.toggle('hidden');
};

export const handleFilterByGenderButtonClick = (event) => {
  const element =
    event.target.tagName === 'IMG' ? event.target.parentElement : event.target;
  console.log(element.dataset);
  if (element.classList.contains('is-pressed')) return;
  const sameBbuttons = Array.from(document.getElementsByClassName('gender'));
  sameBbuttons.forEach((button) => {
    if (element === button) {
      button.classList.add('is-pressed');
    } else {
      button.classList.remove('is-pressed');
    }
  });
};
