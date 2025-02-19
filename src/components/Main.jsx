import { Container, Row, Col, Image } from "react-bootstrap";
import { TypeAnimation } from "react-type-animation";
const Main = () => {
  return (
    <section id="home" className="hero-section">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className=" text-center text-md-start">
            <h1>Hi, My Name is</h1>
            <h1>Aleksandar Stojkov</h1>
            <p>Front-End Developer</p>
            <p>Skills: HTML, CSS, JavaScript, React, Bootstrap</p>
            <TypeAnimation className="main-skills"
              sequence={[
              
                "Skills: HTML;",
                1000, 
                "Skills: CSS;",
                1000,
                "Skills: JavaScript;",
                1000,
                "Skills: React;",
                1000,
                "Skills: TailwindCSS;",
                1000,
                "Skills: Bootstrap;",
                1000,
                "Skills: GitHub;",
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: "2em", display: "inline-block" }}
              repeat={Infinity}
            />
          </Col>
          <Col md={6} className="text-center">
            <Image
              src="https://imgur.com/NaBy44M.jpg"
              alt="Aleksandar Stojkov"
              roundedCircle
              className="hero-image"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Main;
