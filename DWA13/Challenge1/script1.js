const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State']
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie']


// Using forEach to console log each name to the console.
names.forEach(name => console.log(name));


// Using forEach to console log each name with a matching province
names.forEach((name, index) => {
  const province = provinces[index];
  console.log(`${name} (${province})`);
});


/* Convert each province to uppercase using map and toUpperCase()
 * Log the result to the console
 */
const upperCase = provinces.map((province) => province.toUpperCase());
console.log(upperCase);

// new array with map that has the amount of characters in each name.
const newArray = names.map((name) => {
  return name.length
});
console.log(newArray);


// Using toSorted to sort all provinces alphabetically.
console.log(provinces.toSorted());


// Using filter to remove all provinces that have the word Cape in them.
const provinceFilter = provinces.filter(province => !province.includes('Cape'));  //checks for "Cape" in each province.
const remainingProvinces = provinceFilter.length;
console.log(remainingProvinces);


// Creates a boolean array indicating whether each name contains an 'S' character in it.
const S_Character = names.map(name => name.split('').some(char => char.toUpperCase() === 'S'));
console.log(S_Character);


// Using only reduce to turn the above into an object that indicates the province of an individual.
const results = names.reduce((acc, name, index) => {
  acc[name] = provinces[index];
  return acc;
}, {});

console.log(results);