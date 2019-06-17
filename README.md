# OfflineDemo

## Requirements
- `node` tested on version 10.15.3
- `yarn` tested on version 1.15.2

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
Build Assistant in production mode:
- `yarn build --prod`

Serve as static content:
- `yarn serve-static` - app will be available under localhost:8080

Copy&paste for easier development:
- `yarn build --prod && yarn serve-static`

For other URLs than localhost Service Worker needs secure connection.
To quickly serve static app with secure connection you can try tunneling to localhost:8080 (e.g. ngrok.io).