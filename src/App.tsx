import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";
import Blob from './components/blob/Blob.tsx'
import ProgBar from './components/progBar/ProgBar.tsx'
import { useRef,useEffect,useState } from 'react';
import { config } from "./constants/config";

const App = () => {
  

  useEffect(() => {
    if (document.title !== config.html.title) {
      document.title = config.html.title;
    }
  }, []);

  return (
    <div>
    <Blob/>
    <ProgBar scrollY={scrollY} />

    <BrowserRouter>

      <div className="bg-primary relative z-0">

        <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
          <Navbar />
          <Hero />

        </div>
        <About />
        <Experience />
        <Tech />
        <Works />

        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
    </div>

  );
};

export default App;
