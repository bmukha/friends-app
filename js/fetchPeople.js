const url = 'https://randomuser.me/api';
const numberOfPeople = 60;
const fields = ['gender', 'name', 'cell', 'dob', 'email', 'picture'];
export const fetchPeople = async () => {
  let data;
  try {
    const response = await fetch(
      `${url}/?results=${numberOfPeople}&inc=${fields.join()}&noinfo`
    );
    data = await response.json();
  } catch (error) {
    console.log('Rendered from default results');
  }
  // console.log(data.results);
  return data.results;
};
