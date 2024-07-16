import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCharacterDetail } from "../service/Api";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";

const CharacterByLocation = () => {
    const { id } = useParams();
    const { loading, error, data } = fetchCharacterDetail(id);
    const [visibleResidents, setVisibleResidents] = useState(10); // Initial number of residents to show

    if (loading) return <LoadingPlaceholder />;
    if (error) return <p>Error: {error.message}</p>;

    const { character } = data;

    // Check if character or location is null
    if (!character || !character.location) {
        return <p>Residents of Unknown</p>;
    }

    const loadMoreResidents = () => {
        setVisibleResidents((prev) => prev + 10);
    };

    return (
        <Container>
            <Link to="/" className="mb-5">
                <Button variant="secondary">Back</Button>
            </Link>
            <h2 className="mb-4">Residents of {character.location.name}</h2>
            <Row>
                {character.location.residents
                    .slice(0, visibleResidents)
                    .map((resident) => (
                        <Col
                            key={resident.id}
                            xs={6}
                            sm={3}
                            md={3}
                            lg={3}
                            xl={3}
                        >
                            <Card className="mb-4 card-customize">
                                <Card.Img
                                    variant="top"
                                    src={resident.image}
                                    alt={resident.name}
                                    className="p-1 rounded-image"
                                />
                                <Card.Body>
                                    <Card.Title>{resident.name}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
            </Row>
            {visibleResidents < character.location.residents.length && (
                <div className="d-flex justify-content-center">
                    <Button onClick={loadMoreResidents}>Load More</Button>
                </div>
            )}
        </Container>
    );
};

const LoadingPlaceholder = () => (
    <Container className="text-center mt-4">
        <Spinner animation="border" />
    </Container>
);

export default CharacterByLocation;
