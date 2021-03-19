const users = [
  { name: 'Jill' },
  { name: 'Alex' },
  { name: 'Bill' }
];




// Find a user with a name
const user = users.find(user => {
  return user.name === 'Alex';
});


let userb;
// for loop version
for (let i = 0; i < users.length; i++) {
  if (users[i].name === 'Alex') {
    userb = users[i];
    break;
  }
}

console.log(user);
console.log(userb);
