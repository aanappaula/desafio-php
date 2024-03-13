import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";


function NavBar() {
  return (
    <Navbar  expand="lg" className="navBar">
      <Container>
        <Navbar.Toggle className="bg-dark" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse  id="basic-navbar-nav">
          <Nav className="links">
          <NavLink  className="text-white m-3" style={{ textDecoration: 'none' }} to="/" >Suite Store</NavLink>
            <NavLink className="text-white m-3" style={{ textDecoration: 'none' }} to="/product">Products</NavLink>
            <NavLink className="text-white m-3" style={{ textDecoration: 'none' }} to="/category">Category</NavLink>
            <NavLink className="text-white m-3" style={{ textDecoration: 'none' }} to="/history">History</NavLink>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
