import Topbar from './components/Topbar.jsx';
import SideIndex from './components/SideIndex.jsx';
import Hero from './components/Hero.jsx';
import Profile from './components/Profile.jsx';
import Work from './components/Work.jsx';
import Practice from './components/Practice.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';

export default function App() {
  return (
    <>
      <Topbar />
      <SideIndex />
      <main id="top">
        <Hero />
        <Profile />
        <Work />
        <Practice />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
