# EDM Generator

## Introduction
This is an EDM generator tool which let you develop your EDM more efficiently by using HTML engine - [Pug](https://pugjs.org/).


## Tech
- Gulp
- Pug
- Sass Precompile
- Websocket
- Premailer


## Usage
### 1. clone this repo in your local environment
```bash
$ git clone https://github.com/johnnywang1994/edm-generator.git
```

### 2. install NPM dependency
```bash
$ npm install
# or
$ yarn
```

### 3. start developing in src/index.pug
Run up dev server at `http://localhost:8080`
```bash
$ yarn dev
```

### 4. build result
Run build will build up your HTML and by default through `Premailer` compiled, you can change the settings in `config.js`
```bash
$ yarn build
```


## Notes
### Reload Server
- the reload server just easily reload the whole page, it's not a HMR module.
- the reload script will only be injected into your HTML in DEV mode.

### Premailer
- the premailer will only run in PRODUCTION mode.


## Configuration
### Default config
```js
module.exports = {
  // entrypoint of compiled pug file
  entry: './src/demo/index.pug',
  // setting entry to html file will close the default reload feature
  // if you need reload feature, please put the `reload.js` inside your index.html in DEV mode
  // and remember to remove it when you are OK to build for production.
  // entry: './src/index.html',
  // watch files to rerun gulp compile & reload dev server
  watch: ['./src/**/*.pug', './src/**/*.css'],
  // if you don't need to use devServer, then put false
  // devServer: false,
  devServer: {
    port: 8080, // dev server port
    wsPort: 8000, // reload websocket server port
    reloadDelay: 1000, // ms
    serveDir: ['dist', 'public'], // serving dir for devServer
  },
  build: {
    // output folder
    outDir: 'dist',
    // compile build result with Premailer
    // ref: https://premailer.dialect.ca/
    // if you don't need to use Premailer, then put false
    // premailer: false,
    premailer: {
      removeClasses: true,
      removeIds: true,
      removeComments: true,
      preserveStyles: false,
    },
  },
};
```


## EDM related documentation
- [HTML <!DOCTYPE>](https://www.w3schools.com/tags/ref_html_dtd.asp)
- [Which doctype should you use in HTML emails](https://www.hteumeuleu.com/2016/which-doctype-should-you-use-in-html-emails/)
- [Designing HTML Emails Tutorial](https://www.youtube.com/watch?v=vsQmiTe_GLQ)
- [style in head](https://www.campaignmonitor.com/css/style-element/style-in-head/)
- [How to make css play nice in html emails](https://customer.io/blog/how-to-make-css-play-nice-in-html-emails-without-breaking-everything/)
- [Premailer](https://premailer.dialect.ca/)