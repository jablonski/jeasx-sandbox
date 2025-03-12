import fetchJokes from "./fetchJokes";

export default async function JokesHTML({ category, amount }) {
  const jokes = await fetchJokes(category, amount);
  return (
    <ul>
      <p>${process.env.BROWSER_PUBLIC_BUILD_TIME}</p>
      {jokes.map((joke) => (
        <li>{joke}</li>
      ))}
    </ul>
  );
}
