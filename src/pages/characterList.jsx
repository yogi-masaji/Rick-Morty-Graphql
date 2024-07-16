import React, { useState, useEffect, useMemo } from "react";
import { Card, Col, Container, Row, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchCharacters } from "../service/Api";
import SearchBar from "../components/searchBar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; // Optional CSS for image effects

const CharacterList = () => {
    const [page, setPage] = useState(1);
    const [debouncedPage, setDebouncedPage] = useState(1); // Debounced page state
    const [searchQuery, setSearchQuery] = useState(""); // State to hold search query
    const { loading, error, data, fetchMore } = fetchCharacters(debouncedPage); // Use fetchCharacters

    // Memoize the data.characters results to prevent unnecessary re-renders
    const characters = useMemo(() => {
        if (searchQuery) {
            // Filter characters based on search query
            return (
                data?.characters?.results.filter((character) =>
                    character.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                ) || []
            );
        } else {
            // Display all characters if no search query
            return data?.characters?.results || [];
        }
    }, [data, searchQuery]);

    // Use useEffect to debounce page state updates
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setDebouncedPage(page);
        }, 300); // Adjust debounce delay as needed

        return () => clearTimeout(debounceTimer);
    }, [page]);

    useEffect(() => {
        setPage(1); // Reset page when component mounts or data changes
    }, [data]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        setPage(1); // Reset pagination when performing a new search
    };

    const loadMoreCharacters = () => {
        if (data.characters.info.next) {
            fetchMore({
                variables: { page: data.characters.info.next },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prevResult;
                    return {
                        characters: {
                            ...fetchMoreResult.characters,
                            results: [
                                ...prevResult.characters.results,
                                ...fetchMoreResult.characters.results,
                            ],
                        },
                    };
                },
            }).then(() => {
                setPage(data.characters.info.next);
            });
        }
    };

    if (loading && characters.length === 0) return <LoadingPlaceholder />; // Show loading placeholder
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <SearchBar onSearch={handleSearch} />
            <Container>
                <h2 style={{ marginBottom: "20px" }}>Characters</h2>
                {characters.length === 0 && !loading && (
                    <h2 className="text-center">Character not found.</h2>
                )}
                {characters.length > 0 && (
                    <Row>
                        {characters.map((character) => (
                            <Col
                                key={character.id}
                                xs={6}
                                sm={3}
                                md={3}
                                lg={3}
                                xl={3}
                            >
                                <Card className="mb-4 card-customize">
                                    <Link to={`/character/${character.id}`}>
                                        <LazyLoadImage
                                            alt={character.name}
                                            src={character.image}
                                            effect="blur"
                                            className="p-1 rounded-image"
                                            width="100%"
                                        />
                                        <Card.Body>
                                            <Card.Title>
                                                {character.name}
                                            </Card.Title>
                                        </Card.Body>
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
            {characters.length > 0 && data.characters.info.next && (
                <div className="d-flex justify-content-center align-item-center">
                    <Button onClick={loadMoreCharacters} size="lg">
                        LOAD MORE
                    </Button>
                </div>
            )}
        </>
    );
};

const LoadingPlaceholder = () => (
    <Container className="text-center mt-4">
        <Spinner animation="border" />
    </Container>
);

export default CharacterList;
