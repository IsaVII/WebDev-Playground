const users = [
  { name: "Ada", age: 36 },
  { name: "Linus", age: 17 },
];

const adults = users.filter((user) => user.age >= 18);

console.log(adults.map((user) => user.name));
// ["Ada"]
