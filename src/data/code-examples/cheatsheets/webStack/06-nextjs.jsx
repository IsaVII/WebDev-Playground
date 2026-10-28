// app/users/[id]/page.jsx  ->  /users/42
export default async function UserPage({ params }) {
  const { id } = await params;
  const res = await fetch(`https://api.example.com/users/${id}`);
  const user = await res.json();

  return <h1>{user.name}</h1>;
}
