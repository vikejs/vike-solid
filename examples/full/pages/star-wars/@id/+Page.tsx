import type { Data } from "./+data.js";
import { createDataStore } from "vike-solid/createDataStore";

export default function Page() {
  const [movie] = createDataStore<Data>();
  return (
    <>
      <h1>{movie.title}</h1>
      Release Date: {movie.release_date}
      <br />
      Director: {movie.director}
      <br />
      Producer: {movie.producer}
    </>
  );
}
