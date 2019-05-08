# OfflineDemo

## Requirements
- `node` tested on version 10.15.3
- `yarn` tested on version 1.15.2

## Install dependencies
Run: `yarn`

## Development
Run:
- `yarn seed` - seed db
- `yarn api` - start API
- `yarn start` - start development server

## Running unit tests
Run: `yarn test`

## Angular Service Worker
Build Assistant in production mode:
- `yarn build --prod`

<!--
TODO:
And overwrite SW script:
- `yarn fix-sw`
-->

Serve as static content:
- `yarn serve-static`

Copy&paste for easier development:
- `yarn build --prod && yarn serve-static`
