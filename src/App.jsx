import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBanner from './components/TrustBanner'
import Services from './components/Services'
import About from './components/About'
import CTA from './components/CTA'
import Footer from './components/Footer'
import FAQs from './pages/FAQs'
import AboutPage from './pages/AboutPage'
import ElectricalServices from './pages/ElectricalServices'
import SolarInstallation from './pages/SolarInstallation'
import PowerTools from './pages/PowerTools'
import VegetationServices from './pages/VegetationServices'
import Contact from './pages/Contact'

function LandingPage() {
  return (
    <>
      <Hero />
      <TrustBanner />
      <Services />
      <About />
      <TrustBanner />
      <CTA />
    </>
  )
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services/electrical" element={<ElectricalServices />} />
        <Route path="/services/solar" element={<SolarInstallation />} />
        <Route path="/services/power-tools" element={<PowerTools />} />
        <Route path="/services/vegetation" element={<VegetationServices />} />
      </Routes>
      <Footer />
    </div>
  )
}