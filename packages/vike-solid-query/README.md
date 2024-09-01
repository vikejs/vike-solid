<!-- WARNING: keep links absolute in this file so they work on NPM too -->

[<img src="https://vike.dev/vike-readme.svg" align="right" height="90">](https://vike.dev)
[![npm version](https://img.shields.io/npm/v/vike-solid-query)](https://www.npmjs.com/package/vike-solid-query)

# `vike-solid-query`

Enables your Solid components to fetch data using [TanStack Query](https://tanstack.com/query/latest).

> [!NOTE]
> You'll also get [progressive rendering](https://vike.dev/streaming#progressive-rendering) and [supports](https://tanstack.com/query/latest/docs/framework/solid/reference/createQuery#usage-with-suspense) for triggering SolidJS Suspense and ErrorBoundary components when the query is in a pending or error state.

[Installation](#installation)  
[Basic usage](#basic-usage)  
[`QueryBoundary`](#queryboundary)  
[`<head>` tags](#head-tags)  
[See also](#see-also)  

## Installation

1. `npm install @tanstack/solid-query vike-solid-query`
2. Extend `+config.js`:
   ```js
   // pages/+config.js

   import vikeSolid from 'vike-Solid/config'
   import vikeSolidQuery from 'vike-solid-query/config'

   export default {
     // ...
     extends: [vikeSolid, vikeSolidQuery]
   }
   ```
> [!NOTE]
> The `vike-solid-query` extension requires [`vike-solid`](https://vike.dev/vike-solid).

## Basic usage

```jsx
import { createQuery } from "@tanstack/solid-query";
import { Suspense } from "solid-js";

const Movie = (props: { id }) => {
    const query = createQuery(() => ({
        queryKey: ["movies", props.id],
        queryFn: () =>
        fetch(`https://brillout.github.io/star-wars/api/films/${props.id}.json`)
        .then((res) => res.json()),
    }));

  return (
    <Suspense fallback={"Loading ..."}>
      Title: <b>{query.data?.title}</b>
    </Suspense>
  )
}
```

## `QueryBoundary`

```jsx
// Define loading fallback
<QueryBoundary query={query} loadingFallback={Loading}>
    <Component />
</QueryBoundary>
// Define loading and error fallback 
<QueryBoundary query={query} loadingFallback={Loading} errorFallback={Error}>
    <Component />
</QueryBoundary>
// Define loading, error and not found fallback 
<QueryBoundary query={query} loadingFallback={Loading} errorFallback={Error} notFoundFallback={NotFound}>
    <Component />
</QueryBoundary>
```

> [!NOTE] Fallbacks type
> `loadingFallback?: JSX.Element;`  
> `notFoundFallback?: JSX.Element;`  
> `errorFallback?: JSX.Element | ((err: any, reset: () => void) => JSX.Element);`

```tsx
import { createQuery } from "@tanstack/solid-query";
import { QueryBoundary } from "vike-solid-query";

function Movie(props: { id: string }) {
  const query = createQuery(() => ({
    queryKey: ["movies", props.id],
    queryFn: () =>
        fetch(`https://brillout.github.io/star-wars/api/films/${props.id}.json`)
        .then((res) => res.json())
  }));

  return (
    <QueryBoundary
      query={query}
      loadingFallback={<p>Loading movie {props.id}</p>}
      errorFallback={(err, reset) => (
        <>
          <div>Failed to load movie {props.id}</div>
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
        <div>
            Title: <b>{movie.title}</b>
        </div>
      )}
    </QueryBoundary>
  );
}
```

## `<head>` tags

To set tags such as `<title>` and `<meta name="description">` based on fetched data, you can use [`<Config>`, `<Head>`, and `useConfig()`](https://vike.dev/useConfig).

```js
import { createQuery } from "@tanstack/solid-query";
import { Config } from 'vike-solid/Config'
import { Head } from 'vike-solid/Head'
import { QueryBoundary } from "vike-solid-query";
import { For } from "solid-js";

function Movies() {
  const query = useSuspenseQuery({
    queryKey: ['movies'],
    queryFn: () => fetch('https://star-wars.brillout.com/api/films.json')
  })
  const query = createQuery(() => ({
    queryKey: ["movies"],
    queryFn: () => fetch('https://star-wars.brillout.com/api/films.json')
  }));
  
  return (
    <QueryBoundary query={query} loadingFallback={<p>Loading movies ...</p>}>
      {(movies) => (
        <>
          <Config title={`${movies.length} Star Wars movies`} />
          <Head>
            <meta name="description" content={`All ${movies.length} movies from the Star Wars franchise.`} />
          </Head>
          <h1>Star Wars Movies</h1>
          <ol>
            <For each={movies}>
              {(movie) => (
                <li>{movie.title}</li>
              )}
            </For>
          </ol>
        </>
      )}
    </QueryBoundary>
  )
}
```

## Settings

You can modify the defaults defined by [`QueryClient`](https://tanstack.com/query/latest/docs/reference/QueryClient).

```js
// +config.js

export default {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000
      }
    }
  }
}
```

## See also

- [Example](https://github.com/vikejs/vike-solid/tree/main/examples/solid-query)
- [TanStack Query > CreateQuery > Usage with Suspense](https://tanstack.com/query/latest/docs/framework/solid/reference/createQuery#usage-with-suspense)
- [Vike > Data Fetching](https://vike.dev/data-fetching)