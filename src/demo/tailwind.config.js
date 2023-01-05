// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = {
  mode: 'jit',
  content: ['./src/demo/*.{pug,html}'],
  darkMode: 'media', // 'media' or 'class'
  theme: {
    fontFamily: {
      // default font
      sans: [
        'Noto Sans TC',
        'PingFang TC',
        'ui-sans-serif',
        'system-ui',
      ],
    },
    extend: {
      fontSize: {
        sm: '15px',
        base: '17px',
        lg: '19px',
        title: '21px',
        xl: '23px',
      },
      height: {
        unset: 'unset',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  safelist: [],
};
