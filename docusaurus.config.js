// @ts-check
const { themes: prismThemes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ConCRG',
  tagline: 'Making Software Sentient',
  favicon: 'img/logo.svg',

  url: 'https://dasun-theekshana.github.io',
  baseUrl: '/concrg-docs/',

  organizationName: 'dasun-theekshana',
  projectName: 'concrg-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/logo.svg',
      navbar: {
        title: 'ConCRG',
        logo: {
          alt: 'ConCRG Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/altrium-io/concrg-docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Product',
            items: [
              { label: 'Introduction', to: '/' },
              { label: 'Quick Start', to: '/getting-started/quick-start' },
              { label: 'S-FLPR Framework', to: '/how-it-works/s-flpr-framework' },
            ],
          },
          {
            title: 'Modes',
            items: [
              { label: 'FIND', to: '/modes/find' },
              { label: 'LEARN', to: '/modes/learn' },
              { label: 'PRACTICE', to: '/modes/practice' },
              { label: 'REMEMBER', to: '/modes/remember' },
            ],
          },
          {
            title: 'Integration',
            items: [
              { label: 'React Integration', to: '/integration/react' },
              { label: 'Configuration', to: '/integration/configuration' },
              { label: 'Architecture', to: '/integration/architecture' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Altrium. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'typescript', 'json'],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
