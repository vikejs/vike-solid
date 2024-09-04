import { createQuery } from "@tanstack/solid-query";
import type { MovieDetails } from "./types";
import { QueryBoundary } from "vike-solid-query";
import { For } from "solid-js";
import { navigate } from "vike/client/router";
import { Config } from "vike-solid/Config";
import { Head } from "vike-solid/Head";

export function Movies() {
  const query = createQuery(() => ({
    queryKey: ["movies"],
    queryFn: getStarWarsMovies,
  }));

  const onNavigate = (id: string) => {
    navigate(`/${id}`);
  };

  return (
    <QueryBoundary query={query} loadingFallback={<p>Loading movies ...</p>}>
      {(movies) => (
        <>
          <Config title={`${movies.length} Star Wars movies`} />
          <Head>
            <meta name="description" content={`List of ${movies.length} Star Wars movies.`} />
          </Head>
          <h1>Star Wars Movies</h1>
          <ol>
            <For each={movies}>
              {(movie) => (
                <li>
                  <button onClick={() => onNavigate(movie.id)}>{movie.title}</button> ({movie.release_date})
                </li>
              )}
            </For>
          </ol>
          <p>
            Source: <a href="https://star-wars.brillout.com">star-wars.brillout.com</a>.
          </p>
        </>
      )}
    </QueryBoundary>
  );
}

async function getStarWarsMovies(): Promise<MovieDetails[]> {
  // Simulate slow network
  await new Promise((r) => setTimeout(r, 2000));

  const response = await fetch("https://star-wars.brillout.com/api/films.json");
  let movies: MovieDetails[] = ((await response.json()) as any).results;
  movies = movies.map((movie: MovieDetails, i: number) => ({
    ...movie,
    id: String(i + 1),
  }));
  return movies;
}
