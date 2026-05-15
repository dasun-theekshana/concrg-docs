/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/quick-start',
        'getting-started/installation',
        'getting-started/configuration',
      ],
    },
    {
      type: 'category',
      label: 'How It Works',
      items: [
        'how-it-works/overview',
        'how-it-works/s-flpr-framework',
        'how-it-works/architecture',
        'how-it-works/knowledge-graph',
        'how-it-works/training-sources',
      ],
    },
    {
      type: 'category',
      label: 'Modes',
      items: [
        'modes/find',
        'modes/learn',
        'modes/practice',
        'modes/remember',
      ],
    },
    {
      type: 'category',
      label: 'Training Your App',
      items: [
        'training/probe',
        'training/code-analysis',
        'training/docs-crawl',
        'training/chat',
      ],
    },
    {
      type: 'category',
      label: 'Integration',
      items: [
        'integration/react',
        'integration/angular',
        'integration/vue',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      items: [
        'concepts/concierge-principle',
        'concepts/adaptive-response',
        'concepts/sentient-software',
        'concepts/practice-as-assessment',
      ],
    },
  ],
};

module.exports = sidebars;
