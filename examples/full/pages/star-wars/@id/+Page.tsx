import type { Data } from "./+data.js";
import { useStoreWithData } from "vike-solid/useStoreWithData";

export default function Page() {
  const [movie] = useStoreWithData<Data>();
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
