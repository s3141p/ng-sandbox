![Integration](https://github.com/s3141p/ng-sandbox/actions/workflows/main.yml/badge.svg)

# Ng Sandbox

It's thin wrapper over default angular builders and widget which renders your components.

How usage looks like? Briefly:

1. Create an angular application inside of your project
2. Replace default builders for `serve` and `build`
3. Add few typescript files
4. Add widget to the created application
5. Use `ng serve(build) --l=*libName*`

So, there is no extra webpack configs and it's not framework.

For example there is such [library](https://github.com/s3141p/ng-sandbox/tree/master/libs/examples-material) which is rendered at [github pages](https://s3141p.github.io/ng-sandbox/)

## Links

1. [Usage](./docs/usage.md)
2. [Development](./docs/development.md)
