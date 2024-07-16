import { ApolloClient, InMemoryCache, useQuery, gql } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql", // URL endpoint GraphQL
    cache: new InMemoryCache(),
});

const GET_CHARACTERS = gql`
    query GetCharacters($page: Int!) {
        characters(page: $page) {
            results {
                id
                name
                image
            }
            info {
                next
            }
        }
    }
`;

const GET_CHARACTERS_DETAIL = gql`
    query GetCharactersDetail($id: ID!) {
        character(id: $id) {
            id
            name
            image
            status
            species
            type
            location {
                id
                name
                residents {
                    id
                    name
                    image
                    status
                }
            }
            origin {
                name
            }
        }
    }
`;

export const fetchCharacters = (page) => {
    return useQuery(GET_CHARACTERS, {
        client,
        variables: { page },
    });
};

export const fetchCharacterDetail = (id) => {
    return useQuery(GET_CHARACTERS_DETAIL, {
        client,
        variables: { id },
    });
};

export { GET_CHARACTERS, GET_CHARACTERS_DETAIL, client as default };
