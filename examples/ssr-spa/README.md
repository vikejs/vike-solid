Example of selecting SPA or SSR on a per-page basis. See
[SPA vs SSR (and more)](https://vike.dev/SPA-vs-SSR).

```bash
git clone git@github.com:magne4000/vike-solid
cd vike-solid/examples/ssr-spa/
npm install
npm run dev
```

> **NOTE:** for now `pnpm` is required because of the `workspace:` specifier in
> `package.json`. With this, the example makes use of the local `vike-solid`
> implementation instead of the downloading it from npm.
