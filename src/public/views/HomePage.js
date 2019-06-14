import React, { 
  Component
 } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom'
import ApplicationRouter from '../components/ApplicationRouter'
import { 
  Navbar,
  Image
} from 'react-bootstrap';
import Logo from './logo.png'


class HomePage extends Component {  
  
  render() {
    console.log(__dirname);
    return (
      <div>
        <Navbar bg="light" fixed="top">
          <Navbar.Brand>
            <Link to='/'><Image height="25px"src={Logo} /></Link>
          </Navbar.Brand>
        </Navbar>
        <ApplicationRouter />
      </div>
    );
  }
}

export default HomePage;

