import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";


function NavBar() {
  return (
    <Navbar color='danger'expand="lg"className="navBar">
      <Container>
        <Navbar.Brand className="text-white" href="#home">Suite Store</Navbar.Brand>
        <Navbar.Toggle className="bg-dark" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse  id="basic-navbar-nav">
          <Nav className="links">
          <NavLink  className="text-white m-3" style={{ textDecoration: 'none' }} to="/" >Home</NavLink>
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
<style>
    
</style>