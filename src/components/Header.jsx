
import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar className="px-4" bg="dark" variant="dark" expand="lg" sticky="top">
      <Navbar.Brand href="#home">My Portfolio</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="#home">HOME</Nav.Link>
          <Nav.Link href="#skills">SKILLS</Nav.Link>
          <Nav.Link href="#portfolio">PROJECTS</Nav.Link>
          <Nav.Link href="#contact">CONTACT</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
