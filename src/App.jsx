
import Header from './components/Header';
import Main from './components/Main';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Projects from './components/Projects';
import './App.css'; // You can style custom elements here


function App() {
  return (
    <div className="App">
      <Header />
      <Main />
    
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;