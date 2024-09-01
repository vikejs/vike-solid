// From https://github.com/TanStack/query/blob/main/examples/solid/solid-start-streaming/src/components/query-boundary.tsx
import type { CreateQueryResult } from "@tanstack/solid-query";
import type { JSX } from "solid-js";
import { ErrorBoundary, Match, Suspense, Switch } from "solid-js";

export interface QueryBoundaryProps<T = unknown> {
  query: CreateQueryResult<T, Error>;

  /**
   * Triggered when the data is initially loading.
   */
  loadingFallback?: JSX.Element;

  /**
   * Triggered when fetching is complete, but the returned data was falsey.
   */
  notFoundFallback?: JSX.Element;

  /**
   * Triggered when the query results in an error.
   */
  errorFallback?: JSX.Element | ((err: any, reset: () => void) => JSX.Element);

  /**
   * Triggered when fetching is complete, and the returned data is not falsey.
   */
  children: (data: Exclude<T, null | false | undefined>) => JSX.Element;
}

/**
 * Convenience wrapper that handles suspense and errors for queries. Makes the results of query.data available to
 * children (as a render prop) in a type-safe way.
 */
export function QueryBoundary<T>(props: QueryBoundaryProps<T>) {
  return (
    <ErrorBoundary
      fallback={
        props.errorFallback
          ? props.errorFallback
          : (err, reset) => (
              <div>
                <div class="query-boundary-error">{err.toString()}</div>
                <button
                  onClick={async () => {
                    reset();
                    await props.query.refetch();
                  }}
                >
                  Retry
                </button>
              </div>
            )
      }
    >
      <Suspense fallback={props.loadingFallback}>
        <Switch>
          <Match when={!props.query.isFetching && !props.query.data}>
            {props.notFoundFallback ? (
              props.notFoundFallback
            ) : (
              <>
                <div>Not Found,</div>
                <button
                  onClick={async () => {
                    await props.query.refetch();
                  }}
                >
                  Refetch
                </button>
              </>
            )}
          </Match>

          <Match when={props.query.data}>
            {props.children(props.query.data as Exclude<T, null | false | undefined>)}
          </Match>
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
}
