const axios = require('axios');
const cheerio = require('cheerio');
const through2 = require('through2');
const config = require('../config');

const endpoint = 'https://premailer.dialect.ca/';

function getFormDataFromConfig({
  html,
  removeClasses = true,
  removeIds = true,
  removeComments = true,
  preserveStyles = false,
} = {}) {
  const formData = new URLSearchParams();
  formData.append('content_source', 'html');
  formData.append('url', 'https://dialect.ca/premailer-tests/base.html');
  formData.append('html', html);
  if (removeClasses) {
    formData.append('remove_classes', 'yes');
  }
  if (removeIds) {
    formData.append('remove_ids', 'yes');
  }
  if (removeComments) {
    formData.append('remove_comments', 'yes');
  }
  if (preserveStyles) {
    formData.append('preserve_styles', 'yes');
  }
  return formData;
}

async function premailer(html, premailerConfig) {
  premailerConfig.html = html;
  const formData = getFormDataFromConfig(premailerConfig);
  const res = await axios({
    method: 'post',
    url: endpoint,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      referer: 'https://premailer.dialect.ca/',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
    },
    data: formData,
  });
  const $ = cheerio.load(res.data);
  const h2 = $('h2').filter((i, el) => $(el).text() === 'HTML Results')[0];
  if (h2) {
    const textarea = $(h2).next().next();
    return textarea.val()
  }
  return false;
}

function gulpPremailerPlugin() {
  return through2.obj(function gulpPremailer(file, enc, cb) {
    const html = file.contents.toString();
    if (html) {
      premailer(html, config.build.premailer).then((compiled) => {
        file.contents = Buffer.from(compiled);
        cb(null, file);
      });
    }
  })
}

module.exports = gulpPremailerPlugin;
