import React from 'react';
import NavBar from './components/NavBar';
import Guide from './components/Guide';
import Footer from './components/Footer';

import './App.css'; // Import your main CSS file where the Flexbox rules are defined

function App() {
  return (
    <div className="page-container"> {/* Add the page container */}
      <NavBar />
      <div className="content-wrapper"> {/* Add content wrapper */}
        <Guide />
      </div>
      <Footer />
    </div>
  );
}

export default App;