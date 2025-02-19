import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { GiSkills } from "react-icons/gi";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaBootstrap,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";

const skills = [
  { name: "HTML", icon: <FaHtml5 /> },
  { name: "CSS", icon: <FaCss3Alt /> },
  { name: "JavaScript", icon: <FaJs /> },
  { name: "React", icon: <FaReact /> },
  { name: "Bootstrap", icon: <FaBootstrap /> },
  { name: "Git", icon: <FaGitAlt /> },
  { name: "GitHub", icon: <FaGithub /> },
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <Container className="text-center">
        <h2 className="titles">
          {" "}
          <GiSkills /> Skills
        </h2>
        <Row>
          {skills.map((skill, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card className="skill-card">
                <Card.Body>
                  {" "}
                  <div className=" d-flex align-items-center justify-content-center">
                    {skill.icon} <span className="ms-2">{skill.name}</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Skills;
