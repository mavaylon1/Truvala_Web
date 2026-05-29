import IntroOverlay from './components/IntroOverlay'
import SmoothScroller from './components/SmoothScroller'
import CountdownHero from './components/CountdownHero'
import WhatIsSection from './components/WhatIsSection'
import WhoWeAreSection from './components/WhoWeAreSection'
import UpcomingSection from './components/UpcomingSection'

export default function Home() {
  return (
    <>
      <IntroOverlay />
      <SmoothScroller>
        <CountdownHero />
        <WhatIsSection />
        <WhoWeAreSection />
        <UpcomingSection />
      </SmoothScroller>
    </>
  )
}
