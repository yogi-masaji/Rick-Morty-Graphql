import Header from "./header";
import Footer from "./footer";
import { Container, Row, Col } from "react-bootstrap";
import "./layout.css";

const Layout = ({ children }) => {
    return (
        <Container>
            <Row>
                <Col>
                    <Header />
                </Col>
            </Row>
            <Row>
                <Col>
                    <main style={{ paddingTop: "20px" }}>{children}</main>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Footer />
                </Col>
            </Row>
        </Container>
    );
};

export default Layout;
