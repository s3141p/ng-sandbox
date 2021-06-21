![Integration](https://github.com/s3141p/ui-devkit/actions/workflows/main.yml/badge.svg)

# Ui devkit

## Development

### Prerequisites

1. Nodejs v14.15.1
2. `npm i -g @nrwl/cli` (Optional). Otherwise `nx` should be replaced with `npm run nx`

### Run app locally

1. `nx build builders`
2. `nx serve devkit -- --l=all`

### Running unit tests

`npm run nx test *libName*`

### Running lint

`npm run nx lint *libName*`
