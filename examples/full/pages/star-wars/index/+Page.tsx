import { For } from "solid-js";
import type { Data } from "./+data.js";
import { createDataStore } from "vike-solid/createDataStore";

export default function Page() {
  const [movies] = createDataStore<Data>();
  return (
    <>
      <h1>Star Wars Movies</h1>
      <ol>
        <For each={movies}>
          {(movie) => (
            <li>
              <a href={`/star-wars/${movie.id}`}>{movie.title}</a> ({movie.release_date})
            </li>
          )}
        </For>
      </ol>
      <p>
        Source: <a href="https://brillout.github.io/star-wars">brillout.github.io/star-wars</a>.
      </p>
    </>
  );
}
