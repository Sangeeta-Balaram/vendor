export interface Resource {
  slug: string
  title: string
  desc: string
  type: string
  body: string
}

export const resources: Resource[] = [
  {
    slug: 'onboarding-guide',
    title: 'Partner Onboarding Guide',
    desc: 'Step-by-step guide to setting up your partner account.',
    type: 'Guide',
    body: 'Welcome to The Revieree Studios partner network. This guide walks you through account setup, profile completion, and your first project submission. Follow each step to get started and begin earning.'
  },
  {
    slug: 'proposal-templates',
    title: 'Proposal Templates',
    desc: 'Professional proposal templates for every solution.',
    type: 'Template',
    body: 'Use these ready-to-customise proposal templates for Branding, Web Development, Marketing, and more. Each template follows industry best practices to help you win more clients.'
  },
  {
    slug: 'pricing-calculator',
    title: 'Pricing Calculator',
    desc: 'Calculate your margins and optimize pricing.',
    type: 'Tool',
    body: 'Our pricing calculator helps you determine optimal pricing for each solution. Factor in your costs, desired margin, and market rates to create competitive yet profitable quotes.'
  },
  {
    slug: 'marketing-kit',
    title: 'Marketing Kit',
    desc: 'Brand assets and collateral for your agency.',
    type: 'Kit',
    body: 'Download our marketing kit containing brand guidelines, logos, social media templates, and promotional materials to help you market Revieree services effectively.'
  },
  {
    slug: 'case-studies',
    title: 'Case Studies',
    desc: 'Real success stories from our top partners.',
    type: 'Stories',
    body: 'Learn from successful partners who have grown their agencies using Revieree. Each case study covers their strategy, challenges, and results.'
  },
  {
    slug: 'api-docs',
    title: 'API Documentation',
    desc: 'Integrate Revieree into your own workflow.',
    type: 'Docs',
    body: 'Comprehensive API documentation for integrating Revieree\'s quoting, negotiation, and agreement features directly into your existing systems and workflows.'
  },
]

export function getResource(slug: string): Resource | undefined {
  return resources.find(r => r.slug === slug)
}
