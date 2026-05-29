'use client'
import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, ChevronDown, Zap, Phone, MessageCircle, Mail, TrendingUp, Palette, Globe, Bot, Package, HelpCircle, Clapperboard, Image, Printer, Settings, Download, Minus, Plus, X } from 'lucide-react'
import { solutions, solutionServiceTree, formatINR, formatPDFCurrency, calcQuote, getServiceInfo, getServiceDuration, ganttColors, getServiceAbout, getServiceIncluded, getServiceExcluded, getServiceStages } from '@/lib/pricing'
import type { SolutionServiceGroup, SubService } from '@/lib/pricing'

const icons: Record<string, React.ReactNode> = {
  'build-brand': <Palette />, 'post-production': <Clapperboard />, 'creative-services': <Image />,
  'print-packaging': <Printer />, 'generate-leads': <TrendingUp />, 'build-website': <Globe />,
  'automate-business': <Bot />, 'build-product': <Package />, 'core-systems': <Settings />,
  'custom-project': <HelpCircle />,
}

const defaultPackages = [
  { name: 'Starter', price: 25000, features: ['Branding — Logo', 'Brand Guidelines / Brand Book', 'Visual Identity Design', 'Basic social media adaptations'], popular: false },
  { name: 'Growth', price: 65000, features: ['Everything in Starter', 'Brand Collateral Design', 'Basic landing page', 'Custom social media adaptations'], popular: true },
  { name: 'Pro', price: 125000, features: ['Everything in Growth', '2 months social media plan & strategy', '5-page website with landing page', 'Dedicated project manager', 'Priority support'], popular: false },
]

const postProdPackages = [
  { name: 'Starter', price: 25000, features: ['Choose any one:', '2 UGC videos', '4hr product/model photoshoot + edits'], popular: false },
  { name: 'Growth', price: 65000, features: ['Choose any one:', '5 UGC videos', '8hr shoot + edits + nano influencer', '1 video ad + edits'], popular: true },
  { name: 'Pro', price: 125000, features: ['Choose any one:', '10 UGC videos + edits', '2-day (8+8hr) shoot + edits + micro influencer', '2 ad shoots with micro influencer'], popular: false },
]

const solutionPackages: Record<string, typeof defaultPackages> = {
  'post-production': postProdPackages,
  'creative-services': [
    { name: 'Starter', price: 25000, features: ['Choose any one:', '10-15 slide presentation + UI/UX design', 'Ghost writing a book (250 pages)'], popular: false },
    { name: 'Growth', price: 65000, features: ['UI/UX for app + brand story', 'Ghost writing + publishing + book cover design'], popular: true },
    { name: 'Pro', price: 125000, features: ['Everything in Growth', 'Website for the chosen option'], popular: false },
  ],
  'print-packaging': [
    { name: 'Starter', price: 15000, features: ['Choose any one:', 'Business card', 'Brochure', 'Hoarding', 'Book design'], popular: false },
    { name: 'Growth', price: 35000, features: ['50 brochures or business card design', 'AI to print file conversion'], popular: true },
    { name: 'Pro', price: 75000, features: ['Hospitality print materials', 'AI to print file conversion'], popular: false },
  ],
  'generate-leads': [
    { name: 'Starter', price: 25000, features: ['Choose any one:', 'Meta Ads campaign setup', 'Google Ads campaign setup', 'SEO audit + on-page optimization'], popular: false },
    { name: 'Growth', price: 65000, features: ['Choose any one:', '2-platform performance marketing', 'SEO + content marketing bundle', 'Full digital marketing strategy'], popular: true },
    { name: 'Pro', price: 125000, features: ['Choose any one:', '3-platform performance marketing', 'Full SEO + link building + content', 'Complete digital marketing suite + influencer'], popular: false },
  ],
  'build-website': [
    { name: 'Starter', price: 35000, features: ['Landing page or portfolio site', 'UI/UX wireframes', 'Basic SEO setup'], popular: false },
    { name: 'Growth', price: 85000, features: ['Choose any one:', 'Dynamic website (up to 5 pages)', 'E-commerce website', 'UI/UX design + prototypes', 'UX strategy implementation', 'SEO + content upload'], popular: true },
    { name: 'Pro', price: 175000, features: ['Choose any one:', 'E-commerce with admin panel', '3D animation website', 'Full UI/UX + strategy', 'Technology consulting', 'App development (1 platform)', 'Priority support'], popular: false },
  ],
  'automate-business': [
    { name: 'Starter', price: 35000, features: ['1 AI chatbot', 'Basic workflow automation', 'Data analytics report'], popular: false },
    { name: 'Growth', price: 85000, features: ['2 AI solutions (chatbot + tools)', 'Workflow automation + data scraper', 'Emerging tech consultation'], popular: true },
    { name: 'Pro', price: 175000, features: ['Full AI suite (chatbot, tools, agentic)', 'Systems automation + proctoring', 'Emerging tech pilot project', 'Dedicated project manager', 'Priority support'], popular: false },
  ],
  'build-product': [
    { name: 'Starter', price: 45000, features: ['Cloud setup (1 provider)', 'Basic security audit', 'Network design & setup'], popular: false },
    { name: 'Growth', price: 95000, features: ['Cloud + DevOps pipeline', 'Security assessment + hardening', 'Automation setup', 'Infrastructure monitoring'], popular: true },
    { name: 'Pro', price: 195000, features: ['Multi-cloud architecture', 'Full cyber security suite', 'CI/CD + containerization', 'Infrastructure automation', 'Dedicated project manager', '24/7 support'], popular: false },
  ],
  'core-systems': [
    { name: 'Starter', price: 50000, features: ['CRM setup + sales pipeline', 'Admin panel', '1 custom dashboard'], popular: false },
    { name: 'Growth', price: 100000, features: ['CRM + ERP module', 'CMS setup', 'Admin panel + dashboards', 'API integrations'], popular: true },
    { name: 'Pro', price: 200000, features: ['Full ERP implementation', 'SaaS platform development', 'Mobile app (1 platform)', 'All core systems integrated', 'Dedicated project manager', 'Priority support'], popular: false },
  ],
  'custom-project': [],
}

async function downloadQuote(items: { id: string; name: string; price: number }[], q: ReturnType<typeof calcQuote>, selectedPlans: Array<{slug: string; name: string}>, allPlanPrices: number, totalPrice: number, solTitle: string, clientName: string, companyName: string, slug: string, clientEmail: string, clientPhone: string): Promise<string> {
  const jspdf = await import('jspdf')
  const doc = new jspdf.default('p', 'mm', 'a4')
  const pw = 210, ph = 297, ml = 22, mr = 22, mt = 42, mb = 25
  const cw = pw - ml - mr

  const P: [number, number, number] = [88, 28, 135]
  const PG: [number, number, number] = [108, 43, 160]
  const G: [number, number, number] = [107, 114, 128]
  const LG: [number, number, number] = [249, 250, 251]
  const B: [number, number, number] = [229, 231, 235]
  const W: [number, number, number] = [255, 255, 255]

  const serviceDuration = (id: string) => {
    const d = getServiceDuration(id)
    if (d <= 2) return '1-2 days'
    if (d <= 5) return '3-5 days'
    if (d <= 10) return '5-10 days'
    if (d <= 15) return '10-15 days'
    if (d <= 21) return '2-3 weeks'
    if (d <= 30) return '3-4 weeks'
    if (d <= 45) return '4-6 weeks'
    return '6-8 weeks'
  }

  async function loadLogo(sz: number): Promise<string | null> {
    try {
      const img = document.createElement('img')
      img.crossOrigin = 'anonymous'
      const loaded = new Promise<string | null>((resolve) => {
        img.onload = () => {
          const c = document.createElement('canvas')
          c.width = sz; c.height = sz
          c.getContext('2d')!.drawImage(img, 0, 0, sz, sz)
          resolve(c.toDataURL('image/png'))
        }
        img.onerror = () => resolve(null)
      })
      img.src = '/logo.svg'
      return loaded
    } catch { return null }
  }

  const logo = await loadLogo(300)

  function letterhead(page: number) {
    // Top accent bar
    doc.setFillColor(...P)
    doc.rect(0, 0, pw, 3, 'F')

    // Thin gold accent line below purple bar
    doc.setFillColor(210, 180, 140)
    doc.rect(0, 3, pw, 0.4, 'F')

    // Left vertical brand stripe
    doc.setFillColor(245, 240, 250)
    doc.rect(0, 3.4, 4, ph - 21.4, 'F')

    // Logo
    if (logo) doc.addImage(logo, 'PNG', ml, 7, 12, 12)

    // Company name + tagline
    doc.setFontSize(9).setFont('helvetica', 'bold').setTextColor(...P)
    doc.text('THE REVIEREE STUDIOS', ml + 15, 11)
    doc.setFontSize(5.5).setFont('helvetica', 'normal').setTextColor(...G)
    doc.text('CREATIVE - TECHNOLOGY - MARKETING', ml + 15, 15.5)

    // Address line in header
    doc.setFontSize(5).setFont('helvetica', 'normal').setTextColor(180, 170, 190)
    doc.text('sangeeta@thereviereestudios.in  |  +91 91564 72904  |  www.thereviereestudios.in', pw - ml, 11, { align: 'right' })
    doc.text('GST: [GST Number]', pw - ml, 15.5, { align: 'right' })

    // Separator line
    doc.setDrawColor(220, 212, 235).setLineWidth(0.4)
    doc.line(ml, 20, pw - ml, 20)
  }

  function footer(page: number) {
    // Footer separator
    doc.setDrawColor(220, 212, 235).setLineWidth(0.4)
    doc.line(ml, ph - 20, pw - ml, ph - 20)

    // Footer background bar
    doc.setFillColor(248, 246, 252)
    doc.rect(ml, ph - 19, cw, 14, 'F')

    // Left side: company
    doc.setFontSize(5.5).setFont('helvetica', 'bold').setTextColor(...P)
    doc.text('THE REVIEREE STUDIOS', ml + 3, ph - 13)
    doc.setFontSize(5).setFont('helvetica', 'normal').setTextColor(...G)
    doc.text('Creative - Technology - Marketing', ml + 3, ph - 9)

    // Right: page
    doc.setFontSize(8).setFont('helvetica', 'bold').setTextColor(...P)
    doc.text(`${page}`, pw - ml - 3, ph - 9, { align: 'right' })
    doc.setFontSize(5).setFont('helvetica', 'normal').setTextColor(...G)
    doc.text('Page', pw - ml - 3, ph - 13, { align: 'right' })
  }

  function addPage(n: number) {
    if (n > 1) doc.addPage()
    letterhead(n)
    footer(n)
  }

  function heading(y: number, text: string) {
    doc.setFontSize(14).setFont('helvetica', 'bold').setTextColor(...P)
    doc.text(text, ml, y)
    doc.setFillColor(...P)
    doc.rect(ml, y + 1.5, 22, 1.2, 'F')
    return y + 9
  }

  function bodyText(y: number, text: string, size = 8, color = G) {
    doc.setFontSize(size).setFont('helvetica', 'normal').setTextColor(...color)
    return doc.splitTextToSize(text, cw)
  }

  function wrappedText(lines: string[], y: number, leading = 4): number {
    lines.forEach(l => { doc.text(l, ml, y); y += leading })
    return y
  }

  function coloredBox(y: number, h: number, color = LG) {
    doc.setFillColor(...color)
    doc.roundedRect(ml, y, cw, h, 1, 1, 'F')
  }

  // ===== PAGE 1: Cover =====
  addPage(1)
  const cY = ph / 2 - 45
  if (logo) doc.addImage(logo, 'PNG', pw / 2 - 18, cY - 65, 36, 36)
  doc.setFontSize(26).setFont('helvetica', 'bold').setTextColor(...P)
  doc.text('PROJECT PROPOSAL', pw / 2, cY - 15, { align: 'center' })
  doc.setFontSize(11).setFont('helvetica', 'normal').setTextColor(...G)
  doc.text(solTitle, pw / 2, cY + 2, { align: 'center' })
  doc.setDrawColor(...P).setLineWidth(0.5)
  doc.line(pw / 2 - 40, cY + 8, pw / 2 + 40, cY + 8)

  // Client details
  doc.setDrawColor(...B).setLineWidth(0.3)
  doc.line(ml + 30, cY + 36, pw - ml - 30, cY + 36)
  doc.setFontSize(7).setFont('helvetica', 'normal').setTextColor(...G)
  doc.text('PREPARED FOR', ml, cY + 43)
  doc.setFontSize(9).setFont('helvetica', 'bold').setTextColor(...P)
  doc.text(clientName, ml, cY + 49)
  doc.setFontSize(6).setFont('helvetica', 'normal').setTextColor(...G)
  doc.text(companyName || '', ml, cY + 54)
  doc.text(clientEmail || '', ml, cY + 59)
  doc.text(clientPhone || '', ml, cY + 64)

  const today = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
  doc.setFontSize(7).setFont('helvetica', 'normal').setTextColor(...G)
  doc.text('DATE', pw - ml, cY + 43, { align: 'right' })
  doc.setFontSize(8).setFont('helvetica', 'bold').setTextColor(30, 30, 30)
  doc.text(today, pw - ml, cY + 49, { align: 'right' })
  doc.setFontSize(6).setFont('helvetica', 'normal').setTextColor(...G)
  doc.text('Prepared by The Revieree Studios', pw - ml, cY + 54, { align: 'right' })

  // Bottom tagline
  doc.setFontSize(6).setFont('helvetica', 'italic').setTextColor(180, 170, 190)
  doc.text('Transforming ideas into impactful digital experiences', pw / 2, ph - 24, { align: 'center' })

  // ===== PAGE 2: Client Information + Table of Contents =====
  addPage(2)
  let y = heading(32, 'Client Information')

  // Client details card
  doc.setFillColor(248, 246, 252)
  doc.roundedRect(ml, y, cw, 16, 1.5, 1.5, 'F')
  doc.setDrawColor(...P)
  doc.roundedRect(ml, y, cw, 16, 1.5, 1.5, 'S')
  doc.setFontSize(6.5).setFont('helvetica', 'normal').setTextColor(...G)
  const fieldW = cw / 4
  const labels = ['Name', 'Email', 'Phone', 'Company']
  const clientVals = [clientName, clientEmail, clientPhone, companyName || '-']
  labels.forEach((l, i) => {
    doc.setFontSize(6).setFont('helvetica', 'bold').setTextColor(...P)
    doc.text(l, ml + 4 + i * fieldW, y + 4.5)
    doc.setFontSize(7.5).setFont('helvetica', 'normal').setTextColor(30, 30, 30)
    doc.text(clientVals[i], ml + 4 + i * fieldW, y + 10.5)
  })
  y += 26

  doc.setFontSize(11).setFont('helvetica', 'bold').setTextColor(...P)
  doc.text('Table of Contents', ml, y)
  doc.setFillColor(...P)
  doc.rect(ml, y + 1.5, 22, 1.2, 'F')
  y += 9
  const toc = [
    ['1.', 'Scope of Work', 'Detailed service breakdown, inclusions & exclusions', '03'],
    ['2.', 'Pricing & Investment', 'Complete pricing breakdown with GST', '04'],
    ['3.', 'Project Timeline', 'Milestone-based delivery schedule', '05'],
    ['4.', 'Why The Revieree Studios', 'About us, differentiators & track record', '06'],
    ['5.', 'Get in Touch', 'Contact information & next steps', '07'],
  ]
  y += 3
  toc.forEach(([num, title, desc, pg]) => {
    coloredBox(y, 10)
    doc.setFontSize(10).setFont('helvetica', 'bold').setTextColor(...P)
    doc.text(`${num}  ${title}`, ml + 4, y + 4)
    doc.setFontSize(6.5).setFont('helvetica', 'normal').setTextColor(...G)
    doc.text(desc, ml + 4, y + 8.5)
    doc.setFontSize(9).setFont('helvetica', 'bold').setTextColor(...P)
    doc.text(pg, pw - ml - 5, y + 4, { align: 'right' })
    y += 12
  })

  let pageN = 2

  // ===== PAGE 3: Detailed Scope of Work =====
  addPage(++pageN)
  y = heading(32, 'Scope of Work')
  const scopeIntro = `This proposal outlines the services curated for your ${solTitle} project${selectedPlans.length > 0 ? ` under the ${selectedPlans.map(sp => sp.name).join(' + ')} Plan` : ''}. Below is a detailed breakdown of each service, including what is covered and what is excluded.`
  y = wrappedText(bodyText(y, scopeIntro, 8, G), y, 4.5) + 5

  // Package details if selected plans exist
  selectedPlans.forEach(sp => {
    const solPkgs = solutionPackages[sp.slug] || defaultPackages
    const pkg = solPkgs.find(p => p.name === sp.name)
    const solTitlePkg = solutions.find(s => s.slug === sp.slug)?.title || sp.slug
    if (pkg) {
      if (y > ph - 50) { addPage(++pageN); y = 32 }
      coloredBox(y, 5, P)
      doc.setFontSize(9).setFont('helvetica', 'bold').setTextColor(...W)
      doc.text(`${sp.name} Plan - ${solTitlePkg}`, ml + 4, y + 3.8)
      y += 8
      const features = pkg.features.filter(f => f !== 'Choose any one:')
      features.forEach(f => {
        if (y > ph - 30) { addPage(++pageN); y = 32 }
        doc.setFontSize(6.5).setFont('helvetica', 'normal').setTextColor(...G)
        doc.text(`-  ${f}`, ml + 6, y + 3.5)
        y += 4
      })
      y += 4
    }
  })

  // Per-service detailed breakdown
  items.forEach((s, i) => {
    if (y > ph - 55) { addPage(++pageN); y = 32 }

    // Service heading
    doc.setFontSize(9).setFont('helvetica', 'bold').setTextColor(...P)
    doc.text(`${i + 1}.  ${s.name}`, ml, y + 2)
    doc.setFontSize(6).setFont('helvetica', 'normal').setTextColor(...G)
    doc.text(formatPDFCurrency(s.price), pw - ml, y + 2, { align: 'right' })
    y += 7

    // About paragraph
    const aboutLines = doc.splitTextToSize(getServiceAbout(s.id), cw)
    doc.setFontSize(6.5).setFont('helvetica', 'normal').setTextColor(30, 30, 30)
    aboutLines.forEach((l: string) => { doc.text(l, ml, y); y += 3.5 })
    y += 2

    // What's Included
    doc.setFillColor(220, 252, 231)
    doc.roundedRect(ml, y, 2.5, 2.5, 0.3, 0.3, 'F')
    doc.setFontSize(6.5).setFont('helvetica', 'bold').setTextColor(22, 163, 74)
    doc.text("What's Included", ml + 4, y + 2)

    y += 4.5
    const included = getServiceIncluded(s.id)
    included.forEach(pt => {
      if (y > ph - 25) { addPage(++pageN); y = 32 }
      doc.setFontSize(5.5).setFont('helvetica', 'normal').setTextColor(30, 30, 30)
      doc.text(`+  ${pt}`, ml + 4, y + 1.5)
      y += 3.5
    })
    y += 1.5

    // What's Not Included
    if (y > ph - 30) { addPage(++pageN); y = 32 }
    doc.setFillColor(254, 226, 226)
    doc.roundedRect(ml, y, 2.5, 2.5, 0.3, 0.3, 'F')
    doc.setFontSize(6.5).setFont('helvetica', 'bold').setTextColor(220, 38, 38)
    doc.text("What's Not Included", ml + 4, y + 2)
    y += 4.5
    const excluded = getServiceExcluded(s.id)
    excluded.forEach(pt => {
      if (y > ph - 25) { addPage(++pageN); y = 32 }
      doc.setFontSize(5.5).setFont('helvetica', 'normal').setTextColor(...G)
      doc.text(`-  ${pt}`, ml + 4, y + 1.5)
      y += 3.5
    })
    y += 3

    // Separator between services
    doc.setDrawColor(229, 231, 235)
    doc.line(ml, y, pw - ml, y)
    y += 3
  })

  // ===== PAGE: Pricing & Investment =====
  addPage(++pageN)
  y = heading(32, 'Pricing & Investment')
  doc.setFontSize(7.5).setFont('helvetica', 'normal').setTextColor(...G)
  doc.text('Below is the complete pricing breakdown for your selected services and package.', ml, y)
  y += 7

  // Tighter spacing for numbers (relaxed for readability)
  const numDoc = doc as any
  const tig = -0.15
  const norm = 0

  // Table header
  doc.setFillColor(...P)
  doc.rect(ml, y, cw * 0.48, 6, 'F')
  doc.rect(ml + cw * 0.48, y, cw * 0.22, 6, 'F')
  doc.rect(ml + cw * 0.70, y, cw * 0.14, 6, 'F')
  doc.rect(ml + cw * 0.84, y, cw * 0.16, 6, 'F')
  doc.setFontSize(7).setFont('helvetica', 'bold').setTextColor(...W)
  doc.text('Service', ml + 3, y + 4)
  doc.text('Timeline', ml + cw * 0.48 + 3, y + 4)
  doc.text('Category', ml + cw * 0.70 + 3, y + 4)
  doc.text('Amount', pw - ml - 3, y + 4, { align: 'right' })
  y += 6

  items.forEach((s, i) => {
    const bg: [number, number, number] = i % 2 === 0 ? LG : [255, 255, 255]
    doc.setFillColor(...bg)
    doc.rect(ml, y, cw, 5.5, 'F')
    doc.setFontSize(7).setFont('helvetica', 'normal').setTextColor(30, 30, 30)
    doc.text(s.name, ml + 3, y + 4)
    doc.setFontSize(6).setFont('helvetica', 'normal').setTextColor(...G)
    doc.text(serviceDuration(s.id), ml + cw * 0.48 + 3, y + 4)
    doc.text('Professional Service', ml + cw * 0.70 + 3, y + 4)
    doc.setFontSize(7).setFont('helvetica', 'bold').setTextColor(30, 30, 30)
    numDoc.setCharSpace(tig)
    doc.text(formatPDFCurrency(s.price), pw - ml - 3, y + 4, { align: 'right' })
    numDoc.setCharSpace(norm)
    y += 5.5
  })

  // Subtotal
  y += 2
  doc.setDrawColor(...B).line(ml, y, pw - ml, y)
  y += 4
  doc.setFontSize(7.5).setFont('helvetica', 'normal').setTextColor(...G)
  doc.text('Services Subtotal', ml + 3, y)
  doc.setFontSize(7.5).setFont('helvetica', 'bold').setTextColor(30, 30, 30)
  numDoc.setCharSpace(tig)
  doc.text(formatPDFCurrency(q.subtotal), pw - ml - 3, y, { align: 'right' })
  numDoc.setCharSpace(norm)
  y += 5.5

  // Plan rows when applicable
  const hasPlan = selectedPlans.length > 0
  const planPrice = allPlanPrices
  const planLabel = selectedPlans.map(sp => sp.name).join(' + ')
  if (hasPlan) {
    doc.setFontSize(7.5).setFont('helvetica', 'normal').setTextColor(...P)
    doc.text(`${planLabel} Plan`, ml + 3, y)
    doc.setFontSize(7.5).setFont('helvetica', 'bold').setTextColor(...P)
    numDoc.setCharSpace(tig)
    doc.text(formatPDFCurrency(planPrice), pw - ml - 3, y, { align: 'right' })
    numDoc.setCharSpace(norm)
    y += 7

    const gstOnTotal = Math.round((planPrice + q.subtotal) * 0.18)
    doc.setFontSize(7.5).setFont('helvetica', 'normal').setTextColor(...G)
    doc.text('GST (18%)', ml + 3, y)
    numDoc.setCharSpace(tig)
    doc.text(formatPDFCurrency(gstOnTotal), pw - ml - 3, y, { align: 'right' })
    numDoc.setCharSpace(norm)
    y += 7

    const grandTotal = planPrice + q.subtotal + gstOnTotal
    doc.setFillColor(...P)
    doc.rect(ml, y, cw, 9, 'F')
    doc.setFontSize(11).setFont('helvetica', 'bold').setTextColor(...W)
    doc.text(`Grand Total (${planLabel})`, ml + 5, y + 6.5)
    numDoc.setCharSpace(tig)
    doc.text(formatPDFCurrency(grandTotal), pw - ml - 3, y + 6.5, { align: 'right' })
    numDoc.setCharSpace(norm)
    y += 11
    doc.setFontSize(6).setFont('helvetica', 'italic').setTextColor(...G)
    doc.text('* Includes selected plans, services, and GST at 18%.', ml, y)
  } else {
    if (q.discount > 0) {
      doc.setFontSize(7.5).setFont('helvetica', 'normal').setTextColor(220, 38, 38)
      doc.text('Discount (10%)', ml + 3, y)
      numDoc.setCharSpace(tig)
      doc.text(`-${formatPDFCurrency(q.discount)}`, pw - ml - 3, y, { align: 'right' })
      numDoc.setCharSpace(norm)
      y += 5.5
    }
    doc.setFontSize(7.5).setFont('helvetica', 'normal').setTextColor(...G)
    doc.text('GST (18%)', ml + 3, y)
    numDoc.setCharSpace(tig)
    doc.text(formatPDFCurrency(q.gst), pw - ml - 3, y, { align: 'right' })
    numDoc.setCharSpace(norm)
    y += 7

    doc.setFillColor(...P)
    doc.rect(ml, y, cw, 9, 'F')
    doc.setFontSize(11).setFont('helvetica', 'bold').setTextColor(...W)
    doc.text('Total', ml + 5, y + 6.5)
    numDoc.setCharSpace(tig)
    doc.text(formatPDFCurrency(q.total), pw - ml - 3, y + 6.5, { align: 'right' })
    numDoc.setCharSpace(norm)
    y += 11
    doc.setFontSize(6).setFont('helvetica', 'italic').setTextColor(...G)
    doc.text('* GST calculated at 18%.', ml, y)
  }

  // ===== PAGE: Project Timeline =====
  addPage(++pageN)
  const tlStartPage = pageN
  y = heading(32, 'Project Timeline')

  // Text explanation
  doc.setFontSize(7.5).setFont('helvetica', 'normal').setTextColor(...G)
  const explText = 'This chart shows the estimated delivery timeline for each selected service. The height of each bar represents the number of days required to complete that service from start to finish. Services with longer durations involve more extensive research, design, development, testing, and revision cycles. Most services can run concurrently, so the overall project timeline is determined by the service with the longest duration.'
  y = wrappedText(bodyText(y, explText, 8, G), y, 4.5) + 6

  const sorted = [...items].sort((a, b) => getServiceDuration(b.id) - getServiceDuration(a.id))
  const totalDays = Math.max(...sorted.map(s => getServiceDuration(s.id)), 1)
  const totalWeeks = Math.ceil(totalDays / 7)

  const chartL = ml + 8
  const chartW = pw - chartL - ml
  const chartH = Math.min(105, ph - y - 25)
  const chartBottom = y + chartH
  const barCount = sorted.length
  const barGap = 2
  const barTotalW = chartW / barCount
  const barW = Math.max(barTotalW - barGap, 3)

  // Horizontal gridlines at week intervals
  doc.setDrawColor(226, 232, 240)
  doc.setLineWidth(0.3)
  for (let w = 0; w <= totalWeeks; w++) {
    const wy = chartBottom - (w * 7 / totalDays) * chartH
    doc.line(chartL, wy, pw - ml, wy)
    doc.setFontSize(5).setFont('helvetica', 'normal').setTextColor(...G)
    doc.text(`W${w + 1}`, ml, wy + 1.5)
  }
  doc.setLineWidth(0.1)

  // Bars
  sorted.forEach((s, i) => {
    const dur = getServiceDuration(s.id)
    const color = ganttColors[i % ganttColors.length]
    const barX = chartL + i * barTotalW + barGap / 2
    const barH = Math.max((dur / totalDays) * chartH, 2)

    doc.setFillColor(...color)
    doc.roundedRect(barX, chartBottom - barH, barW, barH, 0.5, 0.5, 'F')

    // Duration label above bar
    doc.setFontSize(5).setFont('helvetica', 'bold').setTextColor(...color)
    doc.text(`${dur}d`, barX + barW / 2, chartBottom - barH - 1.5, { align: 'center' })

    // Service name below axis
    doc.setFontSize(5).setFont('helvetica', 'bold').setTextColor(30, 30, 30)
    const shortName = s.name.length > 12 ? s.name.slice(0, 11) + '..' : s.name
    doc.text(shortName, barX + barW / 2, chartBottom + 4, { align: 'center' })
  })

  // Baseline
  doc.setDrawColor(100, 100, 100)
  doc.line(chartL, chartBottom, pw - ml, chartBottom)

  // Footnote
  y = chartBottom + 14
  doc.setFontSize(6).setFont('helvetica', 'italic').setTextColor(...G)
  doc.text('* Timelines are estimates and may vary based on project complexity, feedback cycles, and scope changes.', ml, y)
  y += 6

  // Per-service stage explanations
  doc.setFontSize(9).setFont('helvetica', 'bold').setTextColor(...P)
  doc.text('Service Timeline Breakdown', ml, y)
  doc.setFillColor(...P)
  doc.rect(ml, y + 1.5, 30, 1, 'F')
  y += 6

  sorted.forEach((s, i) => {
    const dur = getServiceDuration(s.id)
    const color = ganttColors[i % ganttColors.length]
    const stages = getServiceStages(s.id, dur)

    if (y > ph - 45) { addPage(++pageN); y = 32 }

    // Service name with color dot
    doc.setFillColor(...color)
    doc.circle(ml + 2, y + 2, 1.2, 'F')
    doc.setFontSize(7).setFont('helvetica', 'bold').setTextColor(30, 30, 30)
    doc.text(`${s.name} - ${dur} day${dur > 1 ? 's' : ''}`, ml + 5, y + 2.5)
    y += 5

    // Stages in a compact format
    stages.forEach((st, si) => {
      if (y > ph - 20) { addPage(++pageN); y = 32 }
      doc.setFillColor(245, 247, 250)
      doc.roundedRect(ml + 5, y, cw - 5, 4, 0.5, 0.5, 'F')
      doc.setFontSize(5.5).setFont('helvetica', 'bold').setTextColor(...P)
      doc.text(`${si + 1}.`, ml + 8, y + 2.8)
      doc.setFontSize(5.5).setFont('helvetica', 'bold').setTextColor(30, 30, 30)
      doc.text(st.stage, ml + 12, y + 2.8)
      doc.setFontSize(5).setFont('helvetica', 'normal').setTextColor(...G)
      doc.text(st.duration, pw - ml - 5, y + 2.8, { align: 'right' })
      y += 5
    })
    y += 3
  })

  y += 2
  doc.setFontSize(6).setFont('helvetica', 'italic').setTextColor(...G)
  doc.text('* Timelines are estimates and may vary based on project complexity, feedback cycles, and scope changes.', ml, y)

  // ===== PAGE: Why The Revieree Studios =====
  addPage(++pageN)
  y = heading(32, 'Why The Revieree Studios?')
  doc.setFontSize(7.5).setFont('helvetica', 'normal').setTextColor(...G)
  const aboutText = 'The Revieree Studios is a full-service creative and technology agency partnering with businesses to build brands, create compelling content, and drive measurable growth through innovative digital solutions. Founded on the belief that great design and robust technology go hand in hand, we bring together a team of strategists, designers, developers, and marketers who are passionate about transforming ideas into impactful digital experiences.\n\nOur approach is collaborative and data-informed. We take the time to understand your business, your audience, and your goals before crafting a solution that is tailored to your needs. From brand identity and web development to performance marketing and automation, every service we offer is designed to deliver real results and long-term value for our clients.'

  const aboutLines = doc.splitTextToSize(aboutText, cw)
  coloredBox(y, aboutLines.length * 3.8 + 5)
  doc.setTextColor(...G)
  doc.setFontSize(7.5)
  aboutLines.forEach((l: string) => { doc.text(l, ml + 4, y + 3.8); y += 3.8 })
  y += 7

  // What We Do — mini service categories
  doc.setFontSize(8).setFont('helvetica', 'bold').setTextColor(...P)
  doc.text('What We Do', ml, y)
  doc.setFillColor(...P)
  doc.rect(ml, y + 1.5, 16, 0.8, 'F')
  y += 5

  const serviceCats = [
    { name: 'Branding & Identity', desc: 'Brand strategy, visual identity, logo design, brand guidelines, and positioning to establish a memorable brand presence.' },
    { name: 'Creative & Design', desc: 'Graphic design, UI/UX, presentations, video editing, motion graphics, and content creation for all digital and print media.' },
    { name: 'Web & App Development', desc: 'Custom websites, e-commerce platforms, web applications, and mobile apps built with modern technologies and best practices.' },
    { name: 'Marketing & Growth', desc: 'Performance marketing, SEO, social media management, content marketing, and lead generation strategies driven by data.' },
    { name: 'Automation & Systems', desc: 'AI solutions, workflow automation, CRM implementation, ERP systems, and technology consulting to streamline operations.' },
    { name: 'Infrastructure & Security', desc: 'Cloud architecture, DevOps, cyber security audits, network setup, and ongoing IT management for business continuity.' },
  ]
  const catCols = 2
  const catW = cw / catCols
  const catH = 15
  const startY = y
  serviceCats.forEach((c, i) => {
    const col = i % catCols
    const row = Math.floor(i / catCols)
    const cx = ml + col * catW
    const cy = startY + row * (catH + 3)
    if (cy + catH + 3 > ph - 60) return
    doc.setFillColor(...LG)
    doc.roundedRect(cx, cy, catW - 2, catH, 1, 1, 'F')
    doc.setFontSize(6.5).setFont('helvetica', 'bold').setTextColor(...P)
    doc.text(c.name, cx + 2.5, cy + 3.5)
    doc.setFontSize(6).setFont('helvetica', 'normal').setTextColor(...G)
    const cLines = doc.splitTextToSize(c.desc, catW - 7)
    cLines.forEach((l: string, li: number) => { doc.text(l, cx + 2.5, cy + 7 + li * 3) })
  })
  y = startY + 3 * (catH + 3)

  // Core values
  doc.setFontSize(8).setFont('helvetica', 'bold').setTextColor(...P)
  doc.text('Our Core Values', ml, y)
  doc.setFillColor(...P)
  doc.rect(ml, y + 1.5, 16, 0.8, 'F')
  y += 5

  const values = [
    { title: 'Creativity First', desc: 'We believe great work starts with bold ideas. Every project is approached with fresh thinking and a commitment to originality.' },
    { title: 'Technical Excellence', desc: 'Our team stays at the cutting edge of technology, ensuring every solution is built with the latest tools and best practices.' },
    { title: 'Client Partnership', desc: 'We work as an extension of your team, with transparent communication, regular updates, and a shared commitment to your success.' },
    { title: 'Results Driven', desc: 'Every strategy and deliverable is measured against clear KPIs. We create work that drives real business outcomes.' },
    { title: 'Long-Term Thinking', desc: 'We build for sustainability. From brand systems to technical architecture, every solution is designed to scale and evolve.' },
  ]
  const valCols = 2
  const valW = cw / valCols
  const valH = 11
  const valStartY = y
  values.forEach((v, i) => {
    const col = i % valCols
    const row = Math.floor(i / valCols)
    const vx = ml + col * valW
    const vy = valStartY + row * (valH + 2)
    if (vy + valH + 2 > ph - 60) return
    doc.setFillColor(245, 242, 250)
    doc.roundedRect(vx, vy, valW - 2, valH, 1, 1, 'F')
    doc.setFontSize(6.5).setFont('helvetica', 'bold').setTextColor(...P)
    doc.text(v.title, vx + 2.5, vy + 3.5)
    doc.setFontSize(5.5).setFont('helvetica', 'normal').setTextColor(...G)
    const vLines = doc.splitTextToSize(v.desc, valW - 7)
    vLines.forEach((l: string, li: number) => { doc.text(l, vx + 2.5, vy + 6.5 + li * 3) })
  })
  y = valStartY + Math.ceil(values.length / valCols) * (valH + 2) + 3

  // Stats
  doc.setDrawColor(...B).line(ml, y, pw - ml, y)
  y += 5
  const stats = [
    ['50+', 'Projects Delivered'], ['30+', 'Happy Clients'], ['6+', 'Years Experience'], ['92%', 'Client Retention']
  ]
  const sw = cw / stats.length
  stats.forEach(([num, label], i) => {
    const sx = ml + sw * i + sw / 2
    doc.setFontSize(14).setFont('helvetica', 'bold').setTextColor(...P)
    doc.text(num, sx, y, { align: 'center' })
    doc.setFontSize(6).setFont('helvetica', 'normal').setTextColor(...G)
    doc.text(label, sx, y + 5, { align: 'center' })
  })

  // ===== PAGE: Get in Touch =====
  addPage(++pageN)
  y = heading(32, 'Get in Touch')
  doc.setFontSize(7.5).setFont('helvetica', 'normal').setTextColor(...G)
  doc.text('We would love to hear from you. Reach out through any of the channels below:', ml, y)
  y += 7

  const contacts = [
    { label: 'Email', value: 'sangeeta@thereviereestudios.in', href: 'mailto:sangeeta@thereviereestudios.in' },
    { label: 'Phone', value: '+91 91564 72904', href: 'tel:+919156472904' },
    { label: 'WhatsApp', value: '+91 91564 72904', href: 'https://wa.me/919156472904' },
    { label: 'Website', value: 'www.thereviereestudios.in', href: 'https://www.thereviereestudios.in' },
    { label: 'Book a Call', value: 'Calendly - 15 min free consultation', href: 'https://calendly.com/sangeeta-thereviereestudios/build-a-brand' },
  ]

  contacts.forEach(c => {
    coloredBox(y, 9)
    doc.setFontSize(7).setFont('helvetica', 'bold').setTextColor(...P)
    doc.text(c.label, ml + 4, y + 3.8)
    doc.setFontSize(7).setFont('helvetica', 'normal').setTextColor(...PG)
    doc.textWithLink(c.value, ml + 4, y + 7.5, { url: c.href })
    y += 10.5
  })

  y += 3

  // Office hours
  coloredBox(y, 12)
  doc.setFontSize(7).setFont('helvetica', 'bold').setTextColor(...P)
  doc.text('Office Hours', ml + 4, y + 3.5)
  doc.setFontSize(6.5).setFont('helvetica', 'normal').setTextColor(...G)
  doc.text('Monday to Saturday: 10:00 AM - 7:00 PM IST', ml + 4, y + 7)
  doc.text('Sunday: Closed (available for urgent inquiries)', ml + 4, y + 10.5)
  y += 15

  // Response time
  coloredBox(y, 10)
  doc.setFontSize(7).setFont('helvetica', 'bold').setTextColor(...P)
  doc.text('Response Time', ml + 4, y + 3.5)
  doc.setFontSize(6.5).setFont('helvetica', 'normal').setTextColor(...G)
  doc.text('We typically respond within 2-4 hours during business hours.', ml + 4, y + 7)
  y += 13

  // Social
  doc.setFontSize(8).setFont('helvetica', 'bold').setTextColor(...P)
  doc.text('Follow Us', ml, y)
  doc.setFillColor(...P)
  doc.rect(ml, y + 1.5, 16, 0.8, 'F')
  y += 5

  const socials = [
    { name: 'Instagram', handle: '@thereviereestudios', url: 'https://instagram.com/thereviereestudios' },
    { name: 'LinkedIn', handle: 'The Revieree Studios', url: 'https://linkedin.com/company/thereviereestudios' },
    { name: 'Facebook', handle: 'The Revieree Studios', url: 'https://facebook.com/thereviereestudios' },
    { name: 'YouTube', handle: '@TheReviereeStudios', url: 'https://youtube.com/@TheReviereeStudios' },
  ]
  const sw2 = cw / socials.length
  socials.forEach((s, i) => {
    const sx = ml + sw2 * i + sw2 / 2
    doc.setFontSize(6).setFont('helvetica', 'bold').setTextColor(...P)
    doc.textWithLink(s.name, sx, y, { url: s.url, align: 'center' })
    doc.setFontSize(5.5).setFont('helvetica', 'normal').setTextColor(...PG)
    doc.textWithLink(s.handle, sx, y + 3.5, { url: s.url, align: 'center' })
  })

  y += 8
  doc.setFillColor(...P)
  doc.roundedRect(ml, y, cw, 12, 2, 2, 'F')
  doc.setFontSize(9).setFont('helvetica', 'bold').setTextColor(...W)
  doc.text('Ready to get started?', pw / 2, y + 5, { align: 'center' })
  doc.setFontSize(7).setFont('helvetica', 'normal').setTextColor(200, 180, 220)
  const ctaText = 'Schedule your free consultation call ->'
  const ctaW = doc.getTextWidth(ctaText)
  doc.textWithLink(ctaText, pw / 2, y + 10, { url: 'https://calendly.com/sangeeta-thereviereestudios/build-a-brand', align: 'center' })

  const filename = `revieree-proposal-${solTitle.replace(/\s+/g, '-').toLowerCase()}.pdf`
  doc.save(filename)
  return doc.output('datauristring')
}

function ServiceCard({ g, selected, onToggle }: { g: SolutionServiceGroup; selected: string[]; onToggle: (id: string) => void }) {
  if (g.subServices) return <AccordionGroup g={g} selected={selected} onToggle={onToggle} />
  const sel = selected.includes(g.id)
  return (
    <motion.div key={g.id} layout onClick={() => onToggle(g.id)}
      className={`rounded-2xl p-4 cursor-pointer border transition-all duration-200 ${sel ? 'border-purple-500 bg-purple-50/40 shadow-md shadow-purple-500/8' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
      <div className="flex items-start justify-between mb-1">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm">{g.name}</h4>
          <p className="text-xs text-gray-400 mt-0.5">{g.desc}</p>
        </div>
        <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all flex-shrink-0 ml-3 ${sel ? 'bg-red-500' : 'bg-gray-100 border border-gray-200'}`}>
          {sel ? <X className="w-3 h-3 text-white" /> : <Plus className="w-3 h-3 text-gray-300" />}
        </div>
      </div>
      <span className="text-sm font-bold">{formatINR(g.price)}</span>
    </motion.div>
  )
}

function AccordionGroup({ g, selected, onToggle }: { g: SolutionServiceGroup; selected: string[]; onToggle: (id: string) => void }) {
  const [open, setOpen] = useState(false)
  const subTotal = g.subServices!.reduce((s, sub) => s + (selected.includes(sub.id) ? sub.price : 0), 0)
  return (
    <motion.div layout className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
      <div onClick={() => setOpen(!open)} className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50/50 transition-colors">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm">{g.name}</h4>
          <p className="text-xs text-gray-400 mt-0.5">{g.desc}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-3">
          <span className={`text-[11px] font-semibold ${subTotal > 0 ? 'text-purple-deep' : 'text-gray-400'}`}>{subTotal > 0 ? formatINR(subTotal) : '—'}</span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="border-t border-gray-50">
            <div className="p-5 grid grid-cols-2 gap-3">
              {g.subServices!.map(sub => (
                <SubServiceRow key={sub.id} sub={sub} selected={selected} onToggle={onToggle} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function CustomCard({ onClick }: { onClick: () => void }) {
  return (
    <div onClick={onClick}
      className="w-full max-w-[400px] rounded-2xl p-6 cursor-pointer border-2 border-dashed border-gray-300 bg-gray-50/50 hover:border-purple-300 hover:bg-purple-50/30 transition-all duration-200 flex items-center justify-center min-h-[100px] group">
      <div className="text-center">
        <span className="text-2xl font-light text-gray-400 group-hover:text-purple-deep transition-colors">+</span>
        <p className="text-sm font-medium text-gray-500 group-hover:text-purple-deep mt-1 transition-colors">Custom Requirement</p>
      </div>
    </div>
  )
}

function CustomModal({ open, onClose, solTitle }: { open: boolean; onClose: () => void; solTitle: string }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', requirement: '' })
  const [sent, setSent] = useState(false)
  if (!open) return null
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, type: 'custom-request', solution: solTitle }),
    })
    setSent(true)
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onClick={e => e.stopPropagation()}
        className="bg-white rounded-[24px] p-8 w-full max-w-md shadow-2xl">
        <h3 className="text-xl font-bold mb-1">{solTitle}</h3>
        <p className="text-sm text-gray-400 mb-6">Tell us about your custom requirement.</p>
        {sent ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3"><Check className="w-6 h-6 text-green-600" /></div>
            <p className="font-semibold">Request Submitted!</p>
            <p className="text-sm text-gray-400 mt-1">We'll get back to you within 24 hours.</p>
            <button onClick={onClose} className="mt-6 px-5 py-2 text-sm font-semibold text-white gradient-primary rounded-full">Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input required placeholder="Your Name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100" />
            <input required type="email" placeholder="Email Address" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100" />
            <input placeholder="Phone Number (optional)" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100" />
            <textarea required rows={4} placeholder="Describe your custom requirement..." value={form.requirement} onChange={e => setForm(p => ({ ...p, requirement: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 resize-none" />
            <button type="submit" className="w-full py-2.5 text-sm font-semibold text-white gradient-primary rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all">Submit Request</button>
          </form>
        )}
      </motion.div>
    </div>
  )
}

function SubServiceRow({ sub, selected, onToggle, slug: solSlug }: { sub: SubService; selected: string[]; onToggle: (id: string) => void; slug?: string }) {
  const sel = selected.includes(sub.id)
  if (sub.price === 0) {
    return (
      <div onClick={() => window.open('https://calendly.com/sangeeta-thereviereestudios/build-a-brand', '_blank')}
        className="p-3 rounded-xl cursor-pointer transition-all hover:bg-gray-50 border border-dashed border-purple-200 bg-purple-50/20 group">
        <div className="flex items-start gap-2.5">
          <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 mt-0.5 bg-purple-100">
            <Zap className="w-2.5 h-2.5 text-purple-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-purple-700 truncate">{sub.name}</span>
              <span className="text-[9px] font-semibold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full flex-shrink-0 group-hover:bg-purple-200 transition-colors">Schedule Call</span>
            </div>
            <p className="text-[10px] text-gray-400 leading-tight mt-0.5">{sub.desc}</p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div onClick={() => onToggle(sub.id)}
      className={`p-3 rounded-xl cursor-pointer transition-all hover:bg-gray-50 border ${sel ? 'bg-purple-50/60 border-purple-200/40' : 'bg-white border-gray-50'}`}>
      <div className="flex items-start gap-2.5">
        <div onClick={e => { e.stopPropagation(); onToggle(sub.id) }} className={`w-4 h-4 rounded flex items-center justify-center transition-all flex-shrink-0 mt-0.5 ${sel ? 'bg-red-500' : 'bg-gray-100 border border-gray-200'}`}>
          {sel ? <X className="w-2.5 h-2.5 text-white" /> : <Plus className="w-2.5 h-2.5 text-gray-300" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-gray-700 truncate">{sub.name}</span>
            <span className="text-xs font-bold flex-shrink-0">{formatINR(sub.price)}</span>
          </div>
          <p className="text-[10px] text-gray-400 leading-tight mt-0.5">{sub.desc}</p>
        </div>
      </div>
    </div>
  )
}

function ContinueModal({ open, onClose, solTitle, selectedPlans, allPlanPrices, planPrice, clientName, clientEmail, clientPhone, companyName }: { open: boolean; onClose: () => void; solTitle: string; selectedPlans: Array<{slug: string; name: string}>; allPlanPrices: number; planPrice: number; clientName: string; clientEmail: string; clientPhone: string; companyName: string }) {
  const [sent, setSent] = useState(false)
  const planLabel = selectedPlans.map(sp => sp.name).join(' + ')
  if (!open) return null
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: clientName, email: clientEmail, phone: clientPhone, company: companyName, type: 'booking', solution: solTitle, plan: planLabel, budget: formatINR(planPrice) }),
    })
    setSent(true)
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onClick={e => e.stopPropagation()}
        className="bg-white rounded-[24px] p-8 w-full max-w-md shadow-2xl">
        <h3 className="text-xl font-bold mb-1">Book Your Project</h3>
        <p className="text-sm text-gray-400 mb-2">You selected: <strong>{planLabel}</strong>{selectedPlans.length > 1 ? ' plans' : ' plan'}.</p>
        <p className="text-sm text-gray-400 mb-6">Fill in your details and schedule a call with us.</p>
        {sent ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3"><Check className="w-6 h-6 text-green-600" /></div>
            <p className="font-semibold">Details Submitted!</p>
            <p className="text-sm text-gray-400 mt-1 mb-4">Now schedule a call with our team.</p>
            <a href="https://calendly.com/sangeeta-thereviereestudios/build-a-brand" target="_blank" rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 text-sm font-semibold text-white gradient-primary rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all">Schedule a Call</a>
            <button onClick={onClose} className="block mx-auto mt-3 text-xs text-gray-400 hover:text-gray-600">Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="bg-purple-50 rounded-xl p-3 space-y-1 text-left">
              <p className="text-xs text-gray-500"><span className="font-medium text-gray-700">Name:</span> {clientName}</p>
              <p className="text-xs text-gray-500"><span className="font-medium text-gray-700">Email:</span> {clientEmail}</p>
              <p className="text-xs text-gray-500"><span className="font-medium text-gray-700">Phone:</span> {clientPhone}</p>
              {companyName && <p className="text-xs text-gray-500"><span className="font-medium text-gray-700">Company:</span> {companyName}</p>}
            </div>
            <div className="bg-purple-50 rounded-xl p-3 text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-wide">{planLabel} Plan</p>
              <p className="text-lg font-extrabold gradient-text">{formatINR(planPrice)}</p>
            </div>
            <button type="submit" className="w-full py-2.5 text-sm font-semibold text-white gradient-primary rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all">Submit & Schedule Call</button>
          </form>
        )}
      </motion.div>
    </div>
  )
}

function QuoteNameModal({ open, onClose, onConfirm, clientName, companyName, clientEmail, clientPhone, setClientName, setCompanyName, setClientEmail, setClientPhone, accountExists }: {
  open: boolean; onClose: () => void; onConfirm: () => void;
  clientName: string; companyName: string; clientEmail: string; clientPhone: string;
  setClientName: (v: string) => void; setCompanyName: (v: string) => void; setClientEmail: (v: string) => void; setClientPhone: (v: string) => void;
  accountExists: { exists: boolean; email: string } | null
}) {
  if (!open) return null
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)
  const phoneValid = /^\d{10}$/.test(clientPhone)
  const valid = clientName.trim() && emailValid && phoneValid
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onClick={e => e.stopPropagation()}
        className="bg-white rounded-[24px] p-8 w-full max-w-md shadow-2xl">
        <h3 className="text-xl font-bold mb-1">Client Details</h3>
        <p className="text-sm text-gray-400 mb-6">Enter your details to generate the proposal.</p>
        <div className="flex flex-col gap-3">
          <div>
            <input required placeholder="Your Name" value={clientName} onChange={e => setClientName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100" />
            {clientName && clientName.trim().length < 2 && <p className="text-[10px] text-red-500 mt-1">Please enter a valid name</p>}
          </div>
          <div>
            <input required type="email" placeholder="Email Address" value={clientEmail} onChange={e => setClientEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100" />
            {clientEmail && !emailValid && <p className="text-[10px] text-red-500 mt-1">Please enter a valid email address</p>}
          </div>
          <div>
            <input required placeholder="Phone Number" value={clientPhone} onChange={e => setClientPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100" />
            {clientPhone && !phoneValid && <p className="text-[10px] text-red-500 mt-1">Phone must be exactly 10 digits</p>}
            {accountExists?.exists && (
              <p className="text-[10px] text-amber-700 bg-amber-50 rounded-lg px-2 py-1.5 mt-1">
                Account exists with this name & phone. <a href="/partner/login" className="font-semibold underline">Login to track</a> — your new quote will link automatically.
              </p>
            )}
          </div>
          <input placeholder="Company Name (optional)" value={companyName} onChange={e => setCompanyName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100" />
          {!valid && <p className="text-[10px] text-gray-400 text-center">Fill all required fields correctly to generate the proposal</p>}
          <button onClick={() => { if (valid) onConfirm() }} disabled={!valid}
            className="w-full py-2.5 text-sm font-semibold text-white gradient-primary rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50">Generate Proposal</button>
        </div>
      </motion.div>
    </div>
  )
}

export default function SolutionClient({ slug }: { slug: string }) {
  const sol = solutions.find(s => s.slug === slug) || solutions[0]
  const packages = solutionPackages[slug] || defaultPackages
  const tree = solutionServiceTree[slug]
  const [selected, setSelected] = useState<string[]>(() => {
    try { const v = localStorage.getItem('trs_selected'); return v ? JSON.parse(v) : [] } catch { return [] }
  })
  const [selectedPlans, setSelectedPlans] = useState<Array<{slug: string; name: string}>>(() => {
    try { const v = localStorage.getItem('trs_plans'); return v ? JSON.parse(v) : [] } catch { return [] }
  })
  const [customOpen, setCustomOpen] = useState(false)
  const [continueOpen, setContinueOpen] = useState(false)
  const [negotiateOpen, setNegotiateOpen] = useState(false)
  const [negotiatePrice, setNegotiatePrice] = useState(0)
  const [quoteNameOpen, setQuoteNameOpen] = useState(false)
  const [continueAfterQuote, setContinueAfterQuote] = useState(false)
  const [clientName, setClientName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientPhone, setClientPhone] = useState('')

  // Track page view
  useEffect(() => {
    fetch('/api/track-view', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ page: 'solution', slug }) }).catch(() => {})
  }, [slug])

  // Pre-fill from partner login
  const [accountExists, setAccountExists] = useState<{ exists: boolean; email: string } | null>(null)
  useEffect(() => {
    fetch('/api/partner/me').then(r => r.json()).then(d => {
      if (d.loggedIn) {
        setClientName(d.name)
        setClientEmail(d.email || '')
        setClientPhone(d.phone)
      }
    }).catch(() => {})
  }, [])

  // Debounced account check
  useEffect(() => {
    if (!clientName.trim() || clientPhone.length !== 10) { setAccountExists(null); return }
    const timer = setTimeout(() => {
      fetch('/api/partner/check', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: clientName.trim(), phone: clientPhone }) })
        .then(r => r.json()).then(d => setAccountExists(d.exists ? { exists: true, email: d.email } : { exists: false, email: '' })).catch(() => {})
    }, 800)
    return () => clearTimeout(timer)
  }, [clientName, clientPhone])

  const toggle = useCallback((id: string) => {
    const info = getServiceInfo(id)
    if (info && info.price === 0) return
    setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])
  }, [])
  // Persist selected services and plans across page navigation
  useEffect(() => { try { localStorage.setItem('trs_selected', JSON.stringify(selected)) } catch {} }, [selected])
  useEffect(() => { try { localStorage.setItem('trs_plans', JSON.stringify(selectedPlans)) } catch {} }, [selectedPlans])
  const quote = calcQuote(selected)

  // Helpers for multi-solution plans
  const currentPlan = selectedPlans.find(p => p.slug === slug)?.name || ''
  const allPlanPrices = selectedPlans.reduce((sum, sp) => {
    const solPkgs = solutionPackages[sp.slug] || defaultPackages
    return sum + (solPkgs.find(p => p.name === sp.name)?.price || 0)
  }, 0)
  const hasAnyPlan = selectedPlans.length > 0
  const gstOnTotal = hasAnyPlan ? Math.round((allPlanPrices + quote.subtotal) * 0.18) : 0
  const totalPrice = hasAnyPlan ? (allPlanPrices + quote.subtotal + gstOnTotal) : quote.total
  const servicesPortion = quote.subtotal
  const minPrice = hasAnyPlan ? Math.round(servicesPortion * 0.8) : Math.round(totalPrice * 0.8)
  const maxPrice = hasAnyPlan ? servicesPortion : totalPrice

  const handleDownloadQuote = async () => {
    const serviceNames = selectedInQuote.map(s => s.name)
    const combinedTitle = serviceNames.length === 1 ? serviceNames[0]
      : serviceNames.length === 2 ? serviceNames.join(' & ')
      : serviceNames.length > 2 ? serviceNames.slice(0, 2).join(' & ') + ' & more'
      : sol.title
    const pdfDataUrl = await downloadQuote(selectedInQuote, quote, selectedPlans, allPlanPrices, totalPrice, combinedTitle, clientName, companyName, slug, clientEmail, clientPhone)
    setQuoteNameOpen(false)

    // Save quote to backend (Google Sheets + local JSON)
    const quotePayload = {
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      company: companyName,
      solution: sol.title,
      plan: selectedPlans.map(sp => sp.name).join(' + '),
      planPrice: allPlanPrices,
      services: selectedInQuote,
      servicesSubtotal: quote.subtotal,
      discount: quote.discount || 0,
      gst: quote.gst || 0,
      total: totalPrice,
      proposalPdf: pdfDataUrl,
    }
    try {
      await fetch('/api/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(quotePayload) })
    } catch { /* non-critical */ }

    if (continueAfterQuote) {
      setContinueAfterQuote(false)
      setContinueOpen(true)
    }
  }

  if (!tree) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 py-24 text-center">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-gray-600 mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
        <div className="max-w-md mx-auto">
          <h1 className="text-[40px] font-extrabold tracking-[-.03em] mb-4">Coming Soon</h1>
          <p className="text-gray-400 mb-8">We're adding services for this solution. Check back soon.</p>
          <Link href="/" className="inline-block px-6 py-2.5 text-sm font-semibold text-white gradient-primary rounded-full">Browse other solutions →</Link>
        </div>
      </div>
    )
  }

  const selectedInQuote = selected.map(id => { const info = getServiceInfo(id); return info ? { id, ...info } : null }).filter(Boolean) as { id: string; name: string; price: number }[]

  const recs = tree.flatMap(g => {
    if (g.subServices) return g.subServices.filter(s => s.price !== 0 && !selected.includes(s.id))
    return g.price !== 0 && !selected.includes(g.id) ? [g] : []
  })

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-gray-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${sol.color} flex items-center justify-center`}>{icons[slug] || <HelpCircle />}</div>
              <div>
                <h1 className="text-[40px] md:text-[48px] font-extrabold tracking-[-.03em] leading-tight">{sol.title}</h1>
                <p className="text-gray-400">{sol.desc}</p>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-1.5 mb-8 mt-6">
            {['Choose', 'Customize', 'Review', 'Proposal'].map((s, i) => (
              <div key={s} className="flex items-center gap-1.5 flex-1">
                <div className={`flex-1 h-1.5 rounded-full ${i === 0 ? 'gradient-primary' : i < 1 ? 'bg-purple-200' : 'bg-gray-100'}`} />
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-2.5 mb-6">
            {tree.map(g => g.subServices
              ? <div key={g.id} className="md:col-span-2"><AccordionGroup g={g} selected={selected} onToggle={toggle} /></div>
              : <ServiceCard key={g.id} g={g} selected={selected} onToggle={toggle} />
            )}
            <div className="md:col-span-2 flex justify-center"><CustomCard onClick={() => setCustomOpen(true)} /></div>
          </div>

          {recs.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {recs.slice(0, 3).map(s => (
                <button key={s.id} onClick={() => toggle(s.id)}
                  className="px-4 py-2 bg-white border border-dashed border-gray-300 rounded-full text-xs font-medium text-gray-500 hover:border-purple-300 hover:text-purple-deep hover:bg-purple-50/50 transition-all flex items-center gap-1.5">
                  + {s.name}
                </button>
              ))}
            </div>
          )}

          {packages.length > 0 && (
            <>
              <h3 className="text-lg font-bold mb-4">Choose a Package</h3>
              <div className="grid md:grid-cols-3 gap-3 mb-12">
                {packages.map(p => {
                  const onThisPage = currentPlan === p.name
                  return (
                    <motion.div key={p.name} whileHover={{ y: -3 }} onClick={() => setSelectedPlans(prev => {
                      if (onThisPage) return prev.filter(x => !(x.slug === slug))
                      return [...prev.filter(x => x.slug !== slug), { slug, name: p.name }]
                    })}
                      className={`rounded-2xl p-5 border-2 cursor-pointer transition-all relative ${onThisPage ? 'border-purple-500 bg-purple-50/30' : 'border-gray-100 bg-white'} ${p.popular ? 'shadow-lg shadow-purple-500/8' : ''}`}>
                      {p.popular && <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 gradient-primary text-[9px] font-bold text-white px-3 py-1 rounded-full whitespace-nowrap">Most Popular</div>}
                      <h4 className="font-bold text-base mb-0.5 mt-1.5">{p.name} <span className="text-gray-400 font-normal text-sm">{sol.title}</span></h4>
                      <div className="text-xl font-extrabold gradient-text mb-3">{formatINR(p.price)}</div>
                      <ul className="space-y-1.5 mb-4">{p.features.map(f => <li key={f} className={`flex items-center gap-1.5 text-xs ${f === 'Choose any one:' ? 'text-gray-400 font-semibold' : 'text-gray-500'}`}>{f !== 'Choose any one:' && <Check className="w-3 h-3 text-green-500 flex-shrink-0" />}{f === 'Choose any one:' && <span className="w-3 h-3 flex-shrink-0" />}{f}</li>)}</ul>
                      <button className={`w-full py-2 text-xs font-semibold rounded-full transition-all ${onThisPage ? 'gradient-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{onThisPage ? 'Selected' : 'Choose'} {p.name}</button>
                    </motion.div>
                  )
                })}
              </div>
            </>
          )}

          <div className="mb-12">
            <h3 className="text-lg font-bold mb-4">Explore other services</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {solutions.filter(s => s.slug !== slug).map(c => (
                <Link key={c.slug} href={`/solutions/${c.slug}`}
                  className="group block bg-white border border-gray-100 rounded-2xl p-4 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-500/6 transition-all duration-200 hover:-translate-y-0.5">
                  <div className="w-8 h-8 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center mb-2.5">
                    {c.slug === 'build-brand' ? <Palette className="w-4 h-4" /> : c.slug === 'post-production' ? <Clapperboard className="w-4 h-4" /> : c.slug === 'creative-services' ? <Image className="w-4 h-4" /> : c.slug === 'print-packaging' ? <Printer className="w-4 h-4" /> : c.slug === 'generate-leads' ? <TrendingUp className="w-4 h-4" /> : c.slug === 'build-website' ? <Globe className="w-4 h-4" /> : c.slug === 'automate-business' ? <Bot className="w-4 h-4" /> : c.slug === 'build-product' ? <Package className="w-4 h-4" /> : c.slug === 'core-systems' ? <Settings className="w-4 h-4" /> : <HelpCircle className="w-4 h-4" />}
                  </div>
                  <h4 className="text-xs font-bold mb-0.5 text-gray-800 group-hover:text-purple-deep transition-colors">{c.title}</h4>
                  <p className="text-[10px] text-gray-400">{c.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-[100px] bg-white rounded-[24px] shadow-soft border border-gray-100 p-6">
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-[.15em] mb-4">Your Quote</div>
              <div className="space-y-0 mb-4">
              {selectedPlans.map(sp => {
                const solTitle = solutions.find(s => s.slug === sp.slug)?.title || sp.slug
                const solPkgs = solutionPackages[sp.slug] || defaultPackages
                const spPrice = solPkgs.find(p => p.name === sp.name)?.price || 0
                return (
                  <div key={sp.slug} className="flex justify-between items-center py-2.5 border-b border-gray-50 group">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <button onClick={() => setSelectedPlans(prev => prev.filter(x => !(x.slug === sp.slug)))} className="w-4 h-4 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center flex-shrink-0 transition-colors opacity-0 group-hover:opacity-100"><X className="w-2.5 h-2.5 text-red-500" /></button>
                      <span className="text-xs font-semibold text-gray-900">{sp.name} ({solTitle})</span>
                    </div>
                    <span className="text-xs font-bold">{formatINR(spPrice)}</span>
                  </div>
                )
              })}
              {selectedInQuote.map(s => (
                <div key={s.id} className="flex justify-between items-center py-2 border-b border-gray-50/50 last:border-0 group">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <button onClick={() => toggle(s.id)} className="w-4 h-4 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center flex-shrink-0 transition-colors opacity-0 group-hover:opacity-100"><X className="w-2.5 h-2.5 text-red-500" /></button>
                    <span className="text-[10px] text-gray-500 truncate">{s.name}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 flex-shrink-0">{formatINR(s.price)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-1 mb-5 pt-3 border-t border-gray-100">
              {hasAnyPlan && <div className="flex justify-between items-center py-2 text-xs"><span className="font-semibold text-gray-900">Total plans</span><span className="font-bold">{formatINR(allPlanPrices)}</span></div>}
              <div className="flex justify-between text-xs text-gray-400"><span>Selected services</span><span>{formatINR(quote.subtotal)}</span></div>
              {!hasAnyPlan && quote.discount > 0 && <div className="flex justify-between text-[10px] text-green-600"><span>Discount (10%)</span><span>-{formatINR(quote.discount)}</span></div>}
              {hasAnyPlan && <div className="flex justify-between text-[10px] text-gray-400"><span>GST (18%)</span><span>{formatINR(gstOnTotal)}</span></div>}
              {!hasAnyPlan && <div className="flex justify-between text-[10px] text-gray-400"><span>GST (18%)</span><span>{formatINR(quote.gst)}</span></div>}
              <div className="flex justify-between text-base font-extrabold pt-2 border-t border-gray-200"><span>Total</span><span className="gradient-text">{formatINR(totalPrice)}</span></div>
            </div>

            {negotiateOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-4 p-3 rounded-xl bg-orange-50 border border-orange-200">
                <p className="text-[10px] font-semibold text-orange-700 mb-2">{hasAnyPlan ? `Suggest a price for extra services (plans: ${formatINR(allPlanPrices)} total)` : 'Suggest your price (min 20% off)'}</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => setNegotiatePrice(p => Math.max(minPrice, p - 1000))} className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0"><Minus className="w-3 h-3" /></button>
                  <div className="flex-1 text-center">
                    <span className="text-sm font-extrabold text-orange-700">{formatINR(negotiatePrice)}</span>
                    {hasAnyPlan && <p className="text-[9px] text-orange-500/70">Total: {formatINR(allPlanPrices + negotiatePrice)}</p>}
                  </div>
                  <button onClick={() => setNegotiatePrice(p => Math.min(maxPrice, p + 1000))} className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0"><Plus className="w-3 h-3" /></button>
                </div>
                <input type="range" min={minPrice} max={maxPrice} step={500} value={negotiatePrice} onChange={e => setNegotiatePrice(Number(e.target.value))}
                  className="w-full mt-2 accent-orange-500" />
                <div className="flex justify-between text-[9px] text-gray-400 mt-0.5">
                  <span>{formatINR(minPrice)}{hasAnyPlan ? ` (+ plans ${formatINR(allPlanPrices)})` : ''}</span>
                  <span>{formatINR(maxPrice)}{hasAnyPlan ? ` (+ plans ${formatINR(allPlanPrices)})` : ''}</span>
                </div>
                <button onClick={() => {
                  setNegotiateOpen(false)
                  const negotiatedTotal = hasAnyPlan ? allPlanPrices + negotiatePrice : negotiatePrice
                  window.open(`https://wa.me/919156472904?text=I'd%20like%20to%20negotiate%20the%20price%20to%20${encodeURIComponent(formatINR(negotiatedTotal))}%20for%20${encodeURIComponent(sol.title)}`, '_blank')
                  fetch('/api/negotiations', {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: clientName || 'Unknown', email: clientEmail || '', phone: clientPhone || '', solution: sol.title, plan: selectedPlans.map(sp => sp.name).join(' + '), original_total: totalPrice, negotiated_total: negotiatedTotal })
                  }).catch(() => {})
                }} className="w-full mt-2 py-1.5 text-[10px] font-semibold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all">Send via WhatsApp</button>
              </motion.div>
            )}

            <div className="space-y-2">
              <button onClick={() => { setNegotiatePrice(hasAnyPlan ? servicesPortion : totalPrice); setContinueAfterQuote(true); setQuoteNameOpen(true) }} className="w-full py-2.5 text-xs font-semibold text-white gradient-primary rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Continue</button>
              <button onClick={() => { setNegotiatePrice(hasAnyPlan ? servicesPortion : totalPrice); setNegotiateOpen(o => !o) }} className="w-full py-2.5 text-xs font-semibold text-gray-600 border border-gray-200 rounded-full hover:bg-gray-50 transition-all">Negotiate{hasAnyPlan ? ' services' : ''}</button>
              <div className="flex gap-1.5 pt-1">
                <a href={`https://wa.me/919156472904?text=I'm%20interested%20in%20${encodeURIComponent(sol.title)}%20(${encodeURIComponent(selectedPlans.map(sp => `${sp.name}`).join(' + ') || 'No plan')}%20-%20${encodeURIComponent(formatINR(totalPrice))})`} target="_blank" rel="noopener noreferrer"
                  className="flex-1 py-2 text-[10px] font-medium text-white bg-green-500 rounded-full hover:bg-green-600 transition-all flex items-center justify-center gap-1"><MessageCircle className="w-3 h-3" /> WhatsApp</a>
                <a href="tel:+919156472904"
                  className="flex-1 py-2 text-[10px] font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-all flex items-center justify-center gap-1"><Phone className="w-3 h-3" /> Call</a>
                <a href={`mailto:sangeeta@thereviereestudios.in?subject=${encodeURIComponent(sol.title)}%20-%20${encodeURIComponent(selectedPlans.map(sp => `${sp.name}`).join('+'))}%20Plan&body=I'm%20interested%20in%20the%20${encodeURIComponent(selectedPlans.map(sp => `${sp.name}`).join(' + '))}%20(${encodeURIComponent(formatINR(totalPrice))})%20for%20${encodeURIComponent(sol.title)}`}
                  className="flex-1 py-2 text-[10px] font-medium text-white bg-red-500 rounded-full hover:bg-red-600 transition-all flex items-center justify-center gap-1"><Mail className="w-3 h-3" /> Email</a>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
              <p className="text-[10px] text-gray-400 mb-1.5">Need help choosing?</p>
              <a href="https://calendly.com/sangeeta-thereviereestudios/build-a-brand" target="_blank" rel="noopener noreferrer"
                className="text-[11px] font-semibold text-purple-deep hover:underline">Schedule a free call →</a>
            </div>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} className="gradient-primary rounded-[32px] p-12 md:p-14 text-center mt-8">
        <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Ready to build?</h3>
        <p className="text-white/60 mb-6 max-w-[440px] mx-auto text-sm">Save your quote or continue to get a full proposal.</p>
        <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => { setContinueAfterQuote(false); setQuoteNameOpen(true) }} className="px-6 py-2.5 text-sm font-semibold text-purple-deep bg-white rounded-full inline-flex items-center gap-1.5"><Download className="w-4 h-4" /> Save Quote</button>
          <button onClick={() => { setNegotiatePrice(totalPrice); setContinueAfterQuote(true); setQuoteNameOpen(true) }} className="px-6 py-2.5 text-sm font-semibold text-white border-2 border-white/30 rounded-full">Continue →</button>
        </div>
      </motion.div>
      <QuoteNameModal open={quoteNameOpen} onClose={() => setQuoteNameOpen(false)} onConfirm={handleDownloadQuote}
        clientName={clientName} companyName={companyName} clientEmail={clientEmail} clientPhone={clientPhone}
        setClientName={setClientName} setCompanyName={setCompanyName} setClientEmail={setClientEmail} setClientPhone={setClientPhone}
        accountExists={accountExists} />
      <CustomModal key={String(customOpen)} open={customOpen} onClose={() => setCustomOpen(false)} solTitle={sol.title} />
      <ContinueModal key={String(continueOpen)} open={continueOpen} onClose={() => setContinueOpen(false)} solTitle={sol.title} selectedPlans={selectedPlans} allPlanPrices={allPlanPrices} planPrice={totalPrice}
        clientName={clientName} clientEmail={clientEmail} clientPhone={clientPhone} companyName={companyName} />
    </div>
  )
}