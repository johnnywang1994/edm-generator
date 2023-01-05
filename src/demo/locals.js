module.exports = {
  CDN: process.env.NODE_ENV === 'production'
    ? 'https://my-cdn/demo/'
    : './demo/',
};
