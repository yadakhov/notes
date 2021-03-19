// use map when you want to recreate a new array by doing a function on each element

const numbers = [1, 2, 3, 4];

console.log(numbers);

const doubled = numbers.map(number => {
  return number * 2;
});

console.log(doubled);
