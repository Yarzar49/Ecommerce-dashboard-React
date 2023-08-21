// import React from "react";
// import {
//   Badge,
//   Button,
//   Container,
//   Dropdown,
//   Form,
//   Nav,
//   Navbar,
// } from "react-bootstrap";
// import { FaShoppingCart } from "react-icons/fa";
// import { Link} from "react-router-dom";

// const Header = () => {
//   return (
//     <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
//       <Container>
//         <Navbar.Brand>
//           <Link to="/">Shopping Cart</Link>
//         </Navbar.Brand>
//         <Navbar.Text className="search">
//           <Form.Control
//             style={{ width: 500 }}
//             placeholder="Search a product"
//             className="m-auto"
//           />
//         </Navbar.Text>
//         <Nav>
//           <Dropdown align={{lg: 'start'}}>
//             <Dropdown.Toggle variant="success">
//               <FaShoppingCart color="white" fontSize="25px" />
//               <Badge bg="none">{10}</Badge>
//             </Dropdown.Toggle>
//             <Dropdown.Menu style={{ minWidth: 370 }}>
//               <span style={{ padding: 10 }}>Cart is Empty!</span>
//             </Dropdown.Menu>
//           </Dropdown>
//         </Nav>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;

import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  let user = JSON.parse(localStorage.getItem('user-info'));
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate('/register');
  }
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">E-Commerce Dashboard</Navbar.Brand>
          <Nav className="me-auto navbar_wrapper">
            {
              localStorage.getItem('user-info') ?
              <>
              <Link to="/">Product List</Link>
              <Link to="/add">Add Products</Link>             
              </> :
              <>
                 <Link to="/login">Login</Link> 
                 <Link to="/register">Register</Link>     
              </>
            }      
          </Nav>
        </Container>
        <Nav>
          {localStorage.getItem('user-info') ?
          <NavDropdown title={user && user.name} className='me-5'>
            <NavDropdown.Item onClick={logOut}>
              Logout
            </NavDropdown.Item>
         </NavDropdown> :
         null


          }
            
        </Nav>
      </Navbar>
    </div>
  )
}

export default Header
