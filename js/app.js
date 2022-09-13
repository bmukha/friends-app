import { defaultResults } from './defaultResults.js';

// const fetchPeople = async () => {
//   try {
//     const response = await fetch(
//       'https://randomuser.me/api/?results=50&inc=gender,name,phone,age,email,picture&noinfo'
//     );
//     const data = await response.json();
//     console.log(JSON.stringify(data));
//   } catch (error) {
//     console.log(error);
//   }
// };

// fetchPeople();
console.log(defaultResults.results);
