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
