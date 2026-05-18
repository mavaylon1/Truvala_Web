import IntroOverlay from './components/IntroOverlay'
import SmoothScroller from './components/SmoothScroller'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Features from './components/Features'
import Demo from './components/Demo'
import { DecisionConfidenceSection, NextStepsSection } from './components/DecisionSections'
import Partner from './components/Partner'
import CTA from './components/CTA'

export default function Home() {
  return (
    <>
    <IntroOverlay />
    <SmoothScroller>
      <Navbar />
      <Hero />
      <Problem />
      <Features />
      <Demo />
      <DecisionConfidenceSection />
      <NextStepsSection />
      <Partner />
      <CTA />
    </SmoothScroller>
    </>
  )
}
