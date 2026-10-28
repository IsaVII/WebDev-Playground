interface User {
  name: string;
  age: number;
}

function greet(user: User): string {
  return `Hello, ${user.name}!`;
}

greet({ name: "Ada", age: 36 });
greet({ name: "Ada", age: "36" });
// Error: Type 'string' is not assignable to type 'number'.
