# OfflineDemo

Goal of this repo was to create app that can:
- save some data (albums with pictures) to browser storage (IndexedDB)
- run app when there is no internet connection
- show some data when there is no internet connection (albums from IndexedDB)

All other parts of app are experiments :) , like:
- using Material UI
- using @ngrx/entities
- app structure
- using lazy loaded modules (along with parts of NgRX/redux reducers, effects)
- etc.

## Requirements
- `node` tested on version 10.20.1
- `yarn` tested on version 1.22.4

## Install dependencies
Run:
- `yarn`

## Development
Run:
- `yarn seed` - seed db, don't worry if some fetch will fail
- `yarn api` - start API
- `yarn start` - start development server

## Running unit tests
Run:
- `yarn test`

## Angular Service Worker
Build FE app in production mode:
- `yarn build --prod`

Serve as static content:
- `yarn serve-static` - app will be available under localhost:8080

Copy&paste for easier development:
- `yarn build --prod && yarn serve-static`

For other URLs than localhost Service Worker needs secure connection.
To quickly serve static app with secure connection you can try tunneling to localhost:8080 (e.g. ngrok.io).
