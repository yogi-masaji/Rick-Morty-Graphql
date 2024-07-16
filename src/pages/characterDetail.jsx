import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchCharacterDetail } from "../service/Api";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";

const CharacterDetail = () => {
    const { id } = useParams();
    const { loading, error, data } = fetchCharacterDetail(id);
    const navigate = useNavigate();

    if (loading) return <LoadingPlaceholder />;
    if (error) return <p>Error: {error.message}</p>;

    const { character } = data;

    const goToLocation = () => {
        navigate(`/location/${character.location.id}`);
    };

    return (
        <Container
            className="d-flex flex-column justify-content-center align-items-center"
            fluid
        >
            <Link to="/">
                <Button variant="secondary">Back</Button>
            </Link>
            <Row className="mt-5 align-items-center justify-content-center p-2 detail-bg">
                <Col className="mt-3 mt-md-0" md={6}>
                    <Card className="rounded-image">
                        <Card.Img
                            variant="top"
                            src={character.image}
                            alt={character.name}
                            className="rounded-image"
                        />
                    </Card>
                </Col>
                <Col md={6}>
                    <h2>{character.name}</h2>
                    <p>Status: {character.status}</p>
                    <p>Species: {character.species}</p>
                    <p>Type: {character.type || " - "}</p>
                    <p>Location: {character.location.name}</p>
                    <p>Origin: {character.origin.name}</p>
                    <Button
                        onClick={goToLocation}
                        variant="dark"
                        className="mb-3"
                    >
                        View Residents of {character.location.name}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

const LoadingPlaceholder = () => (
    <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
    >
        <Spinner animation="border" />
    </Container>
);

export default CharacterDetail;
