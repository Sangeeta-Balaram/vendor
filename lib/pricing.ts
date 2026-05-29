export const services = [
  { id: 'branding', name: 'Branding & Identity', cat: 'Creative', price: 35000, desc: 'Logo, colors, brand guidelines, positioning' },
  { id: 'uiux', name: 'UI/UX Design', cat: 'Creative', price: 45000, desc: 'Wireframes, prototypes, user testing, design systems' },
  { id: 'graphic-design', name: 'Graphic Design', cat: 'Creative', price: 20000, desc: 'Social graphics, banners, marketing collateral' },
  { id: 'content-writing', name: 'Content Writing', cat: 'Creative', price: 15000, desc: 'Blog posts, web copy, product descriptions' },
  { id: 'video-prod', name: 'Video Production', cat: 'Creative', price: 40000, desc: 'Explainer videos, social clips, motion graphics' },
  { id: 'photoshoot', name: 'Photoshoot', cat: 'Creative', price: 25000, desc: 'Product & model photography' },
  { id: 'web-dev', name: 'Web Development', cat: 'Tech', price: 65000, desc: 'React, Next.js, responsive frontend + backend' },
  { id: 'web-design', name: 'Website Design', cat: 'Tech', price: 45000, desc: 'Custom layouts, wireframes, high-fidelity mockups' },
  { id: 'ecommerce', name: 'E-commerce', cat: 'Tech', price: 75000, desc: 'Online stores, payment integration, product mgmt' },
  { id: 'app-dev', name: 'Mobile App Dev', cat: 'Tech', price: 150000, desc: 'iOS & Android, React Native, Flutter' },
  { id: 'api-dev', name: 'API Development', cat: 'Tech', price: 50000, desc: 'REST/GraphQL APIs, third-party integrations' },
  { id: 'custom-sw', name: 'Custom Software', cat: 'Tech', price: 150000, desc: 'Bespoke solutions for unique business needs' },
  { id: 'seo', name: 'SEO Optimization', cat: 'Marketing', price: 25000, desc: 'On-page, technical SEO, link building' },
  { id: 'social-mgmt', name: 'Social Media Mgmt', cat: 'Marketing', price: 30000, desc: 'Content calendar, posting, engagement' },
  { id: 'google-ads', name: 'Google Ads', cat: 'Marketing', price: 25000, desc: 'Search, display, remarketing, shopping' },
  { id: 'meta-ads', name: 'Meta Ads', cat: 'Marketing', price: 25000, desc: 'Facebook & Instagram ad campaigns' },
  { id: 'email-mktg', name: 'Email Marketing', cat: 'Marketing', price: 18000, desc: 'Campaigns, automation, newsletters' },
  { id: 'crm', name: 'CRM Setup', cat: 'Business', price: 50000, desc: 'Sales pipeline, contact management, automation' },
  { id: 'automation', name: 'Workflow Automation', cat: 'Business', price: 50000, desc: 'RPA, business process automation' },
  { id: 'ai-chatbot', name: 'AI Chatbot', cat: 'Business', price: 40000, desc: 'Customer support bots, lead qualification' },
  { id: 'analytics', name: 'Analytics & Reporting', cat: 'Business', price: 20000, desc: 'Dashboards, GA4, custom reports' },
  { id: 'cloud', name: 'Cloud Setup', cat: 'Business', price: 60000, desc: 'AWS/Azure/GCP, migration, serverless' },
  { id: 'security', name: 'Security Audit', cat: 'Business', price: 50000, desc: 'Pen testing, compliance, hardening' },
]

export const solutions = [
  { slug: 'build-brand', title: 'Build a Brand', desc: 'Branding, content, social media, strategy', icon: 'Palette', color: 'from-purple-500 to-pink-500', cat: 'creative' },
  { slug: 'post-production', title: 'Production and Post Production', desc: 'Video production, editing, motion graphics, animation', icon: 'Clapperboard', color: 'from-red-500 to-orange-500', cat: 'creative' },
  { slug: 'creative-services', title: 'Visual and Creative Services', desc: 'Graphic design, photography, illustration, brand visuals', icon: 'Image', color: 'from-pink-500 to-rose-500', cat: 'creative' },
  { slug: 'print-packaging', title: 'Print Collaterals and Packaging', desc: 'Brochures, business cards, packaging design, labels', icon: 'Printer', color: 'from-amber-500 to-yellow-500', cat: 'creative' },
  { slug: 'generate-leads', title: 'Generate Leads', desc: 'Ads, funnels, analytics', icon: 'TrendingUp', color: 'from-green-500 to-teal-500', cat: 'creative' },
  { slug: 'build-website', title: 'Build a Website', desc: 'Design, development, SEO, content, hosting', icon: 'Globe', color: 'from-blue-500 to-purple-500', cat: 'tech' },
  { slug: 'automate-business', title: 'Automate Business', desc: 'Workflows, AI, integrations, CRM', icon: 'Bot', color: 'from-orange-500 to-red-500', cat: 'tech' },
  { slug: 'build-product', title: 'Infrastructure & Security', desc: 'Networking, cloud, DevOps, cyber security, automation', icon: 'Package', color: 'from-cyan-500 to-blue-500', cat: 'tech' },
  { slug: 'core-systems', title: 'Core Systems', desc: 'CRM, ERP, CSM, admin panels, dashboards', icon: 'Settings', color: 'from-indigo-500 to-purple-500', cat: 'tech' },
  { slug: 'custom-project', title: 'I Have an Idea', desc: 'Tell us your needs, we will build it', icon: 'Lightbulb', color: 'from-yellow-500 to-orange-500', cat: 'tech' },
]

export interface SubService {
  id: string
  name: string
  desc: string
  price: number
}

export interface SolutionServiceGroup {
  id: string
  name: string
  desc: string
  price: number
  subServices?: SubService[]
}

export const solutionServiceTree: Record<string, SolutionServiceGroup[]> = {
  'build-brand': [
    {
      id: 'branding', name: 'Branding', desc: 'Complete brand identity development from strategy to execution', price: 35000,
      subServices: [
        { id: 'brand-discovery', name: 'Brand Discovery & Research', desc: 'Market analysis, competitor audit, audience insights', price: 8000 },
        { id: 'brand-strategy', name: 'Brand Strategy', desc: 'Positioning, messaging, brand architecture', price: 12000 },
        { id: 'naming-verbal', name: 'Naming & Verbal Identity', desc: 'Brand naming, taglines, tone of voice', price: 8000 },
        { id: 'visual-identity', name: 'Visual Identity Design', desc: 'Logo, color palette, typography, imagery', price: 15000 },
        { id: 'brand-guidelines', name: 'Brand Guidelines / Brand Book', desc: 'Comprehensive brand usage rules and standards', price: 10000 },
        { id: 'brand-collateral', name: 'Brand Collateral Design', desc: 'Business cards, stationery, brochures, merchandise', price: 10000 },
        { id: 'digital-branding', name: 'Digital Branding', desc: 'Social media branding, digital presence strategy', price: 12000 },
        { id: 'employer-branding', name: 'Employer Branding', desc: 'EVPs, culture decks, recruitment branding', price: 15000 },
        { id: 'personal-branding', name: 'Personal Branding', desc: 'Founder and executive brand identity', price: 12000 },
        { id: 'brand-launch', name: 'Brand Launch / Rebranding Support', desc: 'Go-to-market strategy, rollout planning', price: 18000 },
        { id: 'brand-experience', name: 'Brand Experience Design', desc: 'Touchpoint mapping, brand interactions', price: 15000 },
      ],
    },
    {
      id: 'logo', name: 'Logo', desc: 'Custom logo design tailored to your brand identity', price: 12000,
      subServices: [
        { id: 'logo-trademark', name: 'Logo with Trademark', desc: 'Logo design including trademark registration assistance', price: 12000 },
        { id: 'logo-no-trademark', name: 'Logo without Trademark', desc: 'Standalone logo design without trademark registration', price: 8000 },
      ],
    },
    { id: 'website', name: 'Website', desc: 'Full website design and development with modern tech', price: 65000 },
    { id: 'uiux-brand', name: 'UI/UX', desc: 'Wireframes, prototypes, user testing, design systems', price: 45000 },
    { id: 'social-strategy', name: 'Social Media Strategy', desc: 'Strategic social media planning and content roadmap', price: 10000 },
    { id: 'content-creation', name: 'Content Creation', desc: 'Visual and written content for all platforms', price: 8000 },
    {
      id: 'organic-social', name: 'Organic Social Media Management', desc: 'Platform-specific content management and audience growth', price: 30000,
      subServices: [
        { id: 'organic-insta', name: 'Instagram', desc: 'Content calendar, posting, engagement, stories', price: 8000 },
        { id: 'organic-fb', name: 'Facebook', desc: 'Page management, community engagement, groups', price: 8000 },
        { id: 'organic-linkedin', name: 'LinkedIn', desc: 'Thought leadership, company page optimization', price: 8000 },
        { id: 'organic-youtube', name: 'YouTube', desc: 'Channel management, video SEO, audience growth', price: 12000 },
        { id: 'organic-quora', name: 'Quora', desc: 'Q&A strategy, brand authority building', price: 6000 },
      ],
    },
    {
      id: 'content-writing', name: 'Content Writing', desc: 'Professional writing services for every medium', price: 15000,
      subServices: [
        { id: 'copywriting', name: 'Copywriting', desc: 'Persuasive copy for ads, websites, and emails', price: 6000 },
        { id: 'ghostwriting-fiction', name: 'Ghostwriting - Fiction', desc: 'Novels, stories, and creative narratives', price: 15000 },
        { id: 'ghostwriting-nonfiction', name: 'Ghostwriting - Non-Fiction', desc: 'Books, articles, and thought leadership', price: 15000 },
        { id: 'scripts', name: 'Scripts', desc: 'Video scripts, podcast scripts, and reels', price: 8000 },
        { id: 'content-writing-creation', name: 'Content Creation', desc: 'Blog posts, social content, and articles', price: 8000 },
        { id: 'ugc-video-writing', name: 'UGC Video', desc: 'User-generated video content strategy', price: 10000 },
        { id: 'ai-videos', name: 'AI Videos', desc: 'AI-generated and AI-assisted video content', price: 8000 },
        { id: 'influencer-mktg-writing', name: 'Influencer Marketing', desc: 'Influencer outreach, campaign management', price: 15000 },
      ],
    },
  ],
  'post-production': [
    {
      id: 'video-editing', name: 'Video Editing', desc: 'Professional video editing and post-production services', price: 25000,
      subServices: [
        { id: 'motion-graphics', name: 'Motion Graphics', desc: 'Animated text, shapes, and branded motion design', price: 10000 },
        { id: '2d-animation', name: '2D Animation', desc: 'Character animation, explainer videos, whiteboard', price: 15000 },
        { id: '3d-animation', name: '3D Animation', desc: '3D modeling, rendering, product visualization', price: 25000 },
        { id: 'ad-videos', name: 'Ad Videos', desc: 'Short-form video ads for social media and platforms', price: 12000 },
        { id: 'pitch-video', name: 'Pitch Video', desc: 'Investor pitch decks, brand films, sizzle reels', price: 18000 },
      ],
    },
    { id: 'photo-edits', name: 'Photo Edits', desc: 'Professional photo retouching, color grading, and enhancement', price: 8000 },
    { id: 'photo-shoots', name: 'Photo Shoots', desc: 'Product photography, model shoots, and event coverage', price: 20000 },
    { id: 'video-ads', name: 'Video Ads', desc: 'Short-form video ads optimized for social platforms', price: 12000 },
    { id: 'content-creation-prod', name: 'Content Creation', desc: 'End-to-end content production for all mediums', price: 8000 },
    { id: 'ugc-videos', name: 'UGC Videos', desc: 'User-generated video content strategy and production', price: 10000 },
    { id: 'influencer-mktg-prod', name: 'Influencer Marketing', desc: 'Influencer outreach, relationship management, campaigns', price: 15000 },
  ],
  'creative-services': [
    {
      id: 'graphic-design-cs', name: 'Graphic Design', desc: 'Visual content for digital and print media', price: 20000,
      subServices: [
        { id: 'social-graphics', name: 'Social Media Graphics', desc: 'Posts, stories, banners for all platforms', price: 6000 },
        { id: 'banners', name: 'Banners & Display Ads', desc: 'Web banners, billboard ads, display creatives', price: 8000 },
        { id: 'mktg-collateral', name: 'Marketing Collateral', desc: 'Flyers, brochures, email templates', price: 10000 },
        { id: 'packaging-design', name: 'Packaging Design', desc: 'Product packaging, labels, wrappers', price: 12000 },
        { id: 'illustration', name: 'Illustration', desc: 'Custom illustrations, icons, vector art', price: 10000 },
      ],
    },
    { id: 'uiux-cs', name: 'UI/UX Design', desc: 'Wireframes, prototypes, user testing, design systems', price: 45000 },
    { id: 'presentations', name: 'Presentations & Pitch Decks', desc: 'Investor decks, sales presentations, keynote design', price: 15000 },
    {
      id: 'video-editing-cs', name: 'Video Editing', desc: 'Professional video editing and motion design', price: 25000,
      subServices: [
        { id: 'motion-graphics-cs', name: 'Motion Graphics', desc: 'Animated text, shapes, branded motion', price: 10000 },
        { id: '2d-anim-cs', name: '2D Animation', desc: 'Character, explainer, whiteboard animation', price: 15000 },
        { id: '3d-anim-cs', name: '3D Animation', desc: 'Modeling, rendering, product visualization', price: 25000 },
        { id: 'ad-videos-cs', name: 'Ad Videos', desc: 'Short-form ads for social and platforms', price: 12000 },
        { id: 'pitch-video-cs', name: 'Pitch Video', desc: 'Investor decks, brand films, sizzle reels', price: 18000 },
      ],
    },
    {
      id: 'ghost-writing', name: 'Ghost Writing', desc: 'Professional ghostwriting for books and content', price: 15000,
      subServices: [
        { id: 'ghost-fiction', name: 'Fiction', desc: 'Novels, stories, creative narratives', price: 15000 },
        { id: 'ghost-nonfiction', name: 'Non-Fiction', desc: 'Books, articles, thought leadership', price: 15000 },
        { id: 'ghost-books', name: 'Book Writing', desc: 'Full-length book ghostwriting', price: 25000 },
        { id: 'ghost-articles', name: 'Articles & Blogs', desc: 'Long-form articles, LinkedIn thought pieces', price: 10000 },
      ],
    },
    {
      id: 'content-writing-cs', name: 'Content Writing', desc: 'Professional writing for every medium', price: 15000,
      subServices: [
        { id: 'blog-posts', name: 'Blog Posts', desc: 'SEO-optimized blog content', price: 6000 },
        { id: 'web-copy', name: 'Web Copy', desc: 'Website copy, landing page text', price: 8000 },
        { id: 'product-desc', name: 'Product Descriptions', desc: 'E-commerce product copy', price: 6000 },
        { id: 'scripts-cs', name: 'Scripts', desc: 'Video, podcast, reel scripts', price: 8000 },
      ],
    },
    { id: 'copywriting-cs', name: 'Copywriting', desc: 'Persuasive copy for ads, emails, and sales pages', price: 6000 },
    { id: 'ad-shoots', name: 'Ad Shoots', desc: 'Professional ad shoot production for campaigns', price: 25000 },
    { id: 'brand-story', name: 'Brand Story', desc: 'Crafting your brand narrative and origin story', price: 12000 },
    { id: 'tagline-slogan', name: 'Tagline or Slogan', desc: 'Memorable taglines and brand slogans', price: 6000 },
  ],
  'print-packaging': [
    { id: 'brochures', name: 'Brochures', desc: 'Multi-page brochure design for brands and products', price: 8000 },
    { id: 'business-cards', name: 'Business Cards', desc: 'Premium business card design and print-ready files', price: 5000 },
    { id: 'labels', name: 'Labels', desc: 'Product labels, sticker design, packaging labels', price: 6000 },
    { id: 'hoardings', name: 'Hoardings & Billboards', desc: 'Large-format outdoor advertising design', price: 15000 },
    {
      id: 'hospitality-print', name: 'Hospitality Print Materials', desc: 'Complete print solutions for hotels, restaurants, and venues', price: 20000,
      subServices: [
        { id: 'menu-cards', name: 'Menu Cards', desc: 'Restaurant and café menu design', price: 8000 },
        { id: 'signage', name: 'Signage', desc: 'Room signs, directional signage, digital displays', price: 10000 },
        { id: 'room-collateral', name: 'Room Collateral', desc: 'In-room guides, compendiums, tent cards', price: 8000 },
        { id: 'event-materials', name: 'Event Materials', desc: 'Event brochures, programs, badges, banners', price: 12000 },
      ],
    },
    {
      id: 'books', name: 'Books', desc: 'Book layout, cover design, and typesetting', price: 25000,
      subServices: [
        { id: 'book-layout', name: 'Book Layout', desc: 'Interior layout and typesetting', price: 12000 },
        { id: 'cover-design', name: 'Cover Design', desc: 'Front, back, and spine cover design', price: 10000 },
        { id: 'typesetting', name: 'Typesetting', desc: 'Professional typography and formatting', price: 8000 },
        { id: 'ebook-format', name: 'eBook Formatting', desc: 'Kindle, EPUB, and digital formatting', price: 8000 },
      ],
    },
    { id: 'ai-to-print', name: 'AI to Print File Conversion', desc: 'Convert AI-generated files to print-ready formats', price: 8000 },
  ],
  'generate-leads': [
    {
      id: 'perf-marketing', name: 'Performance Marketing', desc: 'Data-driven ad campaigns across platforms', price: 25000,
      subServices: [
        { id: 'meta-ads-gl', name: 'Meta Ads', desc: 'Facebook & Instagram ad campaigns', price: 25000 },
        { id: 'google-ads-gl', name: 'Google Ads', desc: 'Search, display, shopping, remarketing', price: 25000 },
        { id: 'hotstar-ads', name: 'Jio Hotstar Ads', desc: 'OTT and streaming platform advertising', price: 30000 },
        { id: 'linkedin-ads', name: 'LinkedIn Ads', desc: 'B2B audience targeting and lead gen', price: 25000 },
      ],
    },
    {
      id: 'seo-gl', name: 'SEO', desc: 'Search engine optimization for organic growth', price: 25000,
      subServices: [
        { id: 'onpage-seo', name: 'On-Page SEO', desc: 'Content optimization, meta tags, structure', price: 10000 },
        { id: 'technical-seo', name: 'Technical SEO', desc: 'Site speed, indexing, crawl optimization', price: 12000 },
        { id: 'link-building', name: 'Link Building', desc: 'Quality backlinks and authority building', price: 15000 },
        { id: 'local-seo', name: 'Local SEO', desc: 'Google Business Profile, local citations', price: 10000 },
      ],
    },
    {
      id: 'digital-mktg', name: 'Digital Marketing', desc: 'Comprehensive digital marketing strategy and execution', price: 30000,
      subServices: [
        { id: 'social-mgmt-gl', name: 'Social Media Management', desc: 'Content calendar, posting, engagement', price: 15000 },
        { id: 'email-mktg-gl', name: 'Email Marketing', desc: 'Campaigns, automation, newsletters', price: 12000 },
        { id: 'content-mktg', name: 'Content Marketing', desc: 'Blog, video, and lead magnet creation', price: 15000 },
        { id: 'influencer-mktg-gl', name: 'Influencer Marketing', desc: 'Outreach, management, campaign tracking', price: 18000 },
      ],
    },
  ],
  'build-website': [
    { id: 'uiux-bw', name: 'UI/UX Design', desc: 'Wireframes, prototypes, user testing, design systems', price: 45000 },
    { id: 'ux-strategy', name: 'UX Strategy Implementation', desc: 'User research, journey mapping, information architecture', price: 35000 },
    { id: 'tech-consulting', name: 'Technology Consulting', desc: 'Stack selection, architecture planning, feasibility analysis', price: 25000 },
    {
      id: 'website-dev', name: 'Website Development', desc: 'Custom website built with modern technologies', price: 65000,
      subServices: [
        { id: 'static-site', name: 'Static Website', desc: 'Fast, lightweight brochure site', price: 25000 },
        { id: 'dynamic-site', name: 'Dynamic Website', desc: 'CMS-powered, content-rich website', price: 45000 },
        { id: 'portfolio-site', name: 'Portfolio Website', desc: 'Showcase work, projects, and capabilities', price: 35000 },
        { id: 'ecommerce-site', name: 'E-commerce Website', desc: 'Online store with payment and inventory', price: 75000 },
        { id: 'landing-page', name: 'Landing Page', desc: 'High-conversion single-page campaign site', price: 20000 },
        { id: '3d-site', name: '3D Animation Website', desc: 'Interactive 3D web experiences', price: 95000 },
      ],
    },
    {
      id: 'app-dev-bw', name: 'App Development', desc: 'Native and cross-platform mobile applications', price: 150000,
      subServices: [
        { id: 'ios-app', name: 'iOS App', desc: 'Native iOS development with Swift/SwiftUI', price: 150000 },
        { id: 'android-app', name: 'Android App', desc: 'Native Android development with Kotlin', price: 150000 },
      ],
    },
  ],
  'automate-business': [
    {
      id: 'ai-solutions', name: 'AI Solutions', desc: 'Artificial intelligence solutions for business transformation', price: 40000,
      subServices: [
        { id: 'chatbots', name: 'Chatbots', desc: 'Customer support and lead qualification bots', price: 35000 },
        { id: 'ai-tools', name: 'AI Tools', desc: 'Custom AI tools for specific business needs', price: 50000 },
        { id: 'agentic-ai', name: 'Agentic AI', desc: 'Autonomous AI agents for complex workflows', price: 75000 },
        { id: 'generative-ai', name: 'Generative AI', desc: 'Content generation, image gen, custom models', price: 60000 },
      ],
    },
    {
      id: 'emerging-tech', name: 'Emerging Tech', desc: 'Next-generation technology exploration and implementation', price: 0,
      subServices: [
        { id: 'ar-tech', name: 'AR (Augmented Reality)', desc: 'AR experiences, filters, and applications', price: 0 },
        { id: 'vr-tech', name: 'VR (Virtual Reality)', desc: 'Immersive VR experiences and simulations', price: 0 },
        { id: 'blockchain', name: 'Blockchain', desc: 'Blockchain solutions, smart contracts, DApps', price: 0 },
        { id: 'deep-tech', name: 'Deep Tech', desc: 'Cutting-edge deep technology R&D and implementation', price: 0 },
      ],
    },
    {
      id: 'systems-automation', name: 'Systems & Automation', desc: 'Process automation and system integration', price: 50000,
      subServices: [
        { id: 'proctoring', name: 'Proctoring Solutions', desc: 'Automated exam monitoring and integrity systems', price: 45000 },
        { id: 'workflow-auto', name: 'Workflow Automation', desc: 'Business process automation and RPA', price: 40000 },
        { id: 'data-scraper', name: 'Data Scraper', desc: 'Web scraping, data extraction, ETL pipelines', price: 25000 },
        { id: 'data-analytics-ab', name: 'Data Analytics', desc: 'Dashboards, reporting, business intelligence', price: 30000 },
      ],
    },
  ],
  'build-product': [
    {
      id: 'networking', name: 'Networking', desc: 'Network design, setup, and infrastructure management', price: 35000,
      subServices: [
        { id: 'network-design', name: 'Network Design', desc: 'Architecture planning and topology design', price: 25000 },
        { id: 'network-setup', name: 'Network Setup', desc: 'Router, switch, firewall configuration', price: 20000 },
        { id: 'network-monitor', name: 'Network Monitoring', desc: 'Performance monitoring and alerting', price: 15000 },
      ],
    },
    {
      id: 'security-infra', name: 'Security', desc: 'Comprehensive security assessment and hardening', price: 50000,
      subServices: [
        { id: 'pen-testing', name: 'Penetration Testing', desc: 'Vulnerability assessment and ethical hacking', price: 35000 },
        { id: 'compliance', name: 'Compliance', desc: 'ISO, SOC 2, GDPR compliance consulting', price: 40000 },
        { id: 'hardening', name: 'System Hardening', desc: 'Server, network, and application hardening', price: 25000 },
        { id: 'soc', name: 'SOC Setup', desc: 'Security operations center setup and monitoring', price: 60000 },
      ],
    },
    {
      id: 'cloud-infra', name: 'Cloud', desc: 'Cloud infrastructure setup, migration, and management', price: 60000,
      subServices: [
        { id: 'aws-cloud', name: 'AWS', desc: 'Amazon Web Services setup and management', price: 50000 },
        { id: 'azure-cloud', name: 'Azure', desc: 'Microsoft Azure infrastructure and services', price: 50000 },
        { id: 'gcp-cloud', name: 'GCP', desc: 'Google Cloud Platform architecture and deployment', price: 50000 },
        { id: 'cloud-migration', name: 'Cloud Migration', desc: 'Lift-and-shift, re-platform, re-architect', price: 45000 },
        { id: 'serverless', name: 'Serverless', desc: 'Serverless architecture, Lambda, functions', price: 35000 },
      ],
    },
    {
      id: 'devops', name: 'DevOps', desc: 'CI/CD, infrastructure as code, and automation', price: 50000,
      subServices: [
        { id: 'cicd', name: 'CI/CD', desc: 'Pipeline setup, automated testing, deployment', price: 35000 },
        { id: 'containerization', name: 'Containerization', desc: 'Docker, Kubernetes, container orchestration', price: 40000 },
        { id: 'iac', name: 'Infrastructure as Code', desc: 'Terraform, Ansible, CloudFormation', price: 35000 },
        { id: 'devops-monitor', name: 'Monitoring & Observability', desc: 'Logging, metrics, tracing, alerting', price: 25000 },
      ],
    },
    {
      id: 'cyber-security', name: 'Cyber Security', desc: 'Advanced threat protection and incident response', price: 50000,
      subServices: [
        { id: 'vuln-assessment', name: 'Vulnerability Assessment', desc: 'Automated and manual vulnerability scanning', price: 25000 },
        { id: 'threat-detection', name: 'Threat Detection', desc: 'SIEM, IDS/IPS, threat intelligence', price: 40000 },
        { id: 'incident-response', name: 'Incident Response', desc: 'Breach containment, forensics, recovery', price: 45000 },
      ],
    },
    {
      id: 'automation-infra', name: 'Automation', desc: 'Infrastructure and workflow automation', price: 50000,
      subServices: [
        { id: 'infra-auto', name: 'Infrastructure Automation', desc: 'Automated provisioning and configuration', price: 35000 },
        { id: 'rpa', name: 'RPA', desc: 'Robotic process automation for repetitive tasks', price: 30000 },
      ],
    },
  ],
  'core-systems': [
    {
      id: 'crm-cs', name: 'CRM', desc: 'Customer relationship management setup and customization', price: 50000,
      subServices: [
        { id: 'sales-pipeline', name: 'Sales Pipeline', desc: 'Pipeline setup, deal tracking, forecasting', price: 25000 },
        { id: 'contact-mgmt', name: 'Contact Management', desc: 'Lead and contact organization, segmentation', price: 15000 },
        { id: 'crm-automation', name: 'CRM Automation', desc: 'Automated workflows, triggers, follow-ups', price: 20000 },
        { id: 'crm-reporting', name: 'CRM Reporting', desc: 'Custom reports, dashboards, analytics', price: 15000 },
      ],
    },
    {
      id: 'erp', name: 'ERP', desc: 'Enterprise resource planning system implementation', price: 100000,
      subServices: [
        { id: 'inventory-erp', name: 'Inventory Management', desc: 'Stock tracking, warehouse management, reorder', price: 35000 },
        { id: 'finance-erp', name: 'Finance & Accounting', desc: 'Invoicing, billing, ledger, reconciliation', price: 35000 },
        { id: 'hr-erp', name: 'HR & Payroll', desc: 'Employee management, attendance, payroll', price: 30000 },
        { id: 'supply-chain', name: 'Supply Chain', desc: 'Procurement, vendor management, logistics', price: 35000 },
      ],
    },
    {
      id: 'cms-cs', name: 'CMS', desc: 'Content management system setup and customization', price: 45000,
      subServices: [
        { id: 'headless-cms', name: 'Headless CMS', desc: 'API-first CMS architecture and setup', price: 30000 },
        { id: 'content-modeling', name: 'Content Modeling', desc: 'Content types, taxonomies, relations design', price: 15000 },
        { id: 'template-dev', name: 'Template Development', desc: 'Custom theme and template development', price: 20000 },
        { id: 'cms-migration', name: 'CMS Migration', desc: 'Content migration between CMS platforms', price: 20000 },
      ],
    },
    { id: 'admin-panel', name: 'Admin Panel', desc: 'Custom admin dashboard for business management', price: 35000 },
    {
      id: 'dashboard', name: 'Dashboard', desc: 'Data visualization and KPI tracking dashboards', price: 30000,
      subServices: [
        { id: 'analytics-dash', name: 'Analytics Dashboard', desc: 'Business metrics, charts, and insights', price: 25000 },
        { id: 'kpi-tracking', name: 'KPI Tracking', desc: 'Goal tracking, performance indicators, alerts', price: 15000 },
        { id: 'reporting-dash', name: 'Reporting Dashboard', desc: 'Scheduled reports, export, data drill-down', price: 20000 },
      ],
    },
    {
      id: 'saas-platform', name: 'SaaS Platform', desc: 'End-to-end SaaS product development', price: 200000,
      subServices: [
        { id: 'multi-tenant', name: 'Multi-Tenant Architecture', desc: 'Isolated tenant data, scaling, security', price: 50000 },
        { id: 'subscription-mgmt', name: 'Subscription Management', desc: 'Billing, plans, invoicing, payment integration', price: 35000 },
        { id: 'saas-api', name: 'API Development', desc: 'REST/GraphQL APIs, third-party integrations', price: 40000 },
      ],
    },
    {
      id: 'app-dev-cs', name: 'App Development', desc: 'Native and cross-platform mobile applications', price: 150000,
      subServices: [
        { id: 'ios-app-cs', name: 'iOS App', desc: 'Native iOS development with Swift/SwiftUI', price: 150000 },
        { id: 'android-app-cs', name: 'Android App', desc: 'Native Android development with Kotlin', price: 150000 },
      ],
    },
  ],
  'custom-project': [
    { id: 'custom-sw-cs', name: 'Custom Software', desc: 'Bespoke software built to your exact specifications', price: 150000 },
    { id: 'mvp-dev', name: 'MVP Development', desc: 'Minimum viable product for validating your idea', price: 80000 },
    { id: 'product-consulting', name: 'Product Consulting', desc: 'Technical feasibility, architecture, roadmap planning', price: 25000 },
  ],
}

export interface TimelineMilestone {
  phase: string
  weeks: string
  desc: string
  pct: number
}

export const solutionTimelines: Record<string, TimelineMilestone[]> = {
  'build-brand': [
    { phase: 'Discovery & Research', weeks: 'W1', desc: 'Brand audit, market research, competitor analysis, stakeholder interviews', pct: 10 },
    { phase: 'Brand Strategy', weeks: 'W2', desc: 'Positioning, messaging framework, brand architecture, verbal identity', pct: 20 },
    { phase: 'Visual Identity', weeks: 'W2–4', desc: 'Logo design, color palette, typography, brand guidelines creation', pct: 40 },
    { phase: 'Review & Refinement', weeks: 'W4–5', desc: 'Client feedback, iterations, final approvals, brand book compilation', pct: 20 },
    { phase: 'Launch & Rollout', weeks: 'W5–6', desc: 'Brand launch collateral, internal training, go-to-market support', pct: 10 },
  ],
  'post-production': [
    { phase: 'Pre-Production', weeks: 'W1', desc: 'Script review, storyboard, shot list, production planning', pct: 10 },
    { phase: 'Production', weeks: 'W1–2', desc: 'Filming, photography, audio capture, on-set direction', pct: 30 },
    { phase: 'Post-Production', weeks: 'W2–4', desc: 'Video editing, color grading, motion graphics, sound design', pct: 40 },
    { phase: 'Review & Revisions', weeks: 'W4–5', desc: 'Client review rounds, fine cuts, final approvals', pct: 15 },
    { phase: 'Final Delivery', weeks: 'W5', desc: 'Export, format optimization, asset delivery, archiving', pct: 5 },
  ],
  'creative-services': [
    { phase: 'Creative Brief', weeks: 'W1', desc: 'Understanding requirements, brand context, project scope', pct: 10 },
    { phase: 'Concept Development', weeks: 'W1–2', desc: 'Mood boards, style exploration, initial concepts', pct: 25 },
    { phase: 'Design & Execution', weeks: 'W2–4', desc: 'Full design development, iterations, refinement', pct: 40 },
    { phase: 'Client Review', weeks: 'W4–5', desc: 'Feedback incorporation, revisions, final polish', pct: 20 },
    { phase: 'Final Handoff', weeks: 'W5', desc: 'File preparation, format delivery, brand alignment check', pct: 5 },
  ],
  'print-packaging': [
    { phase: 'Design Brief', weeks: 'W1', desc: 'Product understanding, technical requirements, material specs', pct: 10 },
    { phase: 'Concept & Layout', weeks: 'W1–2', desc: 'Structural design, visual concepts, die-line creation', pct: 25 },
    { phase: 'Design Development', weeks: 'W2–3', desc: 'Full design execution, mockups, material selection', pct: 35 },
    { phase: 'Prototype & Review', weeks: 'W3–4', desc: 'Print proofs, physical samples, client approvals', pct: 20 },
    { phase: 'Production Files', weeks: 'W4', desc: 'Print-ready file preparation, vendor coordination, final delivery', pct: 10 },
  ],
  'generate-leads': [
    { phase: 'Audit & Discovery', weeks: 'W1', desc: 'Current marketing audit, target audience analysis, goal setting', pct: 10 },
    { phase: 'Strategy & Planning', weeks: 'W1–2', desc: 'Channel strategy, budget allocation, creative planning', pct: 20 },
    { phase: 'Campaign Setup', weeks: 'W2–3', desc: 'Ad creation, audience targeting, landing pages, tracking setup', pct: 30 },
    { phase: 'Optimization', weeks: 'W3–5', desc: 'A/B testing, bid optimization, audience refinement, performance tuning', pct: 30 },
    { phase: 'Reporting & Scale', weeks: 'W5–6', desc: 'Performance reports, insights, scaling strategy, next steps', pct: 10 },
  ],
  'build-website': [
    { phase: 'Planning & Architecture', weeks: 'W1', desc: 'Sitemap, wireframes, technology selection, project roadmap', pct: 10 },
    { phase: 'UI/UX Design', weeks: 'W1–2', desc: 'High-fidelity mockups, prototypes, design system creation', pct: 20 },
    { phase: 'Development', weeks: 'W2–5', desc: 'Frontend and backend development, CMS integration, responsive builds', pct: 45 },
    { phase: 'Testing & QA', weeks: 'W5', desc: 'Cross-browser testing, performance optimization, content population', pct: 15 },
    { phase: 'Launch & Deploy', weeks: 'W5–6', desc: 'Domain setup, hosting deployment, SEO setup, go-live', pct: 10 },
  ],
  'automate-business': [
    { phase: 'Discovery & Mapping', weeks: 'W1', desc: 'Process audit, pain points identification, automation opportunities', pct: 10 },
    { phase: 'Solution Design', weeks: 'W1–2', desc: 'Architecture design, technology selection, workflow mapping', pct: 20 },
    { phase: 'Development & Integration', weeks: 'W2–4', desc: 'Automation development, API integration, AI model training', pct: 40 },
    { phase: 'Testing & Validation', weeks: 'W4–5', desc: 'User acceptance testing, performance validation, error handling', pct: 20 },
    { phase: 'Deployment & Handover', weeks: 'W5–6', desc: 'Production deployment, documentation, team training, ongoing support', pct: 10 },
  ],
  'build-product': [
    { phase: 'Assessment & Planning', weeks: 'W1', desc: 'Infrastructure audit, security assessment, requirement gathering', pct: 10 },
    { phase: 'Architecture Design', weeks: 'W1–2', desc: 'Network topology, security framework, cloud architecture planning', pct: 20 },
    { phase: 'Implementation', weeks: 'W2–5', desc: 'Infrastructure setup, security hardening, automation deployment', pct: 45 },
    { phase: 'Testing & Audit', weeks: 'W5', desc: 'Penetration testing, performance benchmarking, compliance audit', pct: 15 },
    { phase: 'Go-Live & Monitoring', weeks: 'W5–6', desc: 'Production cutover, monitoring setup, documentation, handover', pct: 10 },
  ],
  'core-systems': [
    { phase: 'Requirements Analysis', weeks: 'W1', desc: 'Business process analysis, stakeholder interviews, system audit', pct: 10 },
    { phase: 'System Configuration', weeks: 'W1–3', desc: 'CRM/ERP/CMS setup, workflow configuration, data migration', pct: 35 },
    { phase: 'Integration & Customization', weeks: 'W3–5', desc: 'Third-party integrations, custom modules API development', pct: 35 },
    { phase: 'Testing & Training', weeks: 'W5', desc: 'System testing, user training, documentation, UAT', pct: 15 },
    { phase: 'Go-Live & Support', weeks: 'W5–6', desc: 'Production launch, post-launch support, ongoing maintenance', pct: 5 },
  ],
  'custom-project': [
    { phase: 'Discovery & Ideation', weeks: 'W1', desc: 'Idea validation, feasibility study, market research, scope definition', pct: 10 },
    { phase: 'Planning & Architecture', weeks: 'W1–2', desc: 'Technical architecture, sprint planning, resource allocation', pct: 20 },
    { phase: 'Development', weeks: 'W2–5', desc: 'Agile development, sprint execution, regular demos, iterative builds', pct: 45 },
    { phase: 'Testing & Review', weeks: 'W5', desc: 'Quality assurance, user testing, feedback incorporation, refinement', pct: 15 },
    { phase: 'Delivery & Launch', weeks: 'W5–6', desc: 'Final delivery, deployment, handover documentation, go-live', pct: 10 },
  ],
}

export function getServiceInfo(id: string): { name: string; price: number; desc?: string } | undefined {
  const flat = services.find(s => s.id === id)
  if (flat) return flat
  for (const groups of Object.values(solutionServiceTree)) {
    for (const g of groups) {
      if (g.id === id) return g
      if (g.subServices) {
        const sub = g.subServices.find(s => s.id === id)
        if (sub) return sub
      }
    }
  }
}

export function calcQuote(ids: string[]) {
  const subtotal = ids.reduce((s, id) => s + (getServiceInfo(id)?.price || 0), 0)
  const discount = ids.length >= 3 ? Math.round(subtotal * 0.1) : 0
  const gst = Math.round((subtotal - discount) * 0.18)
  return { subtotal, discount, gst, total: subtotal - discount + gst }
}

export function formatINR(n: number) { return '₹' + n.toLocaleString('en-IN') }

export function formatPDFCurrency(n: number) { return 'INR ' + n.toLocaleString('en-IN') }

export const serviceDurationMap: Record<string, number> = {
  // Build Brand — Branding
  'brand-discovery': 5, 'brand-strategy': 7, 'naming-verbal': 5, 'visual-identity': 10,
  'brand-guidelines': 7, 'brand-collateral': 5, 'digital-branding': 5, 'employer-branding': 7,
  'personal-branding': 5, 'brand-launch': 7, 'brand-experience': 7,
  // Build Brand — Logo
  'logo-trademark': 10, 'logo-no-trademark': 5,
  // Build Brand — Standalone
  'website': 21, 'uiux-brand': 15, 'social-strategy': 5, 'content-creation': 3,
  // Build Brand — Organic Social
  'organic-insta': 3, 'organic-fb': 3, 'organic-linkedin': 3, 'organic-youtube': 5, 'organic-quora': 2,
  // Build Brand — Content Writing
  'copywriting': 2, 'ghostwriting-fiction': 30, 'ghostwriting-nonfiction': 25, 'scripts': 3,
  'content-writing-creation': 3, 'ugc-video-writing': 5, 'ai-videos': 3, 'influencer-mktg-writing': 7,
  // Post Production
  'motion-graphics': 7, '2d-animation': 14, '3d-animation': 21, 'ad-videos': 5, 'pitch-video': 10,
  'photo-edits': 2, 'photo-shoots': 5, 'video-ads': 5, 'content-creation-prod': 3,
  'ugc-videos': 5, 'influencer-mktg-prod': 7,
  // Creative Services — Graphic Design
  'social-graphics': 2, 'banners': 3, 'mktg-collateral': 5, 'packaging-design': 10, 'illustration': 7,
  // Creative Services — Standalone
  'uiux-cs': 15, 'presentations': 5, 'copywriting-cs': 2, 'ad-shoots': 7, 'brand-story': 5, 'tagline-slogan': 2,
  // Creative Services — Video Editing
  'motion-graphics-cs': 7, '2d-anim-cs': 14, '3d-anim-cs': 21, 'ad-videos-cs': 5, 'pitch-video-cs': 10,
  // Creative Services — Ghost Writing
  'ghost-fiction': 30, 'ghost-nonfiction': 25, 'ghost-books': 45, 'ghost-articles': 5,
  // Creative Services — Content Writing
  'blog-posts': 2, 'web-copy': 3, 'product-desc': 2, 'scripts-cs': 3,
  // Print Packaging
  'brochures': 5, 'business-cards': 2, 'labels': 3, 'hoardings': 7,
  'menu-cards': 3, 'signage': 5, 'room-collateral': 5, 'event-materials': 7,
  'book-layout': 7, 'cover-design': 5, 'typesetting': 5, 'ebook-format': 3, 'ai-to-print': 2,
  // Generate Leads
  'meta-ads-gl': 5, 'google-ads-gl': 5, 'hotstar-ads': 7, 'linkedin-ads': 5,
  'onpage-seo': 7, 'technical-seo': 7, 'link-building': 14, 'local-seo': 5,
  'social-mgmt-gl': 3, 'email-mktg-gl': 5, 'content-mktg': 7, 'influencer-mktg-gl': 10,
  // Build Website
  'uiux-bw': 15, 'ux-strategy': 10, 'tech-consulting': 5,
  'static-site': 10, 'dynamic-site': 21, 'portfolio-site': 14, 'ecommerce-site': 30,
  'landing-page': 7, '3d-site': 30, 'ios-app': 45, 'android-app': 45,
  // Automate Business — AI
  'chatbots': 14, 'ai-tools': 21, 'agentic-ai': 30, 'generative-ai': 25,
  // Automate Business — Emerging Tech
  'ar-tech': 21, 'vr-tech': 30, 'blockchain': 30, 'deep-tech': 45,
  // Automate Business — Systems
  'proctoring': 21, 'workflow-auto': 14, 'data-scraper': 10, 'data-analytics-ab': 14,
  // Build Product — Networking
  'network-design': 7, 'network-setup': 7, 'network-monitor': 5,
  // Build Product — Security
  'pen-testing': 10, 'compliance': 14, 'hardening': 7, 'soc': 30,
  // Build Product — Cloud
  'aws-cloud': 14, 'azure-cloud': 14, 'gcp-cloud': 14, 'cloud-migration': 21, 'serverless': 10,
  // Build Product — DevOps
  'cicd': 10, 'containerization': 14, 'iac': 10, 'devops-monitor': 7,
  // Build Product — Cyber Security
  'vuln-assessment': 7, 'threat-detection': 14, 'incident-response': 10,
  // Build Product — Automation
  'infra-auto': 10, 'rpa': 14,
  // Core Systems — CRM
  'sales-pipeline': 10, 'contact-mgmt': 7, 'crm-automation': 10, 'crm-reporting': 7,
  // Core Systems — ERP
  'inventory-erp': 21, 'finance-erp': 21, 'hr-erp': 21, 'supply-chain': 21,
  // Core Systems — CMS
  'headless-cms': 14, 'content-modeling': 7, 'template-dev': 10, 'cms-migration': 14,
  // Core Systems
  'admin-panel': 14,
  // Core Systems — Dashboard
  'analytics-dash': 10, 'kpi-tracking': 7, 'reporting-dash': 10,
  // Core Systems — SaaS
  'multi-tenant': 30, 'subscription-mgmt': 14, 'saas-api': 21,
  // Core Systems — App Dev
  'ios-app-cs': 45, 'android-app-cs': 45,
  // Custom Project
  'custom-sw-cs': 60, 'mvp-dev': 30, 'product-consulting': 7,
}

export function getServiceDuration(id: string): number {
  return serviceDurationMap[id] || 7
}

export function getServiceAbout(id: string): string {
  const info = getServiceInfo(id)
  if (!info) return ''
  return `${info.name} is a focused service offering designed to deliver measurable results for your business. ${info.desc ? info.desc.charAt(0).toUpperCase() + info.desc.slice(1) + '.' : ''} Our process ensures quality, attention to detail, and alignment with your brand objectives from start to finish.`
}

export function getServiceIncluded(id: string): string[] {
  const info = getServiceInfo(id)
  if (!info) return []
  const p = info.price
  if (p <= 5000) return ['Initial consultation & requirement gathering', 'Concept development with 2 design options', '1 round of revisions', 'Final deliverables in standard formats', 'Digital file handover']
  if (p <= 15000) return ['Detailed consultation & brief development', 'Research & competitive analysis', '3 concept options with mood boards', '2 rounds of revisions', 'Final deliverables in all required formats', 'Source files included']
  if (p <= 50000) return ['In-depth discovery & strategy session', 'Comprehensive research & analysis', 'Multiple concept explorations', '3 rounds of revisions', 'Final deliverables in all formats', 'Source files & documentation', 'Handover call or walkthrough']
  return ['Full discovery & requirements analysis', 'Strategic planning & architecture', 'Agile development process with sprint reviews', 'Unlimited revisions within scope', 'Complete documentation & source code', 'Deployment & launch support', 'Post-delivery support (2 weeks)', 'Team training & knowledge transfer']
}

export function getServiceExcluded(id: string): string[] {
  const info = getServiceInfo(id)
  if (!info) return []
  const p = info.price
  if (p <= 5000) return ['Stock images, fonts, or third-party assets', 'Printing, production, or manufacturing costs', 'Additional revisions beyond included rounds', 'Ongoing maintenance or support', 'Third-party software licenses or subscriptions']
  if (p <= 15000) return ['Stock images, fonts, or premium assets', 'Printing, production, or physical deliverables', 'Additional revisions beyond included rounds', 'Ongoing maintenance or retainer services', 'Third-party licenses, domain, or hosting fees', 'Project management beyond agreed scope']
  if (p <= 50000) return ['Stock images, fonts, or premium third-party assets', 'Printing, production, or manufacturing costs', 'Additional revisions beyond included rounds', 'Ongoing maintenance, hosting, or support', 'Third-party software licenses or subscriptions', 'Domain registration or SSL certificates', 'Content creation beyond agreed scope']
  return ['Third-party software licenses or subscriptions', 'Hardware, infrastructure, or cloud hosting costs', 'Ongoing maintenance beyond post-delivery support', 'Content creation beyond agreed scope', 'Third-party API costs or usage fees', 'Domain registration, SSL, or CDN costs', 'Regulatory compliance certifications']
}

export function getServiceStages(id: string, days: number): { stage: string; duration: string }[] {
  const info = getServiceInfo(id)
  const name = info?.name || 'Service'
  if (days <= 2) return [{ stage: 'Planning & Brief', duration: 'Day 1' }, { stage: 'Execution & Delivery', duration: 'Day 2' }]
  if (days <= 5) return [
    { stage: 'Discovery & Planning', duration: `Day 1-${Math.ceil(days * 0.3)}` },
    { stage: 'Design & Development', duration: `Day ${Math.ceil(days * 0.3) + 1}-${Math.ceil(days * 0.7)}` },
    { stage: 'Review & Final Delivery', duration: `Day ${Math.ceil(days * 0.7) + 1}-${days}` },
  ]
  if (days <= 10) return [
    { stage: 'Discovery & Research', duration: `Day 1-${Math.ceil(days * 0.25)}` },
    { stage: 'Concept Development', duration: `Day ${Math.ceil(days * 0.25) + 1}-${Math.ceil(days * 0.55)}` },
    { stage: 'Design & Execution', duration: `Day ${Math.ceil(days * 0.55) + 1}-${Math.ceil(days * 0.8)}` },
    { stage: 'Review, Revisions & Delivery', duration: `Day ${Math.ceil(days * 0.8) + 1}-${days}` },
  ]
  if (days <= 15) return [
    { stage: 'Discovery & Requirement Analysis', duration: `Day 1-${Math.ceil(days * 0.2)}` },
    { stage: 'Research & Strategy', duration: `Day ${Math.ceil(days * 0.2) + 1}-${Math.ceil(days * 0.4)}` },
    { stage: 'Design & Development', duration: `Day ${Math.ceil(days * 0.4) + 1}-${Math.ceil(days * 0.7)}` },
    { stage: 'Review, Testing & Revisions', duration: `Day ${Math.ceil(days * 0.7) + 1}-${Math.ceil(days * 0.9)}` },
    { stage: 'Finalization & Delivery', duration: `Day ${Math.ceil(days * 0.9) + 1}-${days}` },
  ]
  return [
    { stage: 'Discovery & Requirement Analysis', duration: `Day 1-${Math.ceil(days * 0.15)}` },
    { stage: 'Research & Strategy', duration: `Day ${Math.ceil(days * 0.15) + 1}-${Math.ceil(days * 0.3)}` },
    { stage: 'Design & Development Sprint 1', duration: `Day ${Math.ceil(days * 0.3) + 1}-${Math.ceil(days * 0.55)}` },
    { stage: 'Design & Development Sprint 2', duration: `Day ${Math.ceil(days * 0.55) + 1}-${Math.ceil(days * 0.75)}` },
    { stage: 'Testing, Review & Revisions', duration: `Day ${Math.ceil(days * 0.75) + 1}-${Math.ceil(days * 0.9)}` },
    { stage: 'Final QA & Delivery', duration: `Day ${Math.ceil(days * 0.9) + 1}-${days}` },
  ]
}

export const ganttColors: [number, number, number][] = [
  [147, 51, 234], [59, 130, 246], [236, 72, 153],
  [245, 158, 11], [16, 185, 129], [239, 68, 68],
  [14, 165, 233], [168, 85, 247], [249, 115, 22],
  [34, 197, 94], [103, 232, 249], [251, 191, 36],
  [244, 114, 182], [52, 211, 153], [96, 165, 250],
]