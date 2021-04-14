import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Container } from 'react-bootstrap';


// Components
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';

function App() {
  return (
    <Router>
      <Header/>
      <main>
        <Container className="py-3">
          <Route path="/" exact component={ HomeScreen } />
          <Route path="/product/:id" component={ ProductScreen } />
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
