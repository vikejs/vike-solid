Basic example of using `vike-solid`, showcasing:

- [layouts](https://vike.dev/layouts)
- rendering to `<head>`
- fetching data with [`onBeforeRender()`](https://vike.dev/onBeforeRender) hooks
- [configs](https://vike.dev/config)
- [error pages](https://vike.dev/error-page)

```bash
git clone git@github.com:vikejs/vike-solid
cd vike-solid/examples/basic/
pnpm install
pnpm run dev
```

> **NOTE:** for now `pnpm` is required because of the `workspace:` specifier in
> `package.json`. With this, the example makes use of the local `vike-solid`
> implementation instead of the downloading it from npm.
