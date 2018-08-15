# vue-ts-hot-reload-example
A bare-bones TypeScript Vue.js project with example webpack configuration that enables hot module reloading with `.vue` components and TypeScript `.ts` files.

# Features
- Vue.js `.vue` single file components that hot-reload
- Fast TypeScript incremental compilation with hot-reloads
- Use TypeScript in `.vue` component files
- Simple explicit webpack configuration files that are commented and readable so you are able to customize further to suit your needs.
- Uses latest recommended cli tools `webpack-serve` for development and `webpack-command` for building production assets.

# How to use
1. Download/clone the project
2. Run
```
npm run dev
```
and open your browser to `http://localhost:8080`. Try making changes to the component files and see hot reload changes.

3. Run
```
npm run prod
```
to build production assets which will go to the `dist/assets` folder

# Why?
The latest (as of writing this) recommended way to bootstrap a Vue.js project is using `vue-cli`. While you can choose to create a TypeScript enabled project with `vue-cli`, the resulting project's webpack configuration is hidden and modifying it to suit your needs or even trying to understand what it is doing is hard. (See https://cli.vuejs.org/guide/webpack.html)

So I decided to create my own project using some files from the `vue-cli` generated project as a base and then setting up the webpack configuration files from scratch myself.

If you have setup webpack from scratch before, you will know that getting it to do exactly what you want can be a nightmare. Especially when you want to make hot module reloading work.

# Some things to note
- Instead of trying to re-use or share common parts of the webpack development and production configs, I have separated them into two completely separate independent files. This makes reading and modifying each config straightforward. You don't have to skip to different files and wonder if what you are changing for dev will affect production and vice versa.
- The development config serves a static `index.html` file. In a real app, the index might be served dynamically from the actual application server. (Unless your app is a pure SPA that can use a static index file.)
- The production config creates the static assets in the `dist/assets` folder. In a real app, the application server would read the `manifest.json` file and generate the correct `script`/`style` tags to reference the assets in the resulting response html. (Unless your app is a pure SPA that can use a static index file, then you might want to use `HtmlWebpackPlugin` to generate the index.)
