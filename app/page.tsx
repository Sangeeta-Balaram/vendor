import HeroSection from '@/components/HeroSection'
import SolutionCards from '@/components/SolutionCards'
import QuoteBuilder from '@/components/QuoteBuilder'
import DifferentiatorSection from '@/components/DifferentiatorSection'
import ProcessTimeline from '@/components/ProcessTimeline'
import TrustSection from '@/components/TrustSection'
import CTASection from '@/components/CTASection'
import ContactSection from '@/components/ContactSection'
import ViewTracker from '@/components/ViewTracker'

export default function Home() {
  return (
    <>
      <ViewTracker page="home" />
      <HeroSection />
      <SolutionCards />
      <QuoteBuilder />
      <DifferentiatorSection />
      <ProcessTimeline />
      <TrustSection />
      <CTASection />
      <ContactSection />
    </>
  )
}
