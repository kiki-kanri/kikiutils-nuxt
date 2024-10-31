# @kikiutils/nuxt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

- [✨ Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/my-module?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

To be added.

## Quick Setup

1. Add `@kikiutils/nuxt` dependency to your project.

```bash
# Using pnpm
pnpm add -D @kikiutils/nuxt

# Using yarn
yarn add --dev @kikiutils/nuxt

# Using npm
npm install --save-dev @kikiutils/nuxt
```

1. Add `@kikiutils/nuxt` to the `modules` section of `nuxt.config.ts`.

```typescript
export default defineNuxtConfig({
  // With options
  kikiutilsNuxt: {},
  modules: [
    '@kikiutils/nuxt'
  ]
});
```

That's it! You can now use session in your Nuxt app ✨.

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build
```

<!-- Badges -->
[npm-version-href]: https://npmjs.com/package/@kikiutils/nuxt
[npm-version-src]: https://img.shields.io/npm/v/@kikiutils/nuxt/latest.svg?style=flat&colorA=18181B&colorB=28CF8D

[npm-downloads-href]: https://npmjs.com/package/@kikiutils/nuxt
[npm-downloads-src]: https://img.shields.io/npm/dm/@kikiutils/nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D

[license-href]: https://npmjs.com/package/@kikiutils/nuxt
[license-src]: https://img.shields.io/npm/l/@kikiutils/nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D

[nuxt-href]: https://nuxt.com
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
