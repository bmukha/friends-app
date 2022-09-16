export const handleFormChange = (event) => {
  event.preventDefault();
  console.log(event.target);
};

export const handleMenuButtonClick = ({ target }) => {
  // TODO delete target
  console.log(target.src);
  document.getElementById('aside').classList.toggle('hidden');
};

// TODO temporary
// export outlineToggler = (item) => if
