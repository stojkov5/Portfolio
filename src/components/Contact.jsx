import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <Container>
        <h2 className="titles mb-4">Contact Me</h2>
        <Row>
          <Col md={6} className="text-white">
            <h5>Contact Info</h5>
            <ul>
              <li>Email: a.stojkov5@gmail.com</li>
              <li>Facebook: Stojkov Aleksandar</li>
              {/* Add other social handles */}
            </ul>
          </Col>
          <Col md={6}>
          <h5 className="text-white">Work in progress ...</h5>
            <Form
              action="https://getform.io/f/bejjpwpa"
              method="POST"
              className="text-white"
            >
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control  name="name" type="text" placeholder="Your Name" />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" type="email" placeholder="Your Email" />
              </Form.Group>
              <Form.Group controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control name="message" as="textarea" rows={3} />
              </Form.Group>
              <Button className="mt-3" variant="primary" type="submit">
                Send
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
