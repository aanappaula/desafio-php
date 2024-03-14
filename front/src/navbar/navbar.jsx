import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import LogOut from "../components/Buttons/logOut";

function NavBar() {
  return (
    <Navbar expand="lg" className="navBar">
      <Container>
        <Navbar.Toggle className="bg-dark" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="links">
            <div className="loader">
              <div className="scanner mt-2">
                <span>Suite Store</span>
              </div>
            </div>
            <NavLink
              className="text-white m-3"
              style={{ textDecoration: "none" }}
              to="/home"
            >
              Home
            </NavLink>
            <NavLink
              className="text-white m-3"
              style={{ textDecoration: "none" }}
              to="/product"
            >
              Products
            </NavLink>
            <NavLink
              className="text-white m-3"
              style={{ textDecoration: "none" }}
              to="/category"
            >
              Category
            </NavLink>
            <NavLink
              className="text-white m-3"
              style={{ textDecoration: "none" }}
              to="/history"
            >
              History
            </NavLink>
           <LogOut/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
