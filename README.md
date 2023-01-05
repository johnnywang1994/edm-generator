# EDM Generator

## Introduction
This is an EDM generator tool which let you develop your EDM more efficiently by using HTML engine - [Pug](https://pugjs.org/).


## Tech
- Gulp
- Pug
- Sass
- Postcss
- TailwindCSS
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

### 5. TailwindCSS support
- Add Tailwindcss snippet
```css
@tailwind components;
@tailwind utilities;
```
> Dont put `@tailwind base;` since that would generate tailwind's css variables which may cause some issue in email client.
- Create Tailwindcss config in your `base` directory
> remember to check your `content` property in tailwind config to ensure not to generate unused class names.


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
    server: ['dist', 'public'], // these folder will be served at root
    port: 8080,
    reloadDelay: 1000,
    open: false,
  },
  build: {
    // output folder
    outDir: 'dist',
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

### Local config
In your `base` directory, there should be a `locals.js` file which contains pug locals variables.
```js
module.exports = {
  // pug locals variables
  // https://www.npmjs.com/package/gulp-pug
  CDN: process.env.NODE_ENV === 'production'
    ? 'https://my-cdn/demo/'
    : './demo/',
}
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