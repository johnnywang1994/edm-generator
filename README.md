# EDM Generator

## Introduction
This is an EDM generator tool which let you develop your EDM more efficiently by using HTML engine - [Pug](https://pugjs.org/).


## Tech
- Gulp
- Pug
- Sass
- Postcss
- Tailwind
- Premailer
- Juice


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
Run build will build up your HTML and by default through `Juice` compiled, you can change the settings in `config.js` to use `Premailer` or to disable this feature
```bash
$ yarn build
```


## Notes
### Juice / Premailer
- the juice/premailer will only run in PRODUCTION mode.


## Configuration
### Default config
```js
module.exports = {
  // project folder
  base: './src/demo',
  // entrypoint of project folder, should be pug or html
  entry: 'index.pug',
  // browser sync config options
  // https://browsersync.io/docs/options
  devServer: {
    server: ['dist', 'public'],
    port: 8080,
    reloadDelay: 1000,
    open: false,
  },
  build: {
    // output folder
    outDir: 'dist',
    // assets base path, we can use the injected global variable `CDN` base string in pug file
    cdnBase: process.env.NODE_ENV === 'production'
      ? 'https://my-cdn/demo/'
      : './demo/',
    // compile build result with Juice
    // Juice is relatively stable(Default use juice)
    // ref: https://www.npmjs.com/package/juice
    juice: {
      webResources: {
        images: false,
      },
    },
    // compile build result with Premailer
    // ref: https://premailer.dialect.ca/
    // if you don't need to use Premailer, then put false or undefined
    // premailer: false,
    // premailer: {
    //   removeClasses: true,
    //   removeIds: true,
    //   removeComments: true,
    //   preserveStyles: false,
    // },
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
- [Maizzle](https://maizzle.com/)
- [Juice](https://www.npmjs.com/package/juice)
- [Declassify](https://www.npmjs.com/package/declassify)
- [Gulp with TailwindCSS](https://github.com/lazymozek/gulp-with-tailwindcss)