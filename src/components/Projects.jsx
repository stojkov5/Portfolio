import { useState } from "react";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Card,
} from "react-bootstrap";
import { FaProjectDiagram } from "react-icons/fa";

const projects = [
  {
    category: "HTML, CSS",
    title: "ZFK-Borec",
    gitproject: "https://github.com/stojkov5/First-Project-ZFK-Borec",
  },
  {
    category: "HTML, CSS",
    title: "Здружение на музичари",
    gitproject: "https://github.com/stojkov5/Zam-page",
    demo: "https://zammk.netlify.app/",
  },
  {
    category: "JavaScript",
    title: "City Info",
    demo: "https://city-info-project.netlify.app/",
  },
  { category: "React", title: "Tic-Tac-Toe" },
  {
    category: "React",
    title: "Padel Federation of Macedonia",
    gitproject: "https://github.com/stojkov5/padel-federation-project",
    demo: "https://padelfederation.mk",
  },
  {
    category: "React",
    title: "Task Tracker",
    gitproject: "https://github.com/stojkov5/progress-tracker",
    demo: "https://progresstracker05.netlify.app/",
  },
  {
    category: "React",
    title: "FinRule",
    gitproject: "https://github.com/stojkov5/FinRule",
    demo: "https://finrule.io",
  },
  {
    category: "React",
    title: "FankoskArt",
    gitproject: "https://github.com/stojkov5/FankoskArt",
    demo: "https://fankoskart.shop",
  },
];

const Projects = () => {
  const [filter, setFilter] = useState("All");

  const filteredItems = projects.filter(
    (item) => filter === "All" || item.category === filter
  );

  return (
    <section id="portfolio" className="portfolio-section">
      <Container>
        <h2 className="titles">
          {" "}
          <FaProjectDiagram /> Projects
        </h2>

        <ButtonGroup aria-label="Portfolio Categories">
          <Button className="projects-button" onClick={() => setFilter("All")}>
            All
          </Button>
          <Button
            className="projects-button"
            onClick={() => setFilter("HTML, CSS")}
          >
            HTML-CSS
          </Button>
          <Button
            className="projects-button"
            onClick={() => setFilter("JavaScript")}
          >
            JavaScript
          </Button>
          <Button
            className="projects-button"
            onClick={() => setFilter("React")}
          >
            React
          </Button>
        </ButtonGroup>

        <Row className="mt-4">
          {filteredItems.map((item, index) => (
            <Col md={4} key={index} className="mb-4 ">
              <Card className="projects">
                <a
                  href={item.demo}
                  target="_blank"
                  className="text-decoration-none text-white"
                >
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.category}</Card.Text>
                  </Card.Body>
                </a>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Projects;
