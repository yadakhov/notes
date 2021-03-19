const prodcts = [
  { name: 'cucumber', type: 'vegetable', quantity: 10, price: 12.50 },
  { name: 'banana', type: 'fruit', quantity: 10, price: 1.50 },
  { name: 'celery', type: 'vegetable', quantity: 5, price: 2.50 },
  { name: 'orange', type: 'fruit', quantity: 0, price: 10 }
];

// only filter the fruits
const fruits = prodcts.filter(item => {
  return item.type === 'fruit'; 
});

// filter on vegetable
const vegetables = prodcts.filter(item => {
  return item.type === 'vegetable'; 
});

// vegetable that has quanity > 0 and price < 10
const vegs = prodcts.filter(product => {
  return product.type === 'vegetable' && product.quantity > 0 && product.price < 10;
});


console.log(fruits);
console.log(vegetables);
console.log(vegs);
