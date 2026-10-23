import { Link, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollManager from './components/ScrollManager'
import About from './pages/About'
import Donate from './pages/Donate'
import DonateComplete from './pages/DonateComplete'
import Home from './pages/Home'

function NotFound() {
  return (
    <section className="section">
      <div className="container narrow">
        <h1 className="h2-size">We could not find that page.</h1>
        <p className="prose">The link may be old or mistyped. Try the home page instead.</p>
        <Link to="/" className="btn btn-primary">Go to the foundation</Link>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/donate/complete" element={<DonateComplete />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
