/*
Filename: AdvancedDataProcessing.js

This code performs a complex data processing operation using various JavaScript concepts and techniques.

Please note that the code below is for illustrative purposes only and may not serve any practical purpose.

*/

// Define a complex dataset
const dataset = [
  { id: 1, name: 'John', age: 25, profession: 'Engineer' },
  { id: 2, name: 'Jane', age: 30, profession: 'Doctor' },
  { id: 3, name: 'David', age: 22, profession: 'Student' },
  { id: 4, name: 'Sarah', age: 35, profession: 'Lawyer' },
  // ... Add more data here
];

// Perform advanced data processing

// Calculate the average age of the dataset
function calculateAverageAge() {
  const sum = dataset.reduce((accumulator, current) => accumulator + current.age, 0);
  return sum / dataset.length;
}

// Group dataset by profession
function groupByProfession() {
  const groupedData = {};

  for (let i = 0; i < dataset.length; i++) {
    const profession = dataset[i].profession;

    if (!groupedData[profession]) {
      groupedData[profession] = [];
    }

    groupedData[profession].push(dataset[i]);
  }

  return groupedData;
}

// Get the dataset sorted by age in descending order
function sortByAgeDescending() {
  return [...dataset].sort((a, b) => b.age - a.age);
}

// Perform the data processing and log the results

const averageAge = calculateAverageAge();
console.log('Average age:', averageAge);

const groupedByProfession = groupByProfession();
console.log('Grouped by profession:', groupedByProfession);

const sortedByAgeDescending = sortByAgeDescending();
console.log('Sorted by age (descending):', sortedByAgeDescending);

// ... Perform more complex data processing here

// End of the code