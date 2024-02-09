[<img src="https://vike.dev/vike-readme.svg" align="right" height="90">](https://vike.dev)
[![npm version](https://img.shields.io/npm/v/vike-solid)](https://www.npmjs.com/package/vike-solid)

# `vike-solid`

SolidJS integration for Vike, see [vike.dev/solid](https://vike.dev/solid).

- [Documentation](https://vike.dev)
- [Examples](https://github.com/vikejs/vike-solid/tree/main/examples)

## Introduction

[UI framework Vike extensions](https://vike.dev/extensions) like `vike-solid`:

- implement Vike Core [hooks](https://vike.dev/hooks) (e.g. [`onRenderHtml()`](https://vike.dev/onRenderHtml)) on your
  behalf,
- set Vike Core [settings](https://vike.dev/settings) on your behalf,
- introduce new hooks for you to implement if needed,
- introduce new settings for you to set if needed,
- introduce new components and component hooks.

## Scaffold new app

Use [Bati](https://batijs.github.io/) to scaffold a Vike app using `vike-solid`.

## Add to existing app

To add `vike-solid` to an existing Vike app:

1. Install the `vike-solid` npm package in your project:

```bash
npm install vike-solid
```

2. Edit your Vite config:

```ts
// vite.config.ts

import vikeSolid from "vike-solid/vite";
import vike from "vike/plugin";
import type { UserConfig } from "vite";

export default {
  plugins: [
    vike(),
    // Add vikeSolid() after vike()
    vikeSolid()
  ]
} satisfies UserConfig
```

3. Extend your existing Vike config files with `vike-solid`:

```diff
 // /pages/+config.h.js

+import vikeSolid from 'vike-solid/config'
+
 export default {
   // Existing Vike Core settings
   // ...
+
+  // New setting introduced by vike-solid:
+  title: 'My Vike + Solid App',
+
+  extends: vikeSolid
 }
```

## Hooks

`vike-solid` implements the [`onRenderHtml()`](https://vike.dev/onRenderHtml) and
[`onRenderClient()`](https://vike.dev/onRenderClient) hooks on your behalf, which are essentially the glue code between
Vike and Solid.

## Settings

`vike-solid` sets the following Vike Core settings on your behalf:

- [`clientRouting=true`](https://vike.dev/clientRouting): Enable [Client Routing](https://vike.dev/client-routing).
- [`hydrationCanBeAborted=true`](https://vike.dev/hydrationCanBeAborted): Solid allows the
  [hydration](https://vike.dev/hydration) to be aborted.

`vike-solid` introduces the following new settings:

- [`Head`](https://vike.dev/head): **Component** Component to be rendered inside the `<head>` tag.
- [`title`](https://vike.dev/head): **string** `<title>...</title>` tag.
- [`favicon`](https://vike.dev/head): **string** `<link rel="icon" href="..." />` attribute.
- [`lang`](https://vike.dev/lang): **string** `<html lang="...">` attribute.
- [`ssr`](https://vike.dev/ssr): **boolean** Enable/disable Server-Side Rendering
  ([SSR](https://vike.dev/render-modes)).
- [`stream`](https://vike.dev/stream): **boolean** Enable/disable [HTML streaming](https://vike.dev/streaming).
- [`Layout`](https://vike.dev/Layout): **Component** Wrapper for your [Page component](https://vike.dev/Page).

## Component hooks

`vike-solid` introduces the following new component hooks:

- [`useData()`](https://vike.dev/useData): Access the data that is returned by a [`data()` hook](https://vike.dev/data)
  from any component.
- [`usePageContext()`](https://vike.dev/usePageContext): Access the [`pageContext` object](https://vike.dev/pageContext)
  from any component.

## Components

`vike-solid` introduces the following new components:

- [`ClientOnly`](https://vike.dev/ClientOnly): Wrapper to render and load a component only on the client-side.
