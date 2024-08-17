## [0.7.2](https://github.com/vikejs/vike-solid/compare/v0.7.1...v0.7.2) (2024-08-17)


### Bug Fixes

* enable useConfig() after hydration ([#179](https://github.com/vikejs/vike-solid/issues/179)) ([0d28905](https://github.com/vikejs/vike-solid/commit/0d289053eb0ea3717de8b2b82f0a49bf28436219))
* fix `useConfig()` for `{body,html}Attributes` (vikejs/vike-vue[#180](https://github.com/vikejs/vike-solid/issues/180)) ([bf3c091](https://github.com/vikejs/vike-solid/commit/bf3c091d6185634027c7a46b5d19a29b6f5559df))
* fix callable cumulative configs ([56682a8](https://github.com/vikejs/vike-solid/commit/56682a8576eeeb2b5ba14c65045bd99dfeea3cb5))
* fix JSDoc ([5d1187b](https://github.com/vikejs/vike-solid/commit/5d1187bd8967e9990849b7fc21df62cbb81f35ed))
* JSDocs typo ([8a9d46f](https://github.com/vikejs/vike-solid/commit/8a9d46fe61ce2e7dcac26ac5bc96e78c69a0ab1b))
* support callable cumulative configs ([9f18380](https://github.com/vikejs/vike-solid/commit/9f18380971d15d3781fa190c72456619600bb0eb))
* update lang upon useConfig() ([b2818be](https://github.com/vikejs/vike-solid/commit/b2818be5db3453d94dff2ed797775acbd3925d34))



## [0.7.1](https://github.com/vikejs/vike-solid/compare/v0.7.0...v0.7.1) (2024-08-12)


### Bug Fixes

* don't unnecessarily pass useConfig() values to client-side ([613bce3](https://github.com/vikejs/vike-solid/commit/613bce3383ffe0ff33bad647c6fb0322e7461779))
* update peerDependencies list ([d5051e1](https://github.com/vikejs/vike-solid/commit/d5051e105d97f3b04340a1eb7d8fdc7afa3c28fb))


### Features

* new [components `<Head>` and `<Config>`](https://vike.dev/useConfig#config-head) ([#104](https://github.com/vikejs/vike-solid/issues/104)) ([ed1c070](https://github.com/vikejs/vike-solid/commit/ed1c070ef4bc2d4ee158d21ab1a151df07ed924b))
* support setting `{body,html}Attributes` based on `pageContext` ([ce05a56](https://github.com/vikejs/vike-solid/commit/ce05a564dac219d1f08f3ca9b4483a8f87aab785))



# [0.7.0](https://github.com/vikejs/vike-solid/compare/v0.6.2...v0.7.0) (2024-08-06)


### Bug Fixes

* avoid the default of title/lang setting to override Head setting ([1f91f16](https://github.com/vikejs/vike-solid/commit/1f91f16a54c1539fa4ad169afffb36458ba1d1b1))
* export Vike config only at /config ([d66c678](https://github.com/vikejs/vike-solid/commit/d66c678419719e3ac74bb92c23813a54aab8b4af))
* fix type Config['title'] ([964bb66](https://github.com/vikejs/vike-solid/commit/964bb668687e179e2e6b77036420d055721cc64b))
* improve JSDocs ([d759f7e](https://github.com/vikejs/vike-solid/commit/d759f7e4b88b996483ec70f6bd93bb2e24df17dc))
* make favicon setting global ([e917040](https://github.com/vikejs/vike-solid/commit/e9170400a5b556c17c6973055c986f75003bebb5))
* make Head setting cumulative ([c5dd9bd](https://github.com/vikejs/vike-solid/commit/c5dd9bd104fa31669ea8b2a847d855e8edbc4d52))
* make title setting generate <meta property="og:title"> ([8681dd3](https://github.com/vikejs/vike-solid/commit/8681dd3bbe3bedf4228afae23d98f8b75706f315))
* remove <ClientOnly> component ([ab747da](https://github.com/vikejs/vike-solid/commit/ab747da60c7039e9cbebb8896d068ce51bf33441))


### Features

* [useConfig()](https://vike.dev/useConfig) ([88496ed](https://github.com/vikejs/vike-solid/commit/88496ed5a59673f81ecbe33a336e3c13ac69c035))
* new hook [`onAfterRenderClient`](https://vike.dev/onAfterRenderClient) ([149f555](https://github.com/vikejs/vike-solid/commit/149f555c0ef06be3099126cb6ab1d807fe9c1be3))
* new setting `viewport` ([bb60ac2](https://github.com/vikejs/vike-solid/commit/bb60ac2981d023bf4f6f41daa0f8d69e7e4067fb))
* new settings [`description`](https://vike.dev/description) ([06c5461](https://github.com/vikejs/vike-solid/commit/06c5461eebebb09b749947f1abbf29643134b277))
* new settings [`htmlAttributes`](https://vike.dev/htmlAttributes) and [`bodyAttributes`](https://vike.dev/bodyAttributes) ([#169](https://github.com/vikejs/vike-solid/issues/169)) ([545eb8b](https://github.com/vikejs/vike-solid/commit/545eb8b26fb3b1183ee747721b7bb48048bf17c8))
* new settings [`image`](https://vike.dev/image) ([0c25292](https://github.com/vikejs/vike-solid/commit/0c25292e5b03cf07ab51fd7d6c5e7312d68b622e))


### BREAKING CHANGES

* component `<ClientOnly>` removed: use `clientOnly()` helper instead https://vike.dev/clientOnly
* The `Head` setting is now cumulative https://vike.dev/Head#cumulative
* The responsive viewport tag is now injected by default (`<meta name="viewport" content="width=device-width,initial-scale=1">`). If you already inject `<meta name="viewport">` then remove it or set the `viewport` setting to `null`, see https://vike.dev/viewport.
* The setting `favicon` now only accepts one global
value, see https://vike.dev/favicon#global
* The [`title` setting](https://vike.dev/title) now also adds the `<meta property="og:title">` tag; if you generate it yourself then make sure to remove it.
* Update to `vike@0.4.182` or above.



## [0.6.2](https://github.com/vikejs/vike-solid/compare/v0.6.1...v0.6.2) (2024-06-25)


### Features

* Add streaming support for Web Stream ([69ac3cd](https://github.com/vikejs/vike-solid/commit/69ac3cd3ca0948bbfff1e5f70e7e66b4a7512684))



## [0.6.1](https://github.com/vikejs/vike-solid/compare/v0.6.0...v0.6.1) (2024-06-22)


**For previous versions, see [MIGRATION.md](https://github.com/vikejs/vike-solid/blob/main/MIGRATION.md).**
