# [FRONTEND]JUR-SMART-CONTRACT

- cd `client` && `yarn install`
- run `truffle develop` in a separate terminal
- `yarn start` — This will spawn a development server with a default port of `1234`.
- `yarn build` — This will output a production build in the `dist` directory.

## Steps

- Install `@drizzle/react-plugin` & `@drizzle/store` (yarn add @drizzle/react-plugin @drizzle/store)
- Import `DrizzleProvider` wrapper and add `drizzle-options` default inside lib
- Customize `contracts_build_directory` inside truffle-config.js

## Helpful links 

- https://programtheblockchain.com/posts/2018/01/02/making-smart-contracts-with-public-variables/
- https://github.com/cgewecke/web3.js/blob/e9f6cfa0e2b92ded3e817d4777fae6e495058ca1/test/e2e.method.call.js
- https://github.com/ConsenSys/smart-contract-best-practices :star: