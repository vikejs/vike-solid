## From 0.4.x to 0.5
### `vike-solid/ClientOnly` replaced by `vike-solid/clientOnly`

In order to have a coherent experience between all `vike-*` packages,
and to reflect Solid recommended approach, the `ClientOnly` component as been replaced
by a `clientOnly` helper.

```diff
-import { ClientOnly } from 'vike-solid/ClientOnly'
+import { clientOnly } from 'vike-solid/clientOnly'

-function MyComponent(props) {
-  return (
-    <ClientOnly
-      load={() => import('./MyComponent.jsx')}
-      /* Or:
-      load={async () => (await import('some-library')).SomeComponent}
-      */
-      fallback={<Loading />}
-    >
-      {(MyComponent) => <MyComponent {...props} />}
-    </ClientOnly>
-  )
-}

+const SomeComponent = clientOnly(() => import("./MyComponent.jsx"));
+/* If the component isn't the default export:
+const SomeComponent = clientOnly(async () => (await import('some-library')).MyComponent)
+*/
+ 
+function MyComponent(props) {
+  return <SomeComponent fallback={<Loading />} />
+}
```


## From 0.3.x to 0.4
The dedicated `vike-solid` CLI as been removed to streamline its usage.

Edit `package.json`:
```diff
 {
   "scripts": {
-    "dev": "vike-solid dev",
-    "build": "vike-solid build",
-    "preview": "vike-solid preview",
+    "dev": "vite dev",
+    "build": "vite build",
+    "preview": "vite preview",
     "test": "tsc --noEmit"
   },
   "devDependencies": {
+    "vite": "^5.1.1"
   },
 }
```

Add or update `vite.config.ts`:
```ts
import vikeSolid from "vike-solid/vite";
import vike from "vike/plugin";
import type { UserConfig } from "vite";

export default {
  plugins: [vike(), vikeSolid()]
} satisfies UserConfig
```
