import { createQuery } from "@tanstack/solid-query";
import { QueryBoundary } from "vike-solid-query";
import { Config } from "vike-solid/Config";
import type { MovieDetails } from "../types";

export function Movie(props: { id: string }) {
  const query = createQuery(() => ({
    queryKey: ["movies", props.id],
    queryFn: () => getStarWarsMovie(props.id),
    // Disabled to showcase error fallback
    retry: false,
  }));

  return (
    <QueryBoundary
      query={query}
      loadingFallback={<p>Loading movie {props.id}</p>}
      errorFallback={(err, reset) => (
        <>
          <div>Loading movie {props.id} failed</div>
          <div>{err.toString()}</div>
          <button
            onClick={async () => {
              reset();
              await query.refetch();
            }}
          >
            Retry
          </button>
        </>
      )}
    >
      {(movie) => (
        <>
          <Config
            title={movie.title}
            Head={
              <meta name="description" content={`Star Wars Movie ${query.data?.title} from ${query.data?.director}`} />
            }
          />
          <h1>Star Wars Movies</h1>
          <ul>
            <li>
              Title: <b>{movie.title}</b>
            </li>
            <li>
              Release date: <b>{movie.release_date}</b>
            </li>
          </ul>
          <p>
            Source: <a href="https://star-wars.brillout.com">star-wars.brillout.com</a>.
          </p>
        </>
      )}
    </QueryBoundary>
  );
}

async function getStarWarsMovie(id: string): Promise<MovieDetails> {
  await new Promise((r) => setTimeout(r, 500));

  if (Math.random() > 0.4) {
    throw new Error("Failed to fetch");
  }

  const response = await fetch(`https://star-wars.brillout.com/api/films/${id}.json`);
  return response.json();
}
