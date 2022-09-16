export const handleFormChange = (event) => {
  console.log(event.target);
};

export const handleCloseButtonClick = () => {
  document.getElementById('aside').classList.add('hidden');
};

export const handleMenuButtonClick = ({ target }) => {
  // TODO delete target
  console.log(target.src);
  document.getElementById('aside').classList.toggle('hidden');
};
